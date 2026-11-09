/* Review bar shown on all four layouts: pick a layout, pick a colour theme. Remove this file once a layout is chosen. */
(() => {
  "use strict";
  const LAYOUTS = [["index.html", "Editorial"], ["course.html", "Course"], ["game.html", "Game"]];
  const PALS = [["navy", "Navy & Cream, coral", "#0f1b33", "#f3ead8", "#ff7a66"], ["forest", "Forest & Sand, purple", "#11261c", "#ece3d0", "#b08cff"], ["mono", "Midnight & White, lime", "#0a0a0b", "#ffffff", "#c6ff3d"], ["mulberry", "Mulberry & Rose, caramel", "#3d1a2a", "#fbedf1", "#e8b07a"], ["indigo", "Electric Indigo, hot pink", "#15104a", "#efedff", "#ff5cad"], ["ocean", "Ocean & Foam, tangerine", "#06293a", "#e5f5f2", "#ff8a3d"], ["plum", "Plum & Blush, electric cyan", "#2b0e30", "#fcedf4", "#3ee6ff"], ["emerald", "Emerald & Ivory, gold", "#053b2d", "#f4f7ec", "#ffc94a"], ["raspberry", "Raspberry & Peach, sunflower", "#5c0f3d", "#fff0e8", "#ffc53d"]];
  const root = document.documentElement;
  const here = location.pathname.split("/").pop() || "index.html";
  const bar = document.createElement("nav");
  bar.className = "lay-bar";
  bar.setAttribute("aria-label", "Compare layouts and colours");
  bar.innerHTML = `<span class="lb-k">Layout</span>` +
    LAYOUTS.map(([href, name]) => `<a href="${href}"${href === here ? ' aria-current="page"' : ""}>${name}</a>`).join("") +
    `<span class="lb-sep" aria-hidden="true"></span>` +
    PALS.map(([id, label, d, l, s]) => `<button type="button" data-pal="${id}" aria-label="${label}" title="${label}"><i style="--d:${d};--l:${l};--s:${s}"></i></button>`).join("");
  const sync = () => bar.querySelectorAll("button[data-pal]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.pal === (root.dataset.palette || "forest"))));
  bar.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-pal]");
    if (!b) return;
    root.dataset.palette = b.dataset.pal;
    try { localStorage.setItem("palette", b.dataset.pal); } catch (err) {}
    sync();
    document.querySelectorAll('.pal-menu [data-pal]').forEach((x) => x.setAttribute("aria-checked", String(x.dataset.pal === b.dataset.pal)));
  });
  sync();
  document.body.appendChild(bar);
})();
