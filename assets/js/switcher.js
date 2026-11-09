/* Bar shown on every layout: switch layout, and switch between the two colour themes (Emerald is the default, Mono the second). */
(() => {
  "use strict";
  const LAYOUTS = [["index.html", "Editorial"], ["course.html", "Course"], ["game.html", "Game"]];
  const PALS = [["emerald", "Emerald & Ivory, gold", "#053b2d", "#f4f7ec", "#ffc94a"], ["mono", "Midnight & White, lime", "#0a0a0b", "#ffffff", "#c6ff3d"]];
  const root = document.documentElement;
  const here = location.pathname.split("/").pop() || "index.html";
  const bar = document.createElement("nav");
  bar.className = "lay-bar";
  bar.setAttribute("aria-label", "Compare layouts and colours");
  bar.innerHTML = `<span class="lb-k">Layout</span>` +
    LAYOUTS.map(([href, name]) => `<a href="${href}"${href === here ? ' aria-current="page"' : ""}>${name}</a>`).join("") +
    `<span class="lb-sep" aria-hidden="true"></span>` +
    PALS.map(([id, label, d, l, s]) => `<button type="button" data-pal="${id}" aria-label="${label}" title="${label}"><i style="--d:${d};--l:${l};--s:${s}"></i></button>`).join("");
  const sync = () => bar.querySelectorAll("button[data-pal]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.pal === (root.dataset.palette || "emerald"))));
  bar.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-pal]");
    if (!b) return;
    root.dataset.palette = b.dataset.pal;
    sync();
    document.querySelectorAll('.pal-menu [data-pal]').forEach((x) => x.setAttribute("aria-checked", String(x.dataset.pal === b.dataset.pal)));
  });
  sync();
  document.body.appendChild(bar);
})();
