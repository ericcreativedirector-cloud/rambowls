# Rambowls Scheduler

A one-page schedule and availability board for a bowling league team.
Shows the next match, who's in, who still needs games to qualify for
playoffs, and whether it's an early or late night.

Built for the Rambowls — 2026 Fall Wednesday League at The Gutter, Brooklyn.

**Live:** https://YOURNAME.github.io/rambowls

---

## What it does

- **Next up card** — the next bowling night, both games, lanes, times, and
  what shirt the team is wearing. Says "Tonight" on match day.
- **Road to eligibility** — six pins per player, lit as they log games.
  Six games and you're playoff eligible.
- **Availability** — one tab per week for the whole season. Past weeks show
  who actually bowled; upcoming weeks show who's replied in, out, or maybe.
- **Full schedule** — all 24 games with results, plus calendar export.
- **Early / late nights** — sun and moon badges. Early is 7:00 & 8:10,
  late is 9:20 & 10:30.

It is **read only**. Nobody can edit it from the browser. One person keeps
the data current and pushes updates.

## How it's built

One file. `index.html` — no framework, no build step, no dependencies.
Open it in a browser and it works. Hosted free on GitHub Pages.

Fonts load from Google Fonts; everything else is self-contained.

---

## Weekly update (for whoever keeps it)

Everything lives in the `<script>` block near the top of `index.html`.

**1. Add the night's results** — find the two games in `schedule` and add
`us` and `them`:

```js
{wk:2, iso:"2026-08-26", time24:"21:20", lane:5, opp:"Peanut Gutter & Jelly", us:541, them:498},
```

The record, averages and W/L chips all recalculate on their own.

**2. Bump each player's game count** in `roster`, and update `avg` / `hcp`
from the league sheet:

```js
{name:"Eric Rodriguez", avg:121, hcp:55, games:2, alt:false},
```

**3. Record who bowled** — change that night in `nights` to `played` form:

```js
"2026-08-26": {
  played: true,
  bowled: [["Eric",2], ["Ron",2], ["Prah",1]],
  sat:    [["Ken",""], ["Michael",""]]
},
```

**4. Add next week's availability** as replies come in:

```js
"2026-09-02": {
  played: false,
  in:    [["Eric",""], ["Kelvyn","alt"]],
  maybe: [["Michael",""]],
  out:   [["Ken",""]],
  quiet: [["Phil",""], ["Ron",""], ["Prah",""]]
},
```

**5. Call the shirt** in `SHIRT_CALLS`:

```js
const SHIRT_CALLS = {
  "2026-09-02": "leroy"   // "leroy" | "aloha" | "fresh" | null
};
```

**6. Update the date stamp** in `LAST_UPDATED`, then push:

```bash
git add .
git commit -m "Week 2 results"
git push
```

Live in about a minute.

---

## Using this for your team

Fork it, then change six things — all in the same `<script>` block:

| What | Where | Notes |
|---|---|---|
| Players | `roster` | Name, average, handicap, games, alternate y/n |
| Schedule | `schedule` | One row per game: `iso` date, `time24` 24-hour start, lane, opponent |
| Availability | `nights` | Keyed by date. Omit a date and that week shows an empty state |
| League sheet | `SHEET_URL` | Link in the footer callout |
| Shirts | `SHIRTS`, `SHIRT_CALLS` | Or delete the `shirtwrap` block in `renderNextUp` |
| Team name | `<title>`, `<h1>`, `og:title` | Also the venue address in the footer |

Everything else is derived. Early vs late comes from the start times.
The eligibility pins come from `games`. The record and averages come from
the scores. Change the data, the page follows.

**Colors** are CSS custom properties at the top of `<style>` — edit
`--maple`, `--lane`, `--early`, `--late` and the whole page retones.

**Games needed to qualify** is hardcoded as 6 in `renderBoard` and
`renderRecord`. Search for `6` in those two functions if your league differs.

---

## Notes

- Averages follow this league's formula: ballast = 4 − games played;
  average = (scratch total + ballast × previous average) ÷ (games + ballast);
  handicap = 70% of (200 − average). Yours may differ — check with your
  commissioner, or just paste their numbers.
- The repo must be public for free GitHub Pages hosting, so don't put
  anything here you wouldn't post publicly. Player names and averages
  are already visible.
- No analytics, no cookies, no storage. Nothing is collected.
