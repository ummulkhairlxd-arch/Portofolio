/* Course layout: the portfolio as a short online course with modules, lessons, knowledge checks and a certificate. */
(() => {
  "use strict";
  const S = window.SITE, P = S.person, { esc, ext, ICON, contacts, reveal } = window.KIT;
  const app = document.getElementById("app");
  const byId = Object.fromEntries(S.projects.map((p) => [p.id, p]));

  const MODULES = [
    { id: "m-about", t: "Meet your instructor", mins: 1, lessons: ["Who she is", "How she works"] },
    { id: "m-journey", t: "The learning journey", mins: 2, lessons: S.experience.map((e) => e.org.replace(/\s*\(.*\)/, "")) },
    { id: "m-programs", t: "Programs in practice", mins: 4, lessons: S.projects.map((p) => p.short) },
    { id: "m-toolkit", t: "Toolkit and credentials", mins: 1, lessons: ["Methods and tools", "Certifications", "Languages"] },
    { id: "m-hire", t: "Final module: work together", mins: 1, lessons: ["What you get", "How she works", "Certificate"] }
  ];
  const total = MODULES.reduce((a, m) => a + m.mins, 0);

  /* knowledge check per program: the key number, with two other programs' numbers as distractors */
  const quiz = (p, i) => {
    const right = p.stats[0][0];
    const pool = [...new Set(S.projects.filter((q) => q !== p).map((q) => q.stats[0][0]).filter((v) => v !== right))];
    const wrong = [pool[i % pool.length], pool[(i + 1) % pool.length]];
    const opts = [right, ...wrong];
    const order = [[0, 1, 2], [1, 0, 2], [2, 1, 0], [1, 2, 0], [0, 2, 1]][i % 5].map((k) => opts[k]);
    return `<div class="kc" data-answer="${esc(right)}">
      <div class="kc-h">${ICON.spark}<span>Knowledge check</span></div>
      <p class="kc-q">${esc(p.short)}: what was the <b>${esc(p.stats[0][1])}</b>?</p>
      <div class="kc-opts">${order.map((o) => `<button type="button" data-opt="${esc(o)}">${esc(o)}</button>`).join("")}</div>
      <p class="kc-fb" aria-live="polite"></p>
    </div>`;
  };

  const lesson = (p, i) => `<article class="lesson" id="${p.id}" data-reveal>
    <div class="lesson-top"><span class="ln">Lesson 3.${i + 1}</span><span class="lc">${esc(p.client)}</span></div>
    <h3>${esc(p.title)}</h3>
    <p class="lead">${esc(p.summary)}</p>
    <div class="stats">${p.stats.map(([b, s], k) => `<div${k === 0 ? ' class="key"' : ""}><b>${esc(b)}</b><span>${esc(s)}</span></div>`).join("")}</div>
    <details>
      <summary><span>The problem and what she built</span>${ICON.down}</summary>
      <div class="det">
        <h4>The problem</h4><p>${esc(p.context)}</p>
        <h4>What she built</h4><ul class="ticks">${p.built.map((b) => `<li>${ICON.check}<span>${esc(b)}</span></li>`).join("")}</ul>
        <h4>The flow</h4><ol class="flow">${p.flow.map(([a, b]) => `<li><b>${esc(a)}</b><small>${esc(b)}</small></li>`).join("")}</ol>
        <div class="chips">${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div>
      </div>
    </details>
    ${quiz(p, i)}
  </article>`;

  const contactBtns = (primary) => contacts(P).map(([n, h, icon, attrs], k) =>
    `<a class="btn${k === 0 && primary ? " primary" : ""}" href="${h}" ${attrs}>${icon}<span>${n === "CV" ? "Download CV" : n}</span></a>`).join("");

  app.innerHTML = `
  <header class="c-top">
    <a class="c-brand" href="#m-intro"><span class="mono">${esc(P.short)}</span><span class="c-title"><b>Meet ${esc(P.name)}</b><small>A ${MODULES.length}-module course · about ${total} min</small></span></a>
    <div class="c-prog" aria-label="Course progress"><span class="c-pct">0%</span><div class="bar"><i></i></div></div>
    <a class="btn primary sm" href="${P.cv}" download>${ICON.cv}<span>Resume</span></a>
  </header>
  <div class="c-wrap">
    <aside class="c-side" aria-label="Course outline">
      <button class="c-toggle" type="button" aria-expanded="false">Course outline ${ICON.down}</button>
      <nav class="c-outline">
        <p class="c-k">Course outline</p>
        <ol>${MODULES.map((m, i) => `<li data-mod="${m.id}">
          <a href="#${m.id}"><span class="dot">${i + 1}</span><span class="mt"><b>${esc(m.t)}</b><small>${m.lessons.length} lessons · ${m.mins} min</small></span></a>
          <ul>${m.lessons.map((l) => `<li>${esc(l)}</li>`).join("")}</ul>
        </li>`).join("")}</ol>
      </nav>
      <div class="c-inst">
        <p class="c-k">Your instructor</p>
        <p><b>${esc(P.name)}</b><br>${esc(S.experience[0].role)}, ${esc(S.experience[0].org)}</p>
        <div class="c-inst-links">${contacts(P).map(([n, h, icon, attrs]) => `<a href="${h}" ${attrs} aria-label="${n}" title="${n}">${icon}</a>`).join("")}</div>
      </div>
    </aside>

    <main id="main" class="c-main">
      <section class="intro" id="m-intro">
        <p class="eyebrow">Course · Learning Experience Design</p>
        <h1>Meet ${esc(P.name)}</h1>
        <p class="lead">${esc(P.typed[0].charAt(0).toUpperCase() + P.typed[0].slice(1))}: programs, eLearning and AI-powered courses, from needs analysis to evaluation.</p>
        <div class="objectives">
          <p class="c-k">Learning objectives</p>
          <ul class="ticks">
            <li>${ICON.check}<span>Know how she designs learning, end to end</span></li>
            <li>${ICON.check}<span>See five real programs and the results they reached</span></li>
            <li>${ICON.check}<span>Know how to hire her for your next program</span></li>
          </ul>
        </div>
        <a class="btn primary" href="#m-about">${ICON.play}<span>Start the course</span></a>
      </section>

      <section class="module" id="m-about" data-reveal>
        <p class="mod-k">Module 1 · ${MODULES[0].mins} min</p><h2>${MODULES[0].t}</h2>
        <div class="prose">${S.about.map((p) => `<p>${p}</p>`).join("")}</div>
        <div class="callout"><b>Key takeaway</b><p>She starts from the real skill gap, designs with a proven method, and measures what changed.</p></div>
      </section>

      <section class="module" id="m-journey" data-reveal>
        <p class="mod-k">Module 2 · ${MODULES[1].mins} min</p><h2>${MODULES[1].t}</h2>
        <ol class="journey">${S.experience.map((e) => `<li>
          <span class="j-dot" aria-hidden="true"></span>
          <p class="j-when">${esc(e.when)}</p>
          <h3>${esc(e.role)} <span>· ${esc(e.org)}</span></h3>
          <p>${esc(e.text)}</p>
          ${e.projects ? `<a class="j-link" href="#${e.projects[0]}">Go to the lesson ${ICON.arrow}</a>` : ""}
        </li>`).join("")}</ol>
      </section>

      <section class="module" id="m-programs">
        <p class="mod-k">Module 3 · ${MODULES[2].mins} min</p><h2>${MODULES[2].t}</h2>
        <p class="mod-lead">Five programs, each with its results. Try the knowledge check at the end of each lesson.</p>
        ${S.projects.map(lesson).join("")}
      </section>

      <section class="module" id="m-toolkit" data-reveal>
        <p class="mod-k">Module 4 · ${MODULES[3].mins} min</p><h2>${MODULES[3].t}</h2>
        <div class="res-grid">${S.toolkit.map((g) => `<div class="res"><h3>${ICON.book}${esc(g.t)}</h3><div class="chips">${g.items.map((x) => `<span>${esc(x)}</span>`).join("")}</div></div>`).join("")}</div>
        <h3 class="sub">Certifications</h3>
        <ul class="certs">${S.certs.map(([t, by]) => `<li>${ICON.award}<div><b>${esc(t)}</b><small>${esc(by)}</small></div></li>`).join("")}</ul>
        <div class="two">
          <div><h3 class="sub">Languages</h3><ul class="langs">${S.languages.map(([l, lv]) => `<li><b>${esc(l)}</b><span>${esc(lv)}</span></li>`).join("")}</ul></div>
          <div><h3 class="sub">Education</h3><p><b>${esc(S.education.school)}</b><br>${esc(S.education.degree)}</p></div>
        </div>
      </section>

      <section class="module" id="m-hire" data-reveal>
        <p class="mod-k">Module 5 · ${MODULES[4].mins} min</p><h2>${MODULES[4].t}</h2>
        <h3 class="sub">What you get</h3>
        <div class="why">${S.why.map((w) => `<div class="why-i"><h4>${esc(w.t)}</h4><p>${esc(w.d)}</p><p class="proof">${ICON.check}<span>${esc(w.proof)}</span></p></div>`).join("")}</div>
        <h3 class="sub">How she works</h3>
        <ol class="steps">${S.process.map(([t, d], i) => `<li><span>${i + 1}</span><div><b>${esc(t)}</b><p>${esc(d)}</p></div></li>`).join("")}</ol>
        <div class="cert" id="cert">
          <p class="cert-k">Certificate of completion</p>
          <p class="cert-t">You've completed <b>Meet ${esc(P.name)}</b></p>
          <p class="cert-s">${esc(S.contact.text)}</p>
          <div class="cert-btns">${contactBtns(true)}</div>
          <p class="cert-f">${esc(S.contact.where)} · ${esc(P.email)}</p>
        </div>
      </section>
    </main>
  </div>`;

  /* knowledge checks */
  app.addEventListener("click", (e) => {
    const b = e.target.closest(".kc-opts button");
    if (!b) return;
    const kc = b.closest(".kc"), ok = b.dataset.opt === kc.dataset.answer;
    kc.querySelectorAll("button").forEach((x) => { x.disabled = true; if (x.dataset.opt === kc.dataset.answer) x.classList.add("right"); });
    if (!ok) b.classList.add("wrong");
    kc.querySelector(".kc-fb").textContent = ok ? "Correct. That's straight from the program's results." : `Not quite: it was ${kc.dataset.answer}.`;
  });

  /* outline toggle on phones */
  const tg = app.querySelector(".c-toggle"), side = app.querySelector(".c-side");
  tg.addEventListener("click", () => { const open = side.classList.toggle("open"); tg.setAttribute("aria-expanded", String(open)); });
  app.querySelectorAll(".c-outline a").forEach((a) => a.addEventListener("click", () => { side.classList.remove("open"); tg.setAttribute("aria-expanded", "false"); }));

  /* progress: a module counts as done once you've scrolled past most of it */
  const done = new Set(), items = Object.fromEntries(MODULES.map((m) => [m.id, app.querySelector(`[data-mod="${m.id}"]`)]));
  const pct = app.querySelector(".c-pct"), bar = app.querySelector(".c-prog i");
  const update = () => {
    let current = MODULES[0].id;
    for (const m of MODULES) {
      const el = document.getElementById(m.id), r = el.getBoundingClientRect();
      if (r.top < innerHeight * 0.45) current = m.id;
      if (r.bottom < innerHeight * 0.9 || (m.id === "m-hire" && r.top < innerHeight * 0.5)) done.add(m.id);
    }
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) MODULES.forEach((m) => done.add(m.id));
    for (const m of MODULES) { items[m.id].classList.toggle("done", done.has(m.id)); items[m.id].classList.toggle("on", m.id === current); }
    const v = Math.round((done.size / MODULES.length) * 100);
    pct.textContent = v + "%"; bar.style.width = v + "%";
  };
  addEventListener("scroll", update, { passive: true }); addEventListener("resize", update); update();
  reveal();
})();
