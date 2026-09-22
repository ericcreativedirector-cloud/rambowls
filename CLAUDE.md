# CLAUDE.md

Instructions for any Claude session working on this repo (Claude Code on phone or web, or Claude Desktop on the Mac).

## Sync first, every session
1. `git pull --rebase origin main` before reading or editing anything. Two machines push here: Claude Code (cloud) and the Mac.
2. Work on `main`. GitHub Pages serves `main`, so session branches never go live. If a session branch is created, merge it to `main` and delete it.
3. Pull again right before pushing. If the push is rejected, `git pull --rebase` and re-check the cache version (below) before retrying.

## Every push
- Bump the cache version in `sw.js` (`const CACHE = 'rambowls-vNN';`) by one, based on what's on `main` after pulling. Without it, teammates' phones keep the old version.
- `node --check data.js` before committing.
- Confirm with `git show --stat HEAD`. Never say something was pushed without checking.
- Commit messages say what changed for the team, e.g. `Week 6 availability: Eric, Prah, Ken bowl both late games`.

## Architecture
- Static site. No framework, no build step, no backend.
- `data.js` is the single source of truth: `PLAYERS`, `SHIRT_CALLS`, `NIGHTS`, results, and the shared math.
- `index.html` is the Scheduler. `tracker/index.html` is Stats. `sw.js` is the service worker.
- `NIGHTS` entries take an optional `lineup`: one array (same trio both games) or `{1:[...], 2:[...]}`. `lineupFor(iso, game)` resolves per game. `lineupGames(iso)` drives projected games on the eligibility board.
- `hcpPre` is copied verbatim from the league sheet. Never recalculate it.
- `sheetName` maps app names to league-sheet spellings (Mike Seidler, Phill Marken).

## Editing data.js
- Use Python `str.replace` with `assert s.count(old) == 1` before each replacement. Grep for the exact existing text first.
- Browser globals: to run it in Node, shim `window`, or swap `})(window);` for `})(root);` inside `new Function`.

## League Google Sheet
- Read via `https://docs.google.com/spreadsheets/d/1eRRPcCOAMt8T2kVdodaOWb0ZtKiVKRoZxKHh8Q70i-g/gviz/tq?tqx=out:csv&sheet=<TAB>`. Public, CORS-enabled, no token.
- A wrong tab name returns the first tab with HTTP 200. Always verify cell A1 or the header row matches what you asked for.
- Official scores post by Thursday afternoon. Card scores entered Wednesday night get reconciled against the sheet.

## Team rules the lineup logic follows
- Every player needs 6 games for playoff eligibility. The team aims for 3 bowlers per game (a team goal, not a league rule).
- Get all starters to 6 games before using alternates.
- Dues-paying members get preference over alternates (Kelvyn, Jamiqve, Pete). Two members competing for one slot: rock paper scissors.
- Low-score rule (lowest game-1 bowler sits game 2) is tradition. Member preference overrides it.
- Availability shared from the group chat means: update the app, don't just draft a reply.

## Copy and design rules
- No widows (`text-wrap: balance/pretty`, nowrap spans). No em dashes in user-facing copy. No emoji in the interface. No hype or AI-sounding copy.
- Never invent data about teammates.
- Tokens: `--lane --lane-2 --maple --bone --strike --signal --dim --rule`. Themes via `html[data-theme]` (House, NYK, BKN). `--strike` and `--signal` never change.
- Type: Big Shoulders Display, Inter, Roboto Mono. 2px radius. Mobile-first at 390px, 900px max wrap.
- Logo changes update everything together: inline mark, both favicon data-URIs, `brand/` SVGs, manifest icons. Inline mark and favicon use different scales (r=9.2 vs r=11).

## Privacy
- No phone numbers, emails, or other personal contact info in the repo. It's public.

## Verifying UI changes
- Serve with `python3 -m http.server 8765`. Test with jsdom via `JSDOM.fromURL()` (not readFileSync), or headless Chrome through a 390px-wide iframe wrapper page.
