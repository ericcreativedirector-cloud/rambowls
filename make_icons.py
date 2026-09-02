#!/usr/bin/env python3
"""Generate Rambowls PWA icons: the wordmark's R, in Big Shoulders Display.

Needs Pillow and the font file. Fetch the font first:

  curl -sL -o /tmp/bsd700.ttf \
    "https://fonts.gstatic.com/s/bigshouldersdisplay/v24/fC1MPZJEZG-e9gHhdI4-NBbfd2ys3SjJCx12wPgf9g-_3F0YdWg8JF4.ttf"

The favicon is a separate artefact: it carries the R as vector path data
inline in each page's <head>, so it needs no webfont at render time. If the
typeface ever changes, re-extract it with fontTools SVGPathPen and update the
data URI in index.html and tracker/index.html to match these PNGs.
"""
from PIL import Image, ImageDraw, ImageFont

LANE  = (0x0E, 0x11, 0x16)
MAPLE = (0xC8, 0x87, 0x3C)
TTF   = "/tmp/bsd700.ttf"
SS    = 4          # supersample factor, downsampled for clean diagonals


def render(size, cover):
    """cover = fraction of the tile the R's ink height should occupy."""
    S = size * SS
    img = Image.new("RGB", (S, S), LANE)
    d = ImageDraw.Draw(img)
    target = S * cover

    # Binary search the point size whose ink height lands on target. Asking
    # for a point size directly would not do: cap height differs per face.
    lo, hi = 4, S * 3
    for _ in range(40):
        mid = (lo + hi) / 2
        b = ImageFont.truetype(TTF, int(mid)).getbbox("R")
        if b[3] - b[1] < target:
            lo = mid
        else:
            hi = mid

    f = ImageFont.truetype(TTF, int(lo))
    b = f.getbbox("R")
    w, h = b[2] - b[0], b[3] - b[1]
    # Centre on the ink box, not the text origin, or the R sits low and left.
    d.text(((S - w) / 2 - b[0], (S - h) / 2 - b[1]), "R", font=f, fill=MAPLE)
    return img.resize((size, size), Image.LANCZOS)


if __name__ == "__main__":
    print("Rendering icons...")
    for name, size, cover in [
        ("icon-192.png", 192, 0.62),
        ("icon-512.png", 512, 0.62),
        # Android masks maskable icons hard, so the R sits inside the safe zone
        ("icon-maskable-512.png", 512, 0.44),
        ("apple-touch-icon.png", 180, 0.62),
    ]:
        render(size, cover).save(name)
        print(f"  {name}  {size}x{size}")
    print("Done.")
