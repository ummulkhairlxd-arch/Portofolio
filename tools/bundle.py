#!/usr/bin/env python3
"""Packs the whole Kei site (all three layouts, every colour theme, CV) into ONE self-contained HTML file
that can be emailed and opened by double-click. Run: python3 tools/pages.py && python3 tools/bundle.py
Output: ../kei-share/Ummul-Khair-portfolio-preview.html"""
import base64, json, re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT.parent / "kei-share" / "Ummul-Khair-portfolio-preview.html"
LAYOUTS = [("editorial", "index.html", "Editorial"), ("course", "course.html", "Course"), ("game", "game.html", "Game")]
PALS = [("navy", "Navy & Cream", "coral", "#0f1b33", "#f3ead8", "#ff7a66"),
        ("forest", "Forest & Sand", "electric purple", "#11261c", "#ece3d0", "#b08cff"),
        ("mono", "Midnight & White", "lime", "#0a0a0b", "#ffffff", "#c6ff3d"),
        ("mulberry", "Mulberry & Rose", "caramel", "#3d1a2a", "#fbedf1", "#e8b07a"),
        ("indigo", "Electric Indigo", "hot pink", "#15104a", "#efedff", "#ff5cad"),
        ("ocean", "Ocean & Foam", "tangerine", "#06293a", "#e5f5f2", "#ff8a3d"),
        ("plum", "Plum & Blush", "electric cyan", "#2b0e30", "#fcedf4", "#3ee6ff"),
        ("emerald", "Emerald & Ivory", "gold", "#053b2d", "#f4f7ec", "#ffc94a"),
        ("raspberry", "Raspberry & Peach", "sunflower", "#5c0f3d", "#fff0e8", "#ffc53d")]

cv_uri = "data:application/pdf;base64," + base64.b64encode((ROOT / "assets/doc/Ummul-Khair-CV.pdf").read_bytes()).decode()
icon_uri = "data:image/svg+xml;base64," + base64.b64encode((ROOT / "favicon.svg").read_bytes()).decode()

# runs first inside every layout: theme from the parent page, safe history calls, and CV links that download with a proper name
SHIM = """<script>
(function(){
  try { document.documentElement.dataset.palette = (parent && parent.__pal) || "emerald"; } catch (e) {}
  ["pushState","replaceState"].forEach(function(k){ var f = history[k]; history[k] = function(){ try { return f.apply(history, arguments); } catch (e) {} }; });
  document.addEventListener("click", function(e){
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (a && a.getAttribute("href").length > 1 && !a.hasAttribute("data-sec") && !e.defaultPrevented) {
      var t = document.getElementById(a.getAttribute("href").slice(1));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
    }
  });
  new MutationObserver(function(){
    document.querySelectorAll('a[href^="data:application/pdf"]').forEach(function(a){ a.setAttribute("download", "Ummul-Khair-CV.pdf"); });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
</script>"""


def inline(html: str) -> str:
    """Replace linked CSS/JS with their contents; drop the review switcher (the wrapper has its own)."""
    def css(m):
        return "<style>\n" + (ROOT / "assets/css" / m.group(1)).read_text() + "\n</style>"
    def js(m):
        name = m.group(1)
        if name == "switcher.js":
            return ""
        src = (ROOT / "assets/js" / name).read_text()
        if name == "content.js":
            src = src.replace('"assets/doc/Ummul-Khair-CV.pdf"', json.dumps(cv_uri))
        return "<script>\n" + src.replace("</script", "<\\/script") + "\n</script>"
    html = re.sub(r'<link rel="stylesheet" href="assets/css/([\w.-]+)\?v=[^"]*">', css, html)
    html = re.sub(r'<script src="assets/js/([\w.-]+)\?v=[^"]*" defer></script>', js, html)
    html = re.sub(r"<script>try\{var m=location\.search.*?</script>", "", html)  # theme comes from the wrapper instead
    html = html.replace('href="favicon.svg"', f'href="{icon_uri}"')
    # links between layouts would leave the file: make them switch layout in the wrapper instead
    html = html.replace("<head>", "<head>\n" + SHIM, 1)
    return html


pages = {key: inline((ROOT / fname).read_text()) for key, fname, _ in LAYOUTS}

pages_json = json.dumps(pages).replace("</", "<\\/")  # keep inner </script> tags from closing this script
tabs = "".join(f'<button type="button" data-lay="{k}">{label}</button>' for k, _, label in LAYOUTS)
dots = "".join(f'<button type="button" class="pal" data-pal="{p}" title="{n}, {h}" aria-label="{n}, with a hint of {h}"><i style="--d:{d};--l:{l};--s:{s}"></i><span>{n}</span></button>' for p, n, h, d, l, s in PALS)

