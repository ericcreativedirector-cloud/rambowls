# Rambowls — brand system

The rules this app is built on. Change them here first, then in the code.
Both pages must always agree; if a value appears twice, it is a bug waiting
to happen.

---

## Who this is for

Six guys in a Brooklyn rec bowling league. Designers, developers, producers,
early forties. One captain in his early fifties. They have taste and they
notice defaults. They are also just trying to find out who is bowling
Wednesday.

That tension is the whole brief. The app has to look considered enough that
this crowd is not embarrassed to open it in front of each other, and plain
enough that it answers the question in two seconds.

---

## Voice

**Dry, competent, a little deadpan. Never a mascot.**

The app is the guy who keeps the numbers and does not make a thing of it.
It knows the season is not important. It also refuses to be sloppy about it.
The joke, when there is one, is in the accuracy.

### Rules

- **No em dashes.** Use a period, a comma, or a middot. This is absolute for
  anything a person reads. Code comments are exempt.
- **No exclamation marks.** Nothing here warrants one.
- **No cheerleading.** Not "Great job" or "You've got this." State the number.
- **No hedging.** Not "It looks like you might need". Say what is true.
- **Short sentences.** If it needs a subordinate clause, it needs two.
- **Say the thing, not the category.** "Phil is at zero games", not
  "Some players require attention."
- **Second person sparingly.** The app reports; it does not coach.
- **Contractions are fine.** "Nobody's replied yet" reads human.
- **Numbers are the punchline.** `380 · +19 vs last season` beats any
  sentence about improvement.

### Calibration

| Wrong | Right |
|---|---|
| Looks like you might need one more bowler! | 2 in · need 1 more |
| Great news, you're improving! | +19 vs last season |
| Uh oh, Phil hasn't bowled yet | Phil · needs games |
| Your season target is 138, keep it up! | Road to 138 |
| We couldn't seem to load your data | Couldn't load team data. Use the league sheet |
| All starters are playoff eligible! | All 6 starters are playoff eligible |

### Things the app never says

It never claims a teammate said something they did not say. No invented goals,
no invented rankings, no "your target" for a number nobody chose. If we do not
have it, we ask for it.

---

## Type

**Display: Big Shoulders Display** (variable, 400 to 700)
**Body: Inter** (400/500/700)
**Data: Roboto Mono** (400/500/700)

Anton stays in the display stack as a fallback only. It shipped one blunt
weight, which is why it went.

| Use | Face | Weight | Size |
|---|---|---|---|
| Wordmark | Display | 600 | `clamp(28px,9.8vw,44px)`, line-height `.771` |
| Section head (h2) | Display | 500 | 22px |
| Hero date | Display | 600 | `clamp(17px,4.6vw,34px)` |
| Record value | Display | 600 | 26px |
| Stat number | Display | 600 | 30px (34px at 640+) |
| Bowler name | Display | 600 | `clamp(28px,8vw,40px)` |
| Toggle | Display | 500 | `clamp(12px,3.8vw,17px)` |
| Mark | n/a | n/a | `clamp(30px,10.3vw,46px)`, stroke `.9` |
| Body copy | Body | 400 | 15px |
| Notes | Body | 400 | 13.5px |
| Labels, kickers, all data | Data | 400 to 700 | 8.5 to 13px, letterspaced |

**The wordmark is one word.** RAMBOWLS, single line. The page name lives in
the toggle, which already inverts to say where you are. The crash treatment
that overlapped two lines is gone with the second line.

Line-height is `.771`, which is `(ascender - descender) / unitsPerEm` for Big
Shoulders. At that value the text box bottom lands exactly on the baseline,
which is what lets `align-items:flex-end` sit the ball on the baseline with
the type. Measured delta is 0px at 320, 375, 390 and 430.

### No widows

- `text-wrap:balance` on the wordmark, section heads and the hero date
- `text-wrap:pretty` on all prose so no paragraph ends on a lone word
- Long dates render as two `nowrap` halves. May break after "Wednesday,"
  but never inside "September 2"
- Time badges keep the whole time string together, so "PM" cannot orphan

---

## Colour

| Token | Value | Means |
|---|---|---|
| `--lane` | `#0E1116` | page |
| `--lane-2` | `#161B22` | any raised surface |
| `--maple` | `#C8873C` | the brand, and "act on this" |
| `--bone` | `#F3EEE3` | primary text |
| `--dim` | `#7A828E` | secondary text |
| `--rule` | `#242B34` | every hairline |
| `--signal` | `#35A79B` | good, in, above baseline |
| `--strike` | `#E85A52` | genuinely wrong |
| `--early` | `#4FB3A4` | 7:00 / 8:10 nights |
| `--late` | `#9B8CE0` | 9:20 / 10:30 nights |

### Maple has three intensities, and they mean something

1. **Full** — the thing you act on. Tonight's card, active nav tab,
   selected bowler.
