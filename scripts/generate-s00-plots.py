#!/usr/bin/env python3
"""Generate the three internal S00 teaching plots as deterministic PNGs.

These are original, synthetic demonstrations. They are not measurements,
reproductions of article figures, or new scientific evidence.

Reproducibility metadata
------------------------
* seed: 20260909 (used for the small noise terms)
* units: time in days; normalized flux dimensionless; wavelength in micrometres;
  relative transit depth in percent; impact values are labelled counts or
  speed-up factors exactly as used by the S00 teaching narrative.
* transformations: analytic transit dip, Gaussian absorption bands, and
  logarithmic x-axis for the deliberately heterogeneous impact comparison.
* limits: all signals and values are synthetic, illustrative, and outside the
  scope of inference, validation, confirmation, or performance benchmarking.
"""

from __future__ import annotations

import math
import random
import struct
import zlib
from pathlib import Path

WIDTH, HEIGHT = 1200, 720
SEED = 20260909
BG = (250, 248, 243)
INK = (31, 42, 55)
BLUE = (33, 103, 156)
RED = (190, 73, 65)
GOLD = (211, 145, 45)
GRID = (218, 220, 217)


def png(path: Path, pixels: bytearray) -> None:
    def chunk(kind: bytes, data: bytes) -> bytes:
        return struct.pack(">I", len(data)) + kind + data + struct.pack(">I", zlib.crc32(kind + data) & 0xffffffff)
    raw = b"".join(b"\0" + pixels[y * WIDTH * 3:(y + 1) * WIDTH * 3] for y in range(HEIGHT))
    path.write_bytes(b"\x89PNG\r\n\x1a\n" + chunk(b"IHDR", struct.pack(">IIBBBBB", WIDTH, HEIGHT, 8, 2, 0, 0, 0)) + chunk(b"tEXt", b"Description\0S00 synthetic educational demonstration; seed=20260909") + chunk(b"IDAT", zlib.compress(raw, 9)) + chunk(b"IEND", b""))


def canvas() -> bytearray:
    return bytearray(BG * (WIDTH * HEIGHT))


def put(im: bytearray, x: int, y: int, c=INK) -> None:
    if 0 <= x < WIDTH and 0 <= y < HEIGHT:
        i = (y * WIDTH + x) * 3
        im[i:i + 3] = bytes(c)


