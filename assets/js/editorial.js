/* Editorial layout: a warm, magazine-style single page. Each program gets a drawn "learning artifact". */
(() => {
  "use strict";
  const S = window.SITE, P = S.person, { esc, ext, ICON, contacts, reveal } = window.KIT;
  const app = document.getElementById("app");

  /* small CSS-drawn artifacts, one per program */
  const ART = {
    alvigor: () => `<div class="art art-guide" aria-hidden="true">
      <div class="paper back"></div><div class="paper">
        <p class="pk">Facilitator guide · Session 2</p><p class="pt">Experiential activity</p>
        <div class="row"><b>00:00</b><span>Hook: a real workplace scenario</span></div>
        <div class="row"><b>00:10</b><span>Do it: teams try the task</span></div>
        <div class="row"><b>00:35</b><span>Debrief: what changed and why</span></div>
        <div class="row"><b>00:50</b><span>Apply: commit to one action</span></div>
      </div><div class="note">Debrief question:<br>"What would you do differently on Monday?"</div></div>`,
    pintarnya: () => `<div class="art art-phone" aria-hidden="true"><div class="phone">
      <div class="vid">${ICON.play}<span class="cap">Lesson 4 · Short video</span></div>
      <div class="pbar"><i></i></div><p class="pl">Course progress <b>95%</b></p>
      <ul><li class="ok">✓ 1. Watch: the basics</li><li class="ok">✓ 2. Try: a worked example</li><li class="ok">✓ 3. Check: short quiz</li><li class="now">▶ 4. Watch: next skill</li><li>5. Final assessment</li></ul>
    </div></div>`,
    mentorbox: () => `<div class="art art-map" aria-hidden="true">
      <p class="mk">Curriculum map · Content Creator (BNSP)</p>
      <div class="grid">${["Audience research", "Content planning", "Copywriting", "Visual design", "Video basics", "Analytics", "Publishing", "Portfolio"].map((t, i) => `<span class="c${i % 3}">${t}</span>`).join("")}</div>
      <p class="mf">Competency standard → unit → lesson → assessment</p></div>`,
    bitlabs: () => `<div class="art art-call" aria-hidden="true">
      <div class="tiles">${["AR", "DM", "SN", "RP", "YT", "FK"].map((t, i) => `<span class="${i === 0 ? "spk" : ""}">${t}</span>`).join("")}</div>
      <div class="rate">${ICON.star}<b>4.8</b><small>/ 5 session rating</small></div>
      <div class="poll"><p>Poll: which chart fits this data?</p><i style="--w:72%"></i><i style="--w:18%"></i><i style="--w:10%"></i></div></div>`,
    kkb: () => `<div class="art art-cards" aria-hidden="true">
      <div class="mc m3"><small>Mission 03</small><b>Ship a landing page</b><span>+120 XP</span></div>
      <div class="mc m2"><small>Mission 02</small><b>Style it responsively</b><span>+90 XP</span></div>
      <div class="mc m1"><small>Mission 01</small><b>Build the layout</b><span>✓ Complete</span></div></div>`
  };

  /* where each tool was used: every line comes from her CV */
  const USED = {
    "ADDIE": "Youth Ranger Indonesia: training programs built with ADDIE, lifting team performance metrics by 15%.",
    "Kirkpatrick evaluation": "Bitlabs Academy: outcomes evaluated for 50+ learners; participation +30%, comprehension +20%.",
    "Kolb experiential learning": "Alvigor: 10+ experiential programs for Singapore professionals, 90% learner satisfaction.",
    "Training / Learning Needs Analysis": "Mentorbox: needs analysis for 10+ programs across 20 classes.",
    "Curriculum mapping": "Mentorbox: 10+ end-to-end curricula aligned with BNSP national competency standards.",
    "AI workflow optimization": "Pintarnya: a multi-AI production workflow that cut production time by 40%.",
    "Multi-AI video production": "Pintarnya: 80+ AI-integrated learning videos and assessments.",
    "Rapid content authoring": "Pintarnya: 15+ technical syllabi turned into short modules, 95% completion.",
    "Quality assurance": "PT. Karya Kaya Bahagia: 20+ self-paced modules that beat company quality benchmarks by 15%.",
    "Stakeholder management": "Mentorbox: worked with 12+ subject matter experts and external stakeholders.",
    "Learning product strategy": "Alvigor: 15+ learning products, growing the product portfolio by 30%.",
    "Virtual facilitation (Zoom, Google Meet)": "Bitlabs Academy: 100+ participants across 10+ sessions, rated 4.8/5."
  };
  const LEVEL = { Native: 100, Professional: 82, Advanced: 70, Beginner: 22 };

  const headline = `I design learning people <em>actually finish.</em>`;
  const big = [["95%", "learner completion", "Pintarnya"], ["90%", "learner satisfaction", "Alvigor"], ["4.8/5", "session rating", "Bitlabs"], ["40%", "faster production with AI", "Pintarnya"]];

  app.innerHTML = `
  <header class="e-nav">
    <a class="e-name" href="#top">${esc(P.name)}</a>
    <nav aria-label="Sections"><a href="#work">Work</a><a href="#experience">Experience</a><a href="#about">About</a><a href="#toolkit">Toolkit</a><a href="#contact">Contact</a></nav>
    <a class="e-btn accent sm" href="${P.cv}" download>${ICON.cv}<span>Resume</span></a>
  </header>

  <main id="main">
    <section class="e-hero dark" id="top">
      <div class="in">
        <p class="kick">Learning Experience Designer · ${esc(P.location)}</p>
        <h1>${headline}</h1>
        <p class="sub">Training programs, eLearning and AI-powered courses, from needs analysis to evaluation. Currently designing experiential programs at Alvigor, Singapore.</p>
        <div class="ctas"><a class="e-btn accent" href="#work">See the work ${ICON.arrow}</a><a class="e-btn ghost" href="mailto:${P.email}">${ICON.mail}<span>Email me</span></a></div>
        <dl class="big">${big.map(([n, l, w]) => `<div><dt>${n}</dt><dd>${l}<small>${w}</small></dd></div>`).join("")}</dl>
      </div>
    </section>

    <section class="e-work light" id="work">
      <div class="in">
        <p class="sec-k">Selected work</p>
        <h2 class="sec-h">Five programs, and what they changed</h2>
        ${S.projects.map((p, i) => `<article class="case${i % 2 ? " flip" : ""}" id="case-${p.id}" data-reveal>
          <figure class="case-art">${ART[p.id] ? ART[p.id]() : ""}<figcaption>Illustration of the format, not the client's material</figcaption></figure>
          <div class="case-txt">
            <p class="ck">${esc(p.client)} · ${esc(p.when)}</p>
            <h3>${esc(p.title)}</h3>
            <p class="cs">${esc(p.summary)}</p>
            <dl class="cn">${p.stats.map(([b, s], k) => `<div${k === 0 ? ' class="key"' : ""}><dt>${esc(b)}</dt><dd>${esc(s)}</dd></div>`).join("")}</dl>
            <ul class="cb">${p.built.slice(0, 3).map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
            <p class="ct">${p.stack.map(esc).join(" · ")}</p>
          </div>
        </article>`).join("")}
      </div>
    </section>

    <section class="e-xp dark" id="experience">
      <div class="in">
        <p class="sec-k">Experience</p>
        <h2 class="sec-h">Six roles since late 2023, each one built on the last</h2>
        <ol class="tl" style="--p:0">${S.experience.map((e, i) => `<li class="tl-i${i === 0 ? " now" : ""}">
          <span class="tl-dot" aria-hidden="true"></span>
          <div class="tl-card">
            <p class="tl-when">${i === 0 ? '<span class="tl-live">Now</span>' : ""}${esc(e.when)}</p>
            <h3>${esc(e.role)}</h3>
            <p class="tl-org">${esc(e.org)}</p>
            <p class="tl-txt">${esc(e.text)}</p>
            ${(e.projects || []).filter((id) => S.projects.some((p) => p.id === id)).map((id) => `<a class="tl-link" href="#case-${id}">See the case study ${ICON.arrow}</a>`).join("")}
          </div>
        </li>`).join("")}</ol>
      </div>
    </section>

    <section class="e-about light alt" id="about">
      <div class="in two">
        <div><p class="sec-k">About</p><blockquote>"Start from the real skill gap, design with a proven method, and measure what changed."</blockquote></div>
        <div class="prose">${S.about.map((p) => `<p>${p}</p>`).join("")}</div>
      </div>
    </section>

    <section class="e-tool light" id="toolkit">
      <div class="in">
        <p class="sec-k">Toolkit</p>
        <h2 class="sec-h">What I work with, and where it made a difference</h2>
        <div class="tk">
          <div class="tk-tabs" role="tablist" aria-label="Toolkit groups">${S.toolkit.map((g, i) => `<button type="button" role="tab" id="tkt-${i}" aria-controls="tkp-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">
            <span class="tk-ic">${[ICON.book, ICON.play, ICON.spark, ICON.award][i] || ICON.book}</span><span class="tk-t">${esc(g.t)}</span><span class="tk-n">${g.items.length}</span></button>`).join("")}</div>
          ${S.toolkit.map((g, i) => `<div class="tk-panel" role="tabpanel" id="tkp-${i}" aria-labelledby="tkt-${i}"${i ? " hidden" : ""}>
            <ul class="tk-chips">${g.items.map((x, k) => USED[x] ? `<li style="--k:${k}"><button type="button" class="chip used" aria-expanded="false">${esc(x)}<i aria-hidden="true"></i></button></li>` : `<li style="--k:${k}"><span class="chip">${esc(x)}</span></li>`).join("")}</ul>
            <p class="tk-note" aria-live="polite"><span>${g.items.some((x) => USED[x]) ? "Tap a ● tool to see where I used it." : ""}</span></p>
          </div>`).join("")}
        </div>
        <div class="tk-more">
          <div class="tk-certs"><h3>Certifications</h3><ul>${S.certs.map(([t, by]) => `<li>${ICON.award}<span>${esc(t)}<small>${esc(by)}</small></span></li>`).join("")}</ul></div>
          <div class="tk-side">
            <div><h3>Languages</h3><ul class="tk-lang">${S.languages.map(([l, lv]) => `<li><span>${esc(l)}<small>${esc(lv)}</small></span><i style="--v:${LEVEL[lv] || 50}%"></i></li>`).join("")}</ul></div>
            <div><h3>Education</h3><p class="tk-edu">${esc(S.education.school)}<small>${esc(S.education.degree)}</small></p></div>
          </div>
        </div>
      </div>
    </section>

    <section class="e-contact dark" id="contact">
      <div class="in">
        <p class="sec-k">Work with me</p>
        <h2>${esc(S.contact.title)}.</h2>
        <div class="why">${S.why.map((w) => `<div><b>${esc(w.t)}</b><small>${esc(w.proof)}</small></div>`).join("")}</div>
        <a class="mail" href="mailto:${P.email}">${esc(P.email)} ${ICON.arrow}</a>
        <div class="ctas">${contacts(P).map(([n, h, icon, attrs], k) => `<a class="e-btn ${k === 0 ? "accent" : "ghost"}" href="${h}" ${attrs}>${icon}<span>${n === "CV" ? "Download CV" : n}</span></a>`).join("")}</div>
        <p class="where">${esc(S.contact.where)}</p>
      </div>
    </section>
  </main>`;
  reveal();

  /* toolkit tabs: click or arrow keys */
  const tabs = [...document.querySelectorAll(".tk-tabs [role=tab]")];
  const pick = (t) => {
    tabs.forEach((x) => { const on = x === t; x.setAttribute("aria-selected", String(on)); x.tabIndex = on ? 0 : -1; document.getElementById(x.getAttribute("aria-controls")).hidden = !on; });
  };
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => pick(t));
    t.addEventListener("keydown", (e) => {
      const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      if (d) { e.preventDefault(); const n = tabs[(i + d + tabs.length) % tabs.length]; pick(n); n.focus(); }
    });
  });
  /* tools with a story: show where they were used */
  document.querySelectorAll(".tk-panel").forEach((panel) => {
    const note = panel.querySelector(".tk-note span"), hint = note.textContent;
    panel.addEventListener("click", (e) => {
      const b = e.target.closest(".chip.used");
      if (!b) return;
      const open = b.getAttribute("aria-expanded") !== "true";
      panel.querySelectorAll(".chip.used").forEach((x) => x.setAttribute("aria-expanded", "false"));
      b.setAttribute("aria-expanded", String(open));
      note.textContent = open ? USED[b.textContent.trim()] : hint;
      note.parentElement.classList.toggle("on", open);
    });
  });

  /* header shows which section you're in */
  const navLinks = [...document.querySelectorAll(".e-nav nav a")];
  const secs = navLinks.map((l) => document.querySelector(l.getAttribute("href"))).filter(Boolean);
  const markNav = () => {
    const y = 90;   // just under the sticky header
    let cur = null;
    secs.forEach((sec) => { if (sec.getBoundingClientRect().top <= y + 40) cur = sec; });
    if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) cur = secs[secs.length - 1];   // reached the bottom
    navLinks.forEach((l) => { if (cur && l.getAttribute("href") === "#" + cur.id) l.setAttribute("aria-current", "true"); else l.removeAttribute("aria-current"); });
  };
  addEventListener("scroll", markNav, { passive: true }); addEventListener("resize", markNav); markNav();

  /* timeline line fills as you scroll; language bars fill when seen */
  const tl = document.querySelector(".tl");
  const items = [...document.querySelectorAll(".tl-i")];
  const onScroll = () => {
    if (!tl) return;
    const r = tl.getBoundingClientRect(), mid = innerHeight * .6;
    tl.style.setProperty("--p", Math.max(0, Math.min(1, (mid - r.top) / r.height)).toFixed(3));
    items.forEach((it) => it.classList.toggle("seen", it.getBoundingClientRect().top < mid + 40));
  };
  addEventListener("scroll", onScroll, { passive: true }); addEventListener("resize", onScroll); onScroll();
  const lang = document.querySelector(".tk-lang");
  if (lang && "IntersectionObserver" in window) new IntersectionObserver((es, o) => es.forEach((e) => { if (e.isIntersecting) { lang.classList.add("on"); o.disconnect(); } }), { threshold: .4 }).observe(lang);
  else lang?.classList.add("on");
})();
