#!/usr/bin/env python3
"""Generate Rambowls PWA icons. Standard library only - no pip installs."""
import zlib, struct, math

LANE  = (0x0E, 0x11, 0x16)
BODY  = (0x1B, 0x22, 0x2B)
SHEEN = (0x24, 0x2D, 0x39)
MAPLE = (0xC8, 0x87, 0x3C)

HOLES = [(-0.17, -0.30), (0.17, -0.30), (0.00, 0.02)]
ANG   = math.radians(-18)


def sample(x, y, size, inset):
    """Colour of one sub-sample point, in ball-local coords."""
    r = size * inset / 2.0
    cx = cy = size / 2.0
    dx, dy = x - cx, y - cy
    dist = math.hypot(dx, dy)

    if dist > r:
        return LANE

    ring = size * 0.011
    if dist > r - ring * 2:
        return MAPLE

    hole = r * 0.135
    for px, py in HOLES:
        rx = px * math.cos(ANG) - py * math.sin(ANG)
        ry = px * math.sin(ANG) + py * math.cos(ANG)
        if math.hypot(dx - rx * r, dy - ry * r) <= hole:
            return MAPLE

    sx, sy = dx + r * 0.47, dy + r * 0.47
    if math.hypot(sx, sy) <= r * 0.31:
        return SHEEN

    return BODY


def render(size, inset, ss=3):
    """Render one icon, supersampled ss x ss per pixel."""
    rows = []
    step = 1.0 / ss
    off = step / 2.0
    for py in range(size):
        row = bytearray()
        for px in range(size):
            r = g = b = 0
            for sy in range(ss):
                for sx in range(ss):
                    c = sample(px + off + sx * step,
                               py + off + sy * step, size, inset)
                    r += c[0]; g += c[1]; b += c[2]
            n = ss * ss
            row += bytes((r // n, g // n, b // n))
        rows.append(bytes(row))
    return rows


def write_png(path, rows, size):
    raw = b"".join(b"\x00" + r for r in rows)

    def chunk(tag, data):
        c = tag + data
        return (struct.pack(">I", len(data)) + c +
                struct.pack(">I", zlib.crc32(c) & 0xFFFFFFFF))

    png = (b"\x89PNG\r\n\x1a\n"
           + chunk(b"IHDR", struct.pack(">IIBBBBB", size, size, 8, 2, 0, 0, 0))
           + chunk(b"IDAT", zlib.compress(raw, 9))
           + chunk(b"IEND", b""))
    with open(path, "wb") as f:
        f.write(png)
    print(f"  {path}  ({len(png):,} bytes)")


if __name__ == "__main__":
    print("Rendering icons...")
    for name, size, inset in [
        ("icon-192.png", 192, 0.86),
        ("icon-512.png", 512, 0.86),
        ("icon-maskable-512.png", 512, 0.62),
        ("apple-touch-icon.png", 180, 0.86),
    ]:
        write_png(name, render(size, inset), size)
    print("Done.")