def line(im, x0, y0, x1, y1, c=INK, width=2):
    steps = max(abs(x1 - x0), abs(y1 - y0), 1)
    for n in range(steps + 1):
        x = round(x0 + (x1 - x0) * n / steps); y = round(y0 + (y1 - y0) * n / steps)
        for dx in range(-width // 2, width // 2 + 1):
            for dy in range(-width // 2, width // 2 + 1): put(im, x + dx, y + dy, c)


FONT = {"A":"01110 10001 10001 11111 10001 10001 10001", "B":"11110 10001 10001 11110 10001 10001 11110", "C":"01111 10000 10000 10000 10000 10000 01111", "D":"11110 10001 10001 10001 10001 10001 11110", "E":"11111 10000 10000 11110 10000 10000 11111", "F":"11111 10000 10000 11110 10000 10000 10000", "G":"01111 10000 10000 10111 10001 10001 01111", "H":"10001 10001 10001 11111 10001 10001 10001", "I":"11111 00100 00100 00100 00100 00100 11111", "L":"10000 10000 10000 10000 10000 10000 11111", "M":"10001 11011 10101 10101 10001 10001 10001", "N":"10001 11001 10101 10011 10001 10001 10001", "O":"01110 10001 10001 10001 10001 10001 01110", "P":"11110 10001 10001 11110 10000 10000 10000", "R":"11110 10001 10001 11110 10100 10010 10001", "S":"01111 10000 10000 01110 00001 00001 11110", "T":"11111 00100 00100 00100 00100 00100 00100", "U":"10001 10001 10001 10001 10001 10001 01110", "V":"10001 10001 10001 10001 10001 01010 00100", "Y":"10001 10001 01010 00100 00100 00100 00100", "0":"01110 10001 10011 10101 11001 10001 01110", "1":"00100 01100 00100 00100 00100 00100 01110", "2":"01110 10001 00001 00010 00100 01000 11111", "3":"11110 00001 00001 01110 00001 00001 11110", "4":"00010 00110 01010 10010 11111 00010 00010", "5":"11111 10000 10000 11110 00001 00001 11110", "6":"01110 10000 10000 11110 10001 10001 01110", "7":"11111 00001 00010 00100 01000 01000 01000", "8":"01110 10001 10001 01110 10001 10001 01110", "9":"01110 10001 10001 01111 00001 00001 01110", "-":"00000 00000 00000 11111 00000 00000 00000", ".":"00000 00000 00000 00000 00000 00110 00110", "/":"00001 00010 00100 01000 10000 00000 00000", ":":"00000 00110 00110 00000 00110 00110 00000", " ":"00000 00000 00000 00000 00000 00000 00000"}


def text(im, s, x, y, scale=3, c=INK):
    for ch in s.upper():
        rows = FONT.get(ch, FONT[" "]).split()
        for ry, row in enumerate(rows):
            for rx, bit in enumerate(row):
                if bit == "1":
                    for dx in range(scale):
                        for dy in range(scale): put(im, x + rx * scale + dx, y + ry * scale + dy, c)
        x += 6 * scale


def frame(im, title, xlabel, ylabel, x0=100, y0=80, x1=1130, y1=620):
    text(im, title, 100, 25, 4); text(im, xlabel, 500, 655, 3); text(im, ylabel, 20, 300, 3)
    for frac in (0.0, .25, .5, .75, 1.0):
        x = round(x0 + frac * (x1 - x0)); y = round(y0 + frac * (y1 - y0))
        line(im, x, y0, x, y1, GRID, 1); line(im, x0, y, x1, y, GRID, 1)
    line(im, x0, y1, x1, y1, INK, 3); line(im, x0, y0, x0, y1, INK, 3)
    text(im, "DEMO SINTETICA", 880, 35, 2, RED)
    return x0, y0, x1, y1


def plot_curve(out):
    im = canvas(); x0, y0, x1, y1 = frame(im, "CURVA DE LUZ: TRANSITO", "TIEMPO (DIAS)", "FLUJO NORMALIZADO")
    rng = random.Random(SEED); pts = []
    for i in range(241):
        t = -3 + 6 * i / 240; dip = .012 * math.exp(-((t / .42) ** 8)); f = 1 - dip + rng.gauss(0, .0018); pts.append((t, f))
    for (ta, fa), (tb, fb) in zip(pts, pts[1:]):
        xa = round(x0 + (ta + 3) / 6 * (x1 - x0)); xb = round(x0 + (tb + 3) / 6 * (x1 - x0)); ya = round(y1 - (fa - .985) / .02 * (y1 - y0)); yb = round(y1 - (fb - .985) / .02 * (y1 - y0)); line(im, xa, ya, xb, yb, BLUE, 2)
    text(im, "CAIDA ILUSTRATIVA; RUIDO ARTIFICIAL", 130, 105, 2, RED); png(out / "s00-light-curve.png", im)


def plot_spectrum(out):
    im = canvas(); x0, y0, x1, y1 = frame(im, "ESPECTRO SINTETICO", "LONGITUD DE ONDA (UM)", "FLUJO RELATIVO")
    pts = []
    for i in range(301):
        w = 1.0 + i / 300; f = 1 - .055 * math.exp(-((w - 1.31) / .025) ** 2) - .035 * math.exp(-((w - 1.53) / .035) ** 2); pts.append((w, f))
    for (wa, fa), (wb, fb) in zip(pts, pts[1:]):
        xa = round(x0 + (wa - 1) * (x1 - x0)); xb = round(x0 + (wb - 1) * (x1 - x0)); ya = round(y1 - (fa - .93) / .08 * (y1 - y0)); yb = round(y1 - (fb - .93) / .08 * (y1 - y0)); line(im, xa, ya, xb, yb, RED, 3)
    text(im, "BANDAS ABSORCION: EJEMPLO PEDAGOGICO", 130, 105, 2, RED); png(out / "s00-spectrum.png", im)


def plot_impact(out):
    im = canvas(); x0, y0, x1, y1 = frame(im, "IMPACTO: UNIDADES DISTINTAS", "ESCALA LOGARITMICA (VALOR ILUSTRATIVO)", "CASO")
    vals = [("CURVAS", 83717159, BLUE), ("CANDIDATOS", 10091, RED), ("SISTEMAS", 100000, GOLD), ("ACELERACION", 100000, (100, 130, 90))]
    for j, (label, value, col) in enumerate(vals):
        y = y0 + 95 + j * 105; end = x0 + round(math.log10(value) / 8 * (x1 - x0)); line(im, x0, y, end, y, col, 22); text(im, label, x0 + 15, y - 43, 2); text(im, str(value), min(end + 15, 950), y - 10, 2, col)
    text(im, "NO COMPARAR COMO LA MISMA UNIDAD", 130, 550, 2, RED); png(out / "s00-impact-comparison.png", im)


def main():
    out = Path(__file__).resolve().parents[1] / "public" / "images" / "s00" / "plots"; out.mkdir(parents=True, exist_ok=True)
    plot_curve(out); plot_spectrum(out); plot_impact(out)


if __name__ == "__main__":
    main()
