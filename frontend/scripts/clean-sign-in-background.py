#!/usr/bin/env python3
# Usage: python3 scripts/clean-sign-in-background.py <founder original .webp> src/components/account/sign-in-bg.webp <preview.png>
# The original artwork (supplied by the founder on 22 Nov 2026) had the Sccuni logo and the
# "Build a brighter future" tagline baked in; the page renders both as live text instead.
"""Remove the baked-in logo and script text from the founder's sign-in background.
Each text box is refilled with a Coons patch built from the colours just outside the box
(the background there is a smooth gradient), plus faint grain to match the photo."""
import sys
import numpy as np
from PIL import Image

src, out, preview = sys.argv[1:4]
im = np.asarray(Image.open(src).convert("RGB")).astype(np.float64)
H, W, _ = im.shape
rng = np.random.default_rng(7)

def coons(img, x0, y0, x1, y1, band=4):
    top = np.median(img[y0 - band:y0, x0:x1], axis=0)
    bot = np.median(img[y1:y1 + band, x0:x1], axis=0)
    left = np.median(img[y0:y1, x0 - band:x0], axis=1)
    right = np.median(img[y0:y1, x1:x1 + band], axis=1)
    h, w = y1 - y0, x1 - x0
    u = np.linspace(0, 1, w)[None, :, None]
    v = np.linspace(0, 1, h)[:, None, None]
    tl, tr = img[y0 - band:y0, x0 - band:x0].reshape(-1, 3).mean(0), img[y0 - band:y0, x1:x1 + band].reshape(-1, 3).mean(0)
    bl, br = img[y1:y1 + band, x0 - band:x0].reshape(-1, 3).mean(0), img[y1:y1 + band, x1:x1 + band].reshape(-1, 3).mean(0)
    patch = (1 - u) * left[:, None, :] + u * right[:, None, :] + (1 - v) * top[None, :, :] + v * bot[None, :, :] \
        - ((1 - u) * (1 - v) * tl + u * (1 - v) * tr + (1 - u) * v * bl + u * v * br)
    ring = np.concatenate([img[y0 - 10:y0, x0:x1].reshape(-1, 3), img[y1:y1 + 10, x0:x1].reshape(-1, 3)])
    grain = np.std(ring - np.median(ring, axis=0), axis=0).mean()
    patch += rng.normal(0, min(grain, 2.0), patch.shape[:2])[..., None]
    img[y0:y1, x0:x1] = patch

# Boxes in source pixels (1672×941): the logo top-left, the script top-right.
boxes = [(64, 44, 338, 140), (1336, 70, 1648, 168)]
for b in boxes:
    coons(im, *b)

Image.fromarray(np.clip(im, 0, 255).astype(np.uint8)).save(out, "WEBP", quality=90, method=6)
prev = Image.fromarray(np.clip(im, 0, 255).astype(np.uint8))
a = prev.crop((30, 20, 380, 170)).resize((700, 300))
b = prev.crop((1300, 50, 1660, 190)).resize((720, 280))
sh = Image.new("RGB", (1440, 320), "#888"); sh.paste(a, (0, 0)); sh.paste(b, (720, 0)); sh.save(preview)
print("ok", W, H)
