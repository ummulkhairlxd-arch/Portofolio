/* "Learning path": learners (dots) travel a winding course through the ADDIE stages
   Analyse > Design > Develop > Implement > Evaluate. A few drop off; those who finish light up,
   and the live completion rate is shown. The cursor "coaches": nearby learners speed up.
   Mounted on the Course, Editorial and Game layouts. Pauses off screen; reduced motion gets a still frame. */
(() => {
  "use strict";
  const app = document.getElementById("app");
  if (!app) return;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches || /[?&]still\b/.test(location.search);
  const STAGES = [["A", "Analyse"], ["D", "Design"], ["D", "Develop"], ["I", "Implement"], ["E", "Evaluate"]];
  const NODES = [[.06, .72], [.28, .28], [.5, .7], [.72, .3], [.94, .62]];   // node positions inside the box (0..1)
  const KEEP = .988;   // share that carries on past each stage (about 95% finish overall)
  const MONO = '500 10.5px ui-monospace, "SF Mono", Menlo, Consolas, monospace';
  const rnd = (a, b) => a + Math.random() * (b - a);

  function mount(host, where, caption) {
    const wrap = document.createElement("div");
    wrap.className = "lp-wrap";
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = `<p class="lp-cap"><i></i>${caption}</p><canvas class="lp"></canvas>`;
    where(wrap);
    const cv = wrap.querySelector("canvas"), ctx = cv.getContext && cv.getContext("2d");
    if (!ctx) return;
    let W = 0, H = 0, pts = [], len = 0, nodeS = [], L = [], sparks = [], pops = [], done = 0, dropped = 0, pulse = [0, 0, 0, 0, 0];
    let visible = true, raf = 0;
    const mouse = { x: -9999, y: -9999, in: false };
    const C = {};
    const readColors = () => {
      const cs = getComputedStyle(document.documentElement), g = (n, d) => cs.getPropertyValue(n).trim() || d;
      C.head = g("--d-head", "#f2e8e0"); C.dim = g("--d-dim", "#a08a7e"); C.acc = g("--sig-d", "#f6a5bd"); C.bg = g("--dark", "#2b1d17");
    };
    const mix = (col, a) => `color-mix(in srgb, ${col} ${Math.round(Math.max(0, Math.min(1, a)) * 100)}%, transparent)`;

    /* sample a Catmull-Rom spline through the nodes, with a lead-in from the left edge */
    function build() {
      const pad = 22, bw = W - pad * 2, bh = H - 44;
      const P = NODES.map(([x, y]) => [pad + x * bw, 22 + y * bh]);
      const ctrl = [[-30, P[0][1] + 10], ...P, [W + 30, P[4][1]]];
      pts = []; nodeS = [];
      for (let i = 0; i < ctrl.length - 1; i++) {
        const p0 = ctrl[Math.max(0, i - 1)], p1 = ctrl[i], p2 = ctrl[i + 1], p3 = ctrl[Math.min(ctrl.length - 1, i + 2)];
        for (let k = 0; k < 24; k++) {
          const t = k / 24, t2 = t * t, t3 = t2 * t;
          const f = (a, b, c, d) => .5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
          pts.push({ x: f(p0[0], p1[0], p2[0], p3[0]), y: f(p0[1], p1[1], p2[1], p3[1]) });
        }
      }
      pts.push({ x: ctrl[ctrl.length - 1][0], y: ctrl[ctrl.length - 1][1] });
      len = 0; pts[0].s = 0;
      for (let i = 1; i < pts.length; i++) { len += Math.hypot(pts[i].x - pts[i - 1].x, pts[i].y - pts[i - 1].y); pts[i].s = len; }
      P.forEach((n) => { let best = 0, bd = 1e9; pts.forEach((q) => { const d = Math.hypot(q.x - n[0], q.y - n[1]); if (d < bd) { bd = d; best = q.s; } }); nodeS.push(best); });
    }
    function at(s) {   // point and normal at distance s along the path
      let lo = 0, hi = pts.length - 1;
      while (hi - lo > 1) { const m = (lo + hi) >> 1; if (pts[m].s < s) lo = m; else hi = m; }
      const a = pts[lo], b = pts[hi], k = (s - a.s) / Math.max(.001, b.s - a.s);
      const dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1;
      return { x: a.x + dx * k, y: a.y + dy * k, nx: -dy / d, ny: dx / d };
    }
    const spawn = (l, fresh) => Object.assign(l, { s: fresh ? rnd(0, len) : rnd(-60, 0), v: rnd(.45, .95), off: rnd(-7, 7), stage: 0, drop: false, a: 1, vy: 0, r: rnd(1.6, 2.6) });
    function init() {
      const r = wrap.querySelector("canvas").getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      W = Math.max(1, Math.round(r.width)); H = Math.max(1, Math.round(r.height));
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
      const n = Math.round(Math.min(90, Math.max(30, W / 8)));
      L = []; for (let i = 0; i < n; i++) { const l = spawn({}, true); while (l.stage < 5 && l.s > nodeS[l.stage]) l.stage++; L.push(l); }
      done = 0; dropped = 0;
      for (let k = 0; k < 700; k++) step();   // warm up so the counter starts from a believable number
      sparks = []; pops = [];
    }
    function step() {
      const sc = Math.max(.8, W / 600);
      for (const l of L) {
        if (l.drop) { l.vy += .05; l.y += l.vy; l.a -= .015; if (l.a <= 0) spawn(l); continue; }
        let v = l.v * sc;
        if (mouse.in) { const p = at(l.s), d = Math.hypot(mouse.x - p.x, mouse.y - p.y); if (d < 90) { v *= 1 + 1.6 * (1 - d / 90); l.coach = 1; } }
        l.coach = Math.max(0, (l.coach || 0) - .03);
        l.s += v;
        if (l.stage < 5 && l.s >= nodeS[l.stage]) {
          pulse[l.stage] = 1;
          if (l.stage > 0 && Math.random() > KEEP) { const p = at(l.s); l.drop = true; l.x = p.x + p.nx * l.off; l.y = p.y + p.ny * l.off; dropped++; continue; }
          l.stage++;
          if (l.stage === 5) {
            done++;
            const p = at(l.s);
            for (let k = 0; k < 8; k++) { const a = rnd(0, 6.283), s = rnd(.5, 2.2); sparks.push({ x: p.x, y: p.y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, a: 1 }); }
            if (Math.random() < .5) pops.push({ x: p.x, y: p.y - 16, a: 1 });
          }
        }
        if (l.s > len + 10) spawn(l);
      }
      for (let i = sparks.length - 1; i >= 0; i--) { const s = sparks[i]; s.x += s.vx; s.y += s.vy; s.vx *= .94; s.vy *= .94; s.a -= .03; if (s.a <= 0) sparks.splice(i, 1); }
      for (let i = pops.length - 1; i >= 0; i--) { pops[i].y -= .45; pops[i].a -= .014; if (pops[i].a <= 0) pops.splice(i, 1); }
      pulse = pulse.map((p) => Math.max(0, p - .04));
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      const words = W >= 300;
      // the road: a soft wide band and a dashed centre line
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      ctx.beginPath(); pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)));
      ctx.strokeStyle = mix(C.head, .07); ctx.lineWidth = 20; ctx.stroke();
      ctx.setLineDash([2, 7]); ctx.strokeStyle = mix(C.head, .28); ctx.lineWidth = 1.2; ctx.stroke(); ctx.setLineDash([]);
      // learners
      for (const l of L) {
        let x, y;
        if (l.drop) { x = l.x; y = l.y; } else { const p = at(l.s); x = p.x + p.nx * l.off; y = p.y + p.ny * l.off; }
        ctx.beginPath(); ctx.arc(x, y, l.r + (l.coach ? .8 : 0), 0, 6.283);
        ctx.fillStyle = l.drop ? mix(C.dim, .5 * l.a) : (l.stage >= 4 || l.coach > .2) ? C.acc : mix(C.head, .35 + l.stage * .12);
        ctx.fill();
      }
      // stage nodes
      nodeS.forEach((s, i) => {
        const p = at(s), last = i === 4, r = 12 + pulse[i] * 3;
        ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.283); ctx.fillStyle = C.bg; ctx.fill();
        ctx.strokeStyle = last ? C.acc : mix(C.head, .45 + pulse[i] * .4); ctx.lineWidth = 1.4; ctx.stroke();
        ctx.font = "600 11px Inter, system-ui, sans-serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillStyle = last ? C.acc : C.head; ctx.fillText(STAGES[i][0], p.x, p.y + .5);
        if (words) { ctx.font = MONO; ctx.fillStyle = mix(C.dim, 1); const up = NODES[i][1] < .5; ctx.fillText(STAGES[i][1], Math.min(W - 30, Math.max(30, p.x)), p.y + (up ? -24 : 25)); }
      });
      sparks.forEach((s) => { ctx.fillStyle = mix(C.acc, s.a); ctx.fillRect(s.x - 1.2, s.y - 1.2, 2.4, 2.4); });
      ctx.font = "600 12px Inter, system-ui, sans-serif"; ctx.textAlign = "center";
      pops.forEach((q) => { ctx.fillStyle = mix(C.acc, q.a); ctx.fillText("✓", q.x, q.y); });
      // live completion rate, bottom right
      const rate = done + dropped ? Math.round(done / (done + dropped) * 100) : 95;
      ctx.font = MONO; ctx.textAlign = "right"; ctx.textBaseline = "alphabetic"; ctx.fillStyle = C.acc;
      ctx.fillText(`finished ${done} · completion ${rate}%`, W - 6, H - 4);
      if (mouse.in) { ctx.strokeStyle = mix(C.acc, .4); ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.arc(mouse.x, mouse.y, 40, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); ctx.textAlign = "left"; ctx.fillStyle = mix(C.acc, .8); ctx.fillText("coaching", mouse.x + 46, mouse.y + 4); }
    }
    function frame() { raf = 0; if (!visible || document.hidden) return; step(); draw(); raf = requestAnimationFrame(frame); }
    const start = () => { if (!reduce && !raf) raf = requestAnimationFrame(frame); };
    const still = () => { for (let i = 0; i < 120; i++) step(); draw(); };

    wrap.addEventListener("pointermove", (e) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.in = e.pointerType === "mouse"; }, { passive: true });
    wrap.addEventListener("pointerleave", () => { mouse.in = false; });
    if ("IntersectionObserver" in window) new IntersectionObserver((es) => { visible = es[0].isIntersecting; if (visible) start(); }, { rootMargin: "60px" }).observe(wrap);
    document.addEventListener("visibilitychange", start);
    let rt; new ResizeObserver(() => { clearTimeout(rt); rt = setTimeout(() => { init(); if (reduce) still(); }, 120); }).observe(wrap);
    new MutationObserver(() => { readColors(); if (reduce) draw(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["data-palette"] });
    readColors(); init(); if (reduce) still(); else start();
  }

  const go = () => {
    const ed = document.querySelector(".e-hero"), intro = document.querySelector(".intro"), gh = document.querySelector(".g-hero");
    if (ed) mount(ed, (w) => { w.classList.add("lp-ed"); const big = ed.querySelector(".big"); big ? big.before(w) : ed.appendChild(w); }, "Live · learners moving through an ADDIE course");
    if (intro) mount(intro, (w) => { w.classList.add("lp-course"); intro.insertBefore(w, intro.querySelector(".btn.primary")); }, "Live · how learners move through her courses");
    if (gh) mount(gh, (w) => { w.classList.add("lp-game"); gh.after(w); }, "Quest map · learners on the ADDIE path");
  };
  // the layout scripts render #app on DOMContentLoaded; mount after them
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => setTimeout(go, 0)); else setTimeout(go, 0);
})();
