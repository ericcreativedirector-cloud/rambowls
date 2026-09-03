# Sheet Sync — plan for Claude Code

Goal: make the app read the league Google Sheet directly instead of
hand-edited `data.js`, and open a league-wide mode for all 16 teams.

Written 2026-09-03 after verifying the endpoints from this machine.
Everything in "Verified facts" was actually tested, not assumed.

---

## Verified facts (do not re-litigate, but DO re-test if something fails)

Sheet id: `1eRRPcCOAMt8T2kVdodaOWb0ZtKiVKRoZxKHh8Q70i-g`

**Tabs are addressable by NAME, no gid needed:**

    https://docs.google.com/spreadsheets/d/<ID>/gviz/tq?tqx=out:csv&sheet=<TAB NAME>

- Returns quoted CSV, HTTP 200.
- Sends `access-control-allow-origin` echoing the requesting origin.
  Confirmed working from a real browser page on another origin.
- The plain `/export?format=csv&gid=N` endpoint also works and sends
  `access-control-allow-origin: *`, but needs gids. gids are arbitrary
  (Standings=0, Schedule=62, others unguessable — 1,2,3,100 all 400).
  Prefer the by-name gviz endpoint.
- Tab names == team names from the Standings tab. So: read Standings,
  get 16 names, fetch each team's tab by name. No gid map required.

**Team tabs contain everything the app needs.** Real row, Wk3 game 1:

    "","3","9/2","9:20 ","Lane 8","Pin Pals","95","","125","","162",…,"W","382","432","547","532"

  week | date | time | lane | opponent | per-player scores… | W/L |
  us scratch | them scratch | us handicapped | them handicapped

Header row carries player names, so parse team tabs BY HEADER NAME.

---

## Three traps — the first one is the dangerous one

1. **A missing tab returns 200 with the FIRST sheet's contents, not an
   error.** Ask for a misspelled team and you silently get Standings
   data rendered as that team's season. **Every fetch must verify cell
   A1 matches the team requested, and hard-fail if not.**

2. **Sheet strings have trailing spaces.** A1 is `"Rambowls "`, times are
   `"7:00 "`. Trim everything on ingest.

3. **The Schedule tab is a positional grid with no headers** — it breaks
   if Brent restructures it. Team tabs have real headers and are safe.
   Parse team tabs properly; treat Schedule as best-effort or skip it
   (team tabs already carry each team's own schedule).

Also: this all depends on the sheet staying link-viewable. That's Tony's
setting, not ours. A fetch failure must fall back to baked-in data, never
a blank page.

---

## The verification gate (this is the point of the whole plan)

`data.js` currently holds hand-entered, sheet-verified data for weeks 1–3.
Its numbers reproduce the Standings tab exactly: 5-1-0, 6 played,
avg 386, std dev 19, total 2,316.

**So the parser has a ground truth to be checked against.** Do not swap
the reader in until its output matches the current `data.js` field for
field. Build the comparison harness BEFORE building the UI.

    node /tmp/audit.js   # pattern to copy: recompute totals, assert vs sheet

---

## Phases

### Phase 1 — reader module, no UI changes
- New file `sheet.js`, exports async `fetchTeam(name)` and `fetchStandings()`.
- Pure functions. No DOM. No changes to `index.html` or `data.js` yet.
- Returns the same shapes `data.js` exposes (PLAYERS-ish, SCHEDULE-ish),
  so it is drop-in later.
- Verify A1 matches requested team; throw on mismatch.

### Phase 2 — the gate
- Script that fetches Rambowls, builds the structures, and diffs them
  against the current `window.RB` from `data.js`.
- Must report ZERO diffs on: every per-player score, every us/them,
  every W/L, season total 2316, avg 386, std dev 19, record 5-1-0.
- Fix the parser until it agrees. Do not proceed while it disagrees.

### Phase 3 — wire in with fallback
- App tries `sheet.js` on load; on any failure OR A1 mismatch, falls
  back to `data.js` and shows a quiet "showing saved data" note.
- Cache last good result in localStorage with a timestamp; render cache
  instantly, refresh in background.
- `data.js` stays in the repo as the fallback AND as the seed for
  anything the sheet doesn't carry (goals, alternates, notes, shirts).

### Phase 4 — league mode
- Team picker sourced from the Standings tab (16 names, live).
- Same codebase, two modes — NOT two apps, NOT a fork:
  - **league mode**: sheet-driven read-only. Schedule, scores, standings,
    averages, handicaps, qualification. Works for any team.
  - **rambowls mode**: everything above plus availability, shirt calls,
    goals, lane-visualization goal tracker.
- Only rambowls mode needs write/auth (Supabase later). League mode must
  ship without any of it.

---

## Guardrails

- **Never commit phone numbers.** RSVP buttons open Messages with an
  EMPTY recipient by design. If this gets shared with other teams, put
  that rule in the README loudly — a copier will read it as an omission
  to "fix". If a number ever lands in a commit:
  `git reset --soft <parent-SHA>`, one new commit,
  `git push --force-with-lease`, verify with
  `git log --oneline -S"<value>" --all`.
- Shared math lives in `data.js` (`playerStats`, `leagueAverage`,
  `handicapFor`). Both pages call it so they cannot disagree. Keep that
  property — the sheet reader feeds those functions, it does not
  reimplement them.
- Handicap formula is verified, do not "improve" it:
  ballast = 4 − games played; avg = (scratch + ballast × prev) / (games + ballast);
  hcp = round(0.7 × (200 − avg)). Preseason `hcpPre` is verbatim from the
  sheet and must not be recalculated.
- League minimum is **3** bowlers per game, not 4.
- Bump `CACHE` in `sw.js` on every push or phones keep the old build.

## Commands that work here

    node --check data.js
    python3 -m http.server 8765          # then hit http://localhost:8765
    node /tmp/smoke.js                   # jsdom, asserts zero console errors

    CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    "$CHROME" --headless --disable-gpu --hide-scrollbars \
      --window-size=390,844 --force-device-scale-factor=2 \
      --virtual-time-budget=4000 --screenshot=/tmp/x.png http://localhost:8765/index.html

Chrome screenshot batches can hang. Run them ONE width per command — a
batch that times out mid-run once left a fix stranded in `git stash`
with a clean tree. If a command dies, check `git stash list` before
doing anything else.

## Out of scope for now

Supabase, auth, RLS, availability writes. Phase 4 league mode ships
read-only. Revisit writes only after the read half is live and stable.
