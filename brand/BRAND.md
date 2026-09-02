# Rambowls — brand guide

Derived from the shipped app (`index.html`, `tracker/index.html`, `data.js`).
The app is the source of record. If this document and the CSS disagree, the
CSS wins and this document is stale.

_Last revised: 2 September 2026 — lockup gap tightened again, holes to the upper-right quadrant, two-tone lockup stated explicitly._

---

## 1. The logo

### 1.1 What it is

A bowling ball drawn as an outline, with three finger holes arranged as a
45-45-90 triangle, set against the wordmark RAMBOWLS in Big Shoulders Display
SemiBold.

The cluster sits in the **upper-right quadrant** of the ball, not centred.
Two of the holes share a single vertical axis (x = 15.2 on the 24-unit grid)
so that the pair reads as a deliberate rhyme with the vertical stem of the
**R**. The third sits at the right-angle vertex, offset left by exactly half
the vertical spread, which puts both legs of the triangle at 45°. Both the
quadrant placement and the 45° construction are the idea — a centred or
randomly scattered triangle is not an acceptable substitute.

**On accuracy:** this is a stylised mark, not a technical drawing. A real
conventional drilling is a much narrower triangle — the bridge between the
two finger holes can be as little as a quarter inch, while the span from
thumb to fingers runs around four inches, giving an apex angle nearer 16°
than 90°. Rendered honestly at 30px that reads as a smudge and a dot. The 45°
construction is the deliberate choice: it is the better mark even though it
is the worse diagram. Don't "correct" it toward realism.

### 1.2 Construction

The mark is drawn on a 24 × 24 grid. All values are grid units.

| Element | Value |
|---|---|
| Ball centre | 12, 12 |
| Ball radius | 9.2 |
| Ball stroke | 0.9, round cap and join |
| Ball fill | none — the ball is an outline |
| Hole axis (pair) | x = 15.2, at y = 7.2 and 12.8 |
| Third hole | x = 12.4, y = 10 — the 45° vertex |
| Triangle spread | 5.6 vertical, 2.8 horizontal offset |
| Hole radius | 1.25, all three equal |
| Holes | solid fill, no stroke |

### 1.2a Colour of the logo

The lockup is **two-tone, always**:

| Part | Token | House value |
|---|---|---|
| Ball stroke **and** finger holes | `--maple` | `#C8873C` |
| RAMBOWLS wordmark | `--bone` | `#F3EEE3` |

The mark is a single colour throughout — the ball's stroke and the holes' fill
are always the same value, never split from each other.

A theme repaints `--maple`, so the mark follows the theme: under **NYK** the
ball and holes are the club orange `#F58426`. The wordmark does **not** follow
a theme. It stays `--bone` in every palette.

On a light ground, set the wordmark in `--lane` (`#0E1116`) and leave the mark
in `--maple` untouched.

### 1.3 The lockup

Ball left, wordmark right, sharing a baseline.

- The mark's **box** (the full 24-unit square, not the ball's visible edge)
  sits with its bottom on the type baseline. Because the ball is inset within
  that box, it floats slightly above the baseline and rises slightly above cap
  height. That is intentional and should not be "corrected."
