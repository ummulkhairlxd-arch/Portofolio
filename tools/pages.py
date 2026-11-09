#!/usr/bin/env python3
"""Generates index.html. Run: python3 tools/pages.py
Don't edit the .html files by hand; this script overwrites them.
Bump ASSET_VERSION after changing CSS or JS so returning visitors get the new files."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
ASSET_VERSION = "16"
NAME = "Ummul Khair"
EMAIL = "ummulkhairlxd@gmail.com"


DESC = "Ummul Khair is a learning experience designer who builds training programs, eLearning and AI-powered courses, from needs analysis to evaluation, with 95% completion and 90% learner satisfaction on recent programs."
# Three layouts to compare (Editorial is the home page). Each has its own stylesheet and script and renders from content.js.
PAGES = {}
for fname, stem, fonts in [
    ("index.html", "editorial", "family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter:wght@400;500;600;700"),
    ("course.html", "course", "family=Inter:wght@400;500;600;700"),
    ("game.html", "game", "family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700"),
]:
    PAGES[fname] = {
        "title": f"{NAME} | Learning Experience Designer",
        "desc": DESC,
        "body": f'<div id="app" class="{stem}"></div>',
        "fonts": fonts,
        "css": ["tokens.css", f"{stem}.css"],
        "js": ["content.js", "kit.js", f"{stem}.js", "pathfx.js", "switcher.js"],
        "modal": False,
    }

# old links to editorial.html now land on the home page
REDIRECT = '''<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>Ummul Khair</title>
<meta http-equiv="refresh" content="0; url=index.html">
<script>location.replace("index.html" + location.search + location.hash)</script>
</head><body><a href="index.html">Go to the portfolio</a></body></html>
'''


def page(fname, cfg):
    v = ASSET_VERSION
    css = "\n".join(f'<link rel="stylesheet" href="assets/css/{c}?v={v}">' for c in cfg["css"])
    js = "\n".join(f'<script src="assets/js/{j}?v={v}" defer></script>' for j in cfg["js"])
    modal = '<dialog id="modal" aria-labelledby="mTitle"><div id="modalBody"></div></dialog>\n' if cfg["modal"] else ""
    spot = '<div class="spot" aria-hidden="true"></div>\n' if cfg["modal"] else ""
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{cfg["title"]}</title>
<meta name="description" content="{cfg["desc"]}">
<meta name="author" content="{NAME}">
<meta property="og:type" content="website">
<meta property="og:title" content="{cfg["title"]}">
<meta property="og:description" content="{cfg["desc"]}">
<meta name="theme-color" content="#11261c">
<script>try{{localStorage.removeItem("palette")}}catch(e){{}}document.documentElement.dataset.palette=/[?&]palette=mono(&|$)/.test(location.search)?"mono":"emerald"</script>
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?{cfg["fonts"]}&display=swap" rel="stylesheet">
{css}
</head>
<body data-page="{fname.split(".")[0]}">
{spot}<a class="skip" href="#main">Skip to content</a>
{cfg["body"]}
{modal}<noscript><p style="text-align:center;padding:2rem">This site needs JavaScript to show its content. Email <a href="mailto:{EMAIL}">{EMAIL}</a>.</p></noscript>
{js}
</body>
</html>
'''


for fname, cfg in PAGES.items():
    (ROOT / fname).write_text(page(fname, cfg), encoding="utf-8")
    print("wrote", fname)
(ROOT / "editorial.html").write_text(REDIRECT, encoding="utf-8")
print("wrote editorial.html (redirect)")