shell = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Ummul Khair · Portfolio preview (4 layouts)</title>
<link rel="icon" href="{icon_uri}">
<style>
*{{box-sizing:border-box}}
html,body{{margin:0;height:100%;background:#0b0b0c;font:500 14px/1.2 Inter,system-ui,-apple-system,"Segoe UI",sans-serif;color:#e9e9ec}}
.bar{{position:fixed;inset:0 0 auto 0;z-index:5;display:flex;align-items:center;gap:10px;height:56px;padding:0 14px;background:#0b0b0c;border-bottom:1px solid #26262b;overflow-x:auto;scrollbar-width:none}}
.bar::-webkit-scrollbar{{display:none}}
.k{{flex:none;color:#8e8e95;font-size:11px;letter-spacing:.1em;text-transform:uppercase}}
.grp{{flex:none;display:flex;gap:4px;padding:4px;border-radius:999px;background:#18181c}}
.grp button{{flex:none;display:flex;align-items:center;gap:7px;padding:8px 14px;border:0;border-radius:999px;background:none;color:#c9c9cf;font:inherit;cursor:pointer;white-space:nowrap}}
.grp button:hover{{color:#fff;background:#24242a}}
.grp button[aria-pressed="true"]{{background:#fff;color:#0b0b0c}}
.pal i{{position:relative;display:block;width:16px;height:16px;border-radius:50%;background:linear-gradient(90deg,var(--d) 0 50%,var(--l) 50% 100%);box-shadow:inset 0 0 0 1px rgba(255,255,255,.25)}}
.pal i::after{{content:"";position:absolute;right:-3px;bottom:-3px;width:8px;height:8px;border-radius:50%;background:var(--s);box-shadow:0 0 0 1.5px #18181c}}
.sp{{flex:1 0 8px}}
.note{{flex:none;color:#7c7c83;font-size:12px}}
iframe{{position:fixed;inset:56px 0 0 0;width:100%;height:calc(100% - 56px);border:0;background:#fff}}
@media (max-width:820px){{.pal span,.note{{display:none}}.grp button{{padding:8px 11px}}}}
</style>
</head>
<body>
<div class="bar" role="toolbar" aria-label="Choose a layout and a colour theme">
  <span class="k">Layout</span><div class="grp" id="lays">{tabs}</div>
  <span class="k">Colours</span><div class="grp" id="pals">{dots}</div>
  <span class="sp"></span><span class="note">Preview for Ummul Khair · pick a layout and a colour theme</span>
</div>
<iframe id="view" title="Portfolio preview"></iframe>
<script>
var PAGES = {pages_json};
var view = document.getElementById("view"), cur = "editorial";
window.__pal = "forest";
function mark(sel, attr, val) {{ document.querySelectorAll(sel).forEach(function (b) {{ b.setAttribute("aria-pressed", String(b.dataset[attr] === val)); }}); }}
function show(k) {{ cur = k; view.srcdoc = PAGES[k]; mark("#lays button", "lay", k); }}
function pal(p) {{
  window.__pal = p; mark("#pals button", "pal", p);
  try {{ var d = view.contentDocument; d.documentElement.dataset.palette = p;
    d.querySelectorAll(".pal-menu [data-pal]").forEach(function (x) {{ x.setAttribute("aria-checked", String(x.dataset.pal === p)); }});
    var w = view.contentWindow; if (w.Field && w.Field.refresh) w.Field.refresh(); }} catch (e) {{}}
}}
document.getElementById("lays").addEventListener("click", function (e) {{ var b = e.target.closest("button"); if (b) show(b.dataset.lay); }});
document.getElementById("pals").addEventListener("click", function (e) {{ var b = e.target.closest("button"); if (b) pal(b.dataset.pal); }});
/* keep the wrapper in sync if a layout changes the theme itself */
view.addEventListener("load", function () {{
  try {{ var d = view.contentDocument;
    new MutationObserver(function () {{ var p = d.documentElement.dataset.palette; if (p && p !== window.__pal) {{ window.__pal = p; mark("#pals button", "pal", p); }} }})
      .observe(d.documentElement, {{ attributes: true, attributeFilter: ["data-palette"] }});
  }} catch (e) {{}}
}});
mark("#pals button", "pal", "forest"); show(cur);
</script>
</body>
</html>
"""

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(shell, encoding="utf-8")
print(f"wrote {OUT} ({OUT.stat().st_size / 1024:.0f} KB)")
