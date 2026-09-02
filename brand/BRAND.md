# Rambowls — brand guide

Derived from the shipped app (`index.html`, `tracker/index.html`, `data.js`).
The app is the source of record. If this document and the CSS disagree, the
CSS wins and this document is stale.

_Last revised: 2 September 2026 — 45-45-90 hole triangle, tightened lockup gap._

---

## 1. The logo

### 1.1 What it is

A bowling ball drawn as an outline, with three finger holes arranged as a
45-45-90 triangle, set against the wordmark RAMBOWLS in Big Shoulders Display
SemiBold.

Two of the holes sit on a single vertical axis (x = 15 on the 24-unit grid)
so that the pair reads as a deliberate rhyme with the vertical stem of the
**R**. The third sits at the right-angle vertex, offset left by exactly half
the vertical spread, which puts both legs of the triangle at 45°. That
alignment is the idea — a randomly scattered triangle is not an acceptable
substitute.

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
| Hole axis (pair) | x = 15, at y = 8.2 and 15.8 |
| Third hole | x = 11.2, y = 12 — the 45° vertex |
| Hole radius | 1.25, all three equal |
| Holes | solid fill, no stroke |

Everything in the mark is one colour. The ball's stroke and the holes' fill
are always the same value.

### 1.3 The lockup

Ball left, wordmark right, sharing a baseline.

- The mark's **box** (the full 24-unit square, not the ball's visible edge)
  sits with its bottom on the type baseline. Because the ball is inset within
  that box, it floats slightly above the baseline and rises slightly above cap
  height. That is intentional and should not be "corrected."
- Gap between the mark box and the wordmark: **0.19 × cap-height-em**
  (`clamp(4.9px, 1.4vw, 8.4px)` at the app's type scale).
- Wordmark tracking: **−0.5%** (`letter-spacing: -.005em`).
- Wordmark case: **always uppercase**, never "Rambowls" in mixed case as a
  logotype. Mixed case is fine in running prose.
- Lockup proportion: **4.874 : 1** (width : height).

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
- Don't move the two paired holes off the x=15 axis, and don't shift the
  third hole off the 45° vertex.
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

## 5. Open item

`data.js` documents `--maple-2` as controlling the "logo finger-holes," but
the CSS currently paints them with `--maple`:

```css
.logo .mark .hole{fill:var(--maple); stroke:none}
```

In the house and NYK themes this is invisible either way. In BKN it matters:
as written the holes are white like the ball; as documented they'd be the
grey secondary. Decide which is intended and make the code and the comment
agree.