- Gap between the mark box and the wordmark: **0.134 × cap-height-em**
  (`clamp(3.43px, 0.98vw, 5.88px)` at the app's type scale).
- Note this is the gap to the mark's **box**, not to the ball's visible edge.
  The ball is inset within its 24-unit box, leaving roughly 5.4px of built-in
  optical space on the right at full size. The gap you *see* is therefore
  about 11px, not 5.9px. If the lockup ever needs to close up further, the
  lever is the mark's viewBox, not this gap — driving the gap to zero still
  leaves that inset behind.
- Wordmark tracking: **−0.5%** (`letter-spacing: -.005em`).
- Wordmark case: **always uppercase**, never "Rambowls" in mixed case as a
  logotype. Mixed case is fine in running prose.
- Lockup proportion: **4.813 : 1** (width : height).

### 1.4 Clear space

Nothing enters within **`--clear`** of the lockup on any side —
`clamp(15px, 4.4vw, 24px)`, roughly half the mark's height. In the app this
is enforced structurally: the nav is a flex sibling separated by that gap,
not something tucked against the wordmark.

### 1.5 Files

| File | Use |
|---|---|
| `brand/rambowls-lockup.svg` | Primary horizontal lockup. Wordmark is outlined — no font required to render. |
| `brand/rambowls-mark.svg` | Icon only. Favicons, app icons, avatars, anywhere under ~48px. |

Both recolour by changing the fill on the wrapping `<g>` and the ball's
`stroke` to the same value.

### 1.6 Don'ts

- Don't rotate, skew, or arch the wordmark.
- Don't fill the ball. It is an outline.
- Don't move the two paired holes off the x=15.2 axis, and don't shift the
  third hole off the 45° vertex.
- Don't recentre the hole cluster. It belongs in the upper-right quadrant.
- Don't recolour the holes independently of the ball.
- Don't stack the lockup vertically. If the space is narrow, use the mark
  alone.
- Don't set the wordmark in anything but Big Shoulders Display SemiBold.
- Don't add a drop shadow, glow, bevel, or outline to either element.

---

## 2. Colour

### 2.1 House palette

| Token | Value | Role |
|---|---|---|
| `--lane` | `#0E1116` | Page ground. Near-black, slightly cool. |
| `--lane-2` | `#161B22` | Raised surfaces — cards, nav, sections. |
| `--maple` | `#C8873C` | Primary accent. The logo, active states, key numbers. |
| `--maple-2` | `var(--maple)` | Secondary accent. Same as primary in the house theme. |
| `--bone` | `#F3EEE3` | Primary text. Warm off-white, never pure `#FFF`. |
| `--dim` | `#7A828E` | Secondary text, captions, inactive nav. |
| `--rule` | `#242B34` | Hairlines and borders. |
| `--strike` | `#E85A52` | **Semantic — needs attention.** |
| `--signal` | `#35A79B` | **Semantic — done / qualified.** |
| `--early` | `#4FB3A4` | Early time slot (7:00 / 8:10). |
| `--late` | `#9B8CE0` | Late time slot (9:20 / 10:30). |

Ground and text are warm-neutral on purpose: bone rather than white, maple
rather than a saturated orange. It should read as varnished lane wood under
bar lighting, not as a sports-tech dashboard.

### 2.2 The semantic rule

`--strike` and `--signal` carry meaning. Red means a bowler still needs
games; teal means they've qualified. **They are never repainted for
decoration and never used as brand colour.** A theme that pushed a red into
`--strike` would make every finished bowler look like an error state.

`--maple` and `--maple-2` are the only decorative colours. Those are the two
a theme may touch.

### 2.3 Themes

The app ships two alternate palettes alongside the house theme. Themes are
**colour only** — no marks, no club names, no logo substitution. The
three-letter code is the entire label.

| Theme | `--maple` | `--maple-2` | Ground |
|---|---|---|---|
| House | `#C8873C` | = primary | `#0E1116` / `#161B22` |
| NYK | `#F58426` | `#1272C4` | `#08141F` / `#10202F` |
| BKN | `#FFFFFF` | `#5E6772` | house ground |

Two rules govern any future theme:

1. **Primary must carry 11px type.** In NYK the orange is primary and the
   blue is secondary, not the other way round: the orange clears 7.3:1 on the
   blue ground, the blue only manages 3.4:1 and would fail the eyebrow text.
   Secondary is for rules and fills, where 3:1 is the bar.
2. **Match the ground's luminance, don't lift a published navy.** The NYK
   ground is the club blue held at hue 205 and crushed to ~8% lightness so it
   lands within a hair of `--lane`. The whole UI was contrast-tuned against
   `#0E1116`; matching luminance means every token underneath still clears the
   ratios it did before, and only the temperature changes.

---

## 3. Typography

Three faces, three jobs. No fourth face.

| Token | Face | Job |
|---|---|---|
| `--display` | Big Shoulders Display (fallback Anton, Impact) | Logo, headlines, section heads, nav. |
| `--body` | Inter | Running prose, labels, buttons. |
| `--data` | Roboto Mono | Scores, dates, times, lane numbers, eyebrow text. |

### 3.1 Rules

- **Display is always uppercase.** Weight 500–600. Tracking runs tight on
  large sizes (−0.005em on the wordmark) and open on small ones (+0.09em on
  nav).
- **Anything that is a number a bowler reads at a glance is mono.** Scores,
  averages, handicaps, start times, lane numbers, dates. This is the strongest
  single typographic signal in the app — if it's data, it's Roboto Mono.
- **Eyebrows and small caps labels are mono at 11px, +0.1em, uppercase,
  `--dim`.** Never display face at that size.
- **Body copy is Inter and stays sentence case.** Display uppercase is for
  headings and the logo, not for paragraphs.
- Nothing below 11px, anywhere.

### 3.2 Scale

Type is fluid, not stepped. Headings clamp between a phone minimum and a
desktop maximum (`h1: clamp(28px, 9.8vw, 44px)`) so the masthead holds its
proportion against the mark, which clamps on the same curve
(`clamp(30px, 10.3vw, 46px)`).

---

## 4. Layout and voice

- **Mobile first.** The app is read one-handed, standing, in a bar. Content
  wraps at 900px; below that it's a single column.
- **44px minimum touch target** on anything tappable.
- **44px section rhythm.** Sections are peers separated by a consistent gap,
  with `safe-area-inset` padding so nothing collides with the notch.
- **Voice: plain, short, present tense.** "Who's bowling?" not "Please select
  a bowler." "6 games qualifies for semis." not "A minimum of six games must
  be logged in order to qualify." No exclamation points. No hype about
  averages.
- **Squares, not pills.** `border-radius: 2px` on controls and tags. The app
  is not soft.

---

## 5. Notes

The `--maple-2` token exists as a secondary accent for the masthead rule. It
does **not** touch the logo — an earlier comment in `data.js` claimed it drove
the finger holes, which was never true in the CSS. That comment has been
corrected. Holes are `--maple`, same as the ball.
