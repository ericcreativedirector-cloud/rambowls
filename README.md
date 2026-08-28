# Rambowls

A two-view team app for a bowling league: a **Scheduler** (tonight's plan) and
a **Stats** page (how each bowler is doing).

Built for the Rambowls — 2026 Fall Wednesday League at The Gutter, Brooklyn.

**Scheduler:** https://ericcreativedirector-cloud.github.io/rambowls/
**Stats:** https://ericcreativedirector-cloud.github.io/rambowls/tracker/

---

## What it does

**Scheduler**
- **Next up** — the next bowling night, both games, lanes, times, shirt call.
  Says "Tonight" on match day.
- **Where we stand** — record, average team total, starters qualified.
- **Road to eligibility** — six pins per player. 6 games qualifies for semis.
- **Availability** — one tab per week, with a headcount badge (we want 3 a game).
- **Full schedule** — all 24 games with results, plus calendar export.
- **Early / late nights** — sun and moon badges. Early is 7:00 & 8:10 PM,
  late is 9:20 & 10:30 PM.

**Stats** — per-bowler average, handicap, high game, and progress toward the
6 games needed to qualify; a Road to Goal lane visual, a night-by-night chart,
and a score log.

---

## Architecture

Three files do the work:

| File | Role |
|---|---|
| `data.js` | **The canonical source of all team data.** Both views load it. |
| `index.html` | Scheduler view. Reads `data.js`, defines no team data of its own. |
| `tracker/index.html` | Stats view. Reads `../data.js`, same. |

No framework, no build step, no dependencies. Fonts come from Google Fonts;
everything else is self-contained. Hosted free on GitHub Pages.

> **Do not add player, schedule, score, shirt or availability data to
> `index.html` or `tracker/index.html`.** That duplication is exactly what
> caused the two views to disagree before. It all belongs in `data.js`.

`data.js` exposes a single `window.RB` object holding season metadata,
players, the schedule, shirts, shirt calls, availability — plus the shared
math (`playerStats`, `leagueAverage`, `handicapFor`, `weeks`,
`lastCompletedWeek`). Because both views call the *same* `playerStats()`, they
cannot show different averages or handicaps for the same player.

---

## Weekly update

Everything below happens in `data.js`.

**1. Add the night's team results** — find the two games in `SCHEDULE` and add
`us` and `them`:

```js
{wk:3, iso:"2026-09-02", time24:"21:20", lane:8, opp:"Pin Pals", us:541, them:498},
```

Record, team average and W/L chips recalculate on their own.

**2. Add each bowler's official scores** in `PLAYERS` → `scores`, keyed by week.
`null` means they didn't bowl that game:

```js
{id:"eric", name:"Eric Rodriguez", short:"Eric", prev:112, goal:138, alt:false, hcpPre:61,
 scores:{1:[136,124], 2:[125,97], 3:[141,133]}},
```

Game counts, averages, handicaps, eligibility pins, the Stats page and the
night-by-night chart all derive from this. **Nothing else to update.**

**3. Record who bowled** — change that night in `NIGHTS` to `played` form:

```js
"2026-09-02": {
  played: true,
  bowled: [["Eric",2], ["Ron",2], ["Prah",1]],
  sat:    [["Ken",""], ["Michael",""]]
},
```

**4. Add next week's availability** as replies come in:

```js
"2026-09-09": {
  played: false,
  in:    [["Eric",""], ["Kelvyn","alt"]],
  maybe: [["Michael",""]],
  out:   [["Ken",""]],
  quiet: [["Phil",""], ["Ron",""], ["Prah",""]]
},
```

**5. Call the shirt** in `SHIRT_CALLS`:

```js
"2026-09-09": "leroy"   // "leroy" | "aloha" | "fresh" | null
```

**6. Update `SEASON.lastUpdated`** — this is the date the *data* was last
updated, not today's date. If no new scores went in, leave it alone.

**7. Bump the service worker cache** in `sw.js` (`rambowls-v16`, `v17`, …) so
phones with the app installed pull the new build instead of a stale cache.

**8. Push:**

```bash
git add -A && git commit -m "Week 3 results" && git push
```

Live in about a minute.

---

## Notes on the data

- **Handicaps.** The league sheet computes from *unrounded* previous averages,
  so recalculating from the rounded `prev` values doesn't always reproduce the
  sheet (Phil: 134 → 0.7 × 66 = 46.2, but the sheet says 47). `hcpPre` stores
  the sheet's own preseason figure and is used until a bowler has games;
  after that the shared formula takes over.
- **The formula:** ballast = 4 − games played; average = (scratch total +
  ballast × previous average) ÷ (games + ballast); handicap = 70% of
  (200 − average).
- **Alternates** aren't on the league sheet, so they carry the league standard
  average (120) and its matching handicap (56) until a real average is filed.
- **Official beats provisional, always.** On a bowling night a player can type
  scores the sheet hasn't posted yet; those save to that phone only, are
  labeled "Provisional", and are deleted automatically the moment the official
  score appears. Provisional scores never affect average, handicap, high game,
  qualification, Road to Goal or the night chart — those stay official-only.
- The repo is public for free GitHub Pages hosting, so don't put anything here
  you wouldn't post publicly. Player names and averages are already visible.
- No analytics, no cookies. The only local storage is the selected player name
  and any provisional scores, both on that device only.