2. **About a third** — real but not urgent. Upcoming nights on the rail.
3. **None** — record, not plan. Bowled nights drop to `--rule` grey.

### Red is earned, never atmospheric

`--strike` appears only when something is actually wrong: fewer than three
bowlers in, or a bowler who can no longer reach six games. "Six starters still
need games" in Week 2 is arithmetic, not an emergency, so it is maple. An
indicator that is always red teaches people to stop seeing red.

---

## Form

- **One corner radius: 2px.** Everywhere that has corners. Almost square, not
  square, so joins still catch light. Exceptions: `50%` on true circles (the
  L/G roundels, the refresh ball) and `2px 2px 0 0` on chart bars, which sit
  on an axis.
- **Structure is the ornament.** Visible hairlines, hard edges, no shadows.
  Where cells divide, use borders rather than grid gaps so a card's background
  stays one continuous surface.
- **44px minimum touch target.** No exceptions on anything tappable. If a
  thing cannot honestly be 44px, it is an indicator and not a control.
- **Selection inverts.** Selected means solid maple with near-black type
  knocked out. Same in the nav, the night tabs, the bowler selector. If it
  inverts it is tappable; if it is not tappable it never inverts.
- **Indicators stay quiet.** The rail locator is 1px hairlines, 2px on the
  active week. Weight comes from colour, not height. It only has to be found
  when looked for.
- **Mobile first.** 900px max width, 44px section rhythm, safe-area insets.

---

## Iconography

Line icons, `1.7` stroke, maple, rounded caps. 15px inline, 17px in section
heads, 11px in kickers. Sizes do not drift.

### The app mark is a bowling ball, and it stays

Gold line-art ball on lane, three maple finger holes, one soft highlight.
Drawn artwork, generated by `make_icons.py`.

### The logo is the mark plus the wordmark, locked

They sit on one line, vertically centred, mark first. The mark scales with the
wordmark: `clamp(38px,11.5vw,64px)` against a wordmark of
`clamp(29px,9.2vw,54px)`, so the ball reads roughly as tall as the two crashed
lines of type. Neither is used without the other in the masthead.

The mark used to live up in the eyebrow. That read as two unrelated things
stacked, not as a logo. One mark, beside the type, at a size that holds its own.

**Clear space is part of the logo.** Nothing comes closer than `--clear`
(`clamp(15px,4.4vw,24px)`) on any side. The eyebrow sits `--clear` above the
brandline and the toggle is separated by `--clear`, so the lockup keeps its
air while still sharing one band.

### Schedule / Stats sits beside the logo

It is a flex sibling of the logo, separated by `--clear`, both bottom-aligned.
Big Shoulders 500 at `clamp(12px,3.8vw,17px)`, `.09em`, and it inverts to
solid maple like every other selected thing.

It briefly matched `h2` at 22px. It does not any more: the toggle came down
about 25% while the logo went back up, which is the right order. The toggle
has a hard floor at `min-height:44px` and the logo does not, so when the two
need to balance, the logo moves.

The lockup is 40px tall at 390px, against a 46px toggle. That is close enough
to read as a pair. Clear space is never at risk here: the gap is the flex
`gap: var(--clear)`, so the two cannot crowd each other, they can only wrap.
Measured gap at 390 is 51px, three times `--clear`. Nothing wraps at 320.

### One masthead spec, both pages

The logo and toggle rules are identical in both files, and that is not enough
on its own. They once drifted while the rules matched, because the containers
differed: the Scheduler's masthead is a flex column so the brandline's margin
applied, and the Stats masthead was a plain block so the same margin collapsed
out and merged with the eyebrow's. Both are flex columns now.

Verified numerically rather than by eye. At 390px both pages report the same
eyebrow-to-logo gap, logo top, logo height, mark width, toggle top, toggle
height and toggle right edge. If those diverge again, the container changed,
not the type.

**It is not covered by the no-emoji rule.** That rule is about glyphs used as
content inside the interface, where they break the type system and render
differently per platform. A drawn mark is neither. The two were confused once
and the ball was replaced with a letterform; it was reverted.

A monogram inside the ball was considered and dropped: at 60px on a home
screen the mark and a letterform compete and both lose.

### No emoji in the interface

Never. When something needs to be shown, draw it: the goal lane uses a maple
fill with a hard leading edge, not a bowling ball glyph.

---

## Data honesty

The rules that outrank aesthetics.

- Official league sheet scores always beat local provisional entries.
- Averages display as whole numbers, matching the sheet. Two places showing
  the same average must show the same digits.
- Numbers sitting near each other must reconcile. `Now 121` and `17 pins to
  go` against a goal of 138 is right; `120.5` and `18` is not.
- Preseason handicaps are stored verbatim from the sheet, never recalculated.
- Never show a figure a person did not provide as though they provided it.
- If data is missing, say so plainly and link the sheet.
