/* Game layout: the portfolio as a quest. Every number comes from the CV; the game framing is only the wrapper. */
(() => {
  "use strict";
  const S = window.SITE, P = S.person, { esc, ext, ICON, contacts, reveal } = window.KIT;
  const app = document.getElementById("app");
  const roles = S.experience;                        // newest first
  const level = roles.length;                       // one level per role
  const LANG_PIPS = { Native: 4, Professional: 3, Advanced: 3, Beginner: 1 };

  app.innerHTML = `
  <header class="hud">
    <a class="avatar" href="#top" aria-label="Back to start"><span>${esc(P.short)}</span><i>LV ${level}</i></a>
    <div class="who"><b>${esc(P.name)}</b><small>Class: Learning Experience Designer</small></div>
    <div class="xp" aria-label="Experience: since December 2023"><span class="xp-l">XP</span><div class="xp-bar"><i></i></div><span class="xp-r">2+ yrs</span></div>
    <nav class="hud-nav" aria-label="Sections"><a href="#missions">Missions</a><a href="#quests">Quest log</a><a href="#badges">Badges</a></nav>
    <a class="gbtn accent sm" href="#hire">${ICON.play}<span>Hire me</span></a>
  </header>

  <main id="main">
    <section class="g-hero" id="top">
      <div class="g-card char" data-reveal>
        <div class="char-top"><span class="char-av">${esc(P.short)}</span><div><p class="gk">Player profile</p><h1>${esc(P.name)}</h1><p class="cls">Learning Experience Designer · Level ${level}</p></div></div>
        <dl class="attrs">
          <div><dt>${ICON.pin}Home base</dt><dd>${esc(P.location)}</dd></div>
          <div><dt>${ICON.globe}Languages</dt><dd>${S.languages.length} spoken</dd></div>
          <div><dt>${ICON.award}Badges</dt><dd>${S.certs.length} certifications</dd></div>
          <div><dt>${ICON.spark}Special move</dt><dd>Gamified, AI-powered learning</dd></div>
        </dl>
        <div class="char-btns">${contacts(P).map(([n, h, icon, attrs], k) => `<a class="gbtn ${k === 0 ? "accent" : "ghost"}" href="${h}" ${attrs}>${icon}<span>${n === "CV" ? "Download CV" : n}</span></a>`).join("")}</div>
      </div>
      <div class="story" data-reveal>
        <p class="gk">Backstory</p>
        ${S.about.map((p) => `<p>${p}</p>`).join("")}
        <div class="loot">
          <p class="gk">Best loot so far</p>
          <ul>${[["95%", "completion"], ["90%", "satisfaction"], ["4.8/5", "rating"], ["+25%", "motivation"]].map(([n, l]) => `<li><b>${n}</b><span>${l}</span></li>`).join("")}</ul>
        </div>
      </div>
    </section>

    <section class="g-sec" id="missions">
      <div class="g-head"><p class="gk">Chapter 1</p><h2>Missions completed</h2><p>Tap a card to flip it and see how the mission was won.</p></div>
      <div class="missions">${S.projects.map((p, i) => `<div class="mission" data-reveal>
        <button class="flip" type="button" aria-pressed="false" aria-label="Flip mission ${i + 1}: ${esc(p.title)}">
          <span class="face front">
            <span class="m-top"><span class="m-no">Mission ${String(i + 1).padStart(2, "0")}</span><span class="m-done">${ICON.check}Complete</span></span>
            <span class="m-title">${esc(p.title)}</span>
            <span class="m-client">${esc(p.client)}</span>
            <span class="reward"><small>Reward</small><b>${esc(p.stats[0][0])}</b><em>${esc(p.stats[0][1])}</em></span>
            <span class="m-more">${p.stats.slice(1).map(([b, s]) => `<span><b>${esc(b)}</b> ${esc(s)}</span>`).join("")}</span>
            <span class="m-hint">Flip ↻</span>
          </span>
          <span class="face back">
            <span class="m-no">How it was won</span>
            <span class="m-list">${p.built.slice(0, 4).map((b) => `<span>${ICON.check}<span>${esc(b)}</span></span>`).join("")}</span>
            <span class="m-gear">${p.stack.map((s) => `<i>${esc(s)}</i>`).join("")}</span>
          </span>
        </button>
      </div>`).join("")}</div>
    </section>

    <section class="g-sec" id="quests">
      <div class="g-head"><p class="gk">Chapter 2</p><h2>Quest log</h2><p>Every role is a level. Newest at the top.</p></div>
      <ol class="quests">${roles.map((e, i) => `<li class="${i === 0 ? "now" : ""}" data-reveal>
        <span class="lv"><small>LV</small>${level - i}</span>
        <div class="q-body">
          <p class="q-when">${esc(e.when)}${i === 0 ? '<span class="q-now">Current quest</span>' : ""}</p>
          <h3>${esc(e.role)}</h3><p class="q-org">${esc(e.org)}</p>
          <p class="q-text">${esc(e.text)}</p>
        </div>
      </li>`).join("")}</ol>
    </section>

    <section class="g-sec" id="badges">
      <div class="g-head"><p class="gk">Chapter 3</p><h2>Badges and skill tree</h2></div>
      <ul class="badges">${S.certs.map(([t, by]) => `<li data-reveal><span class="hex">${ICON.award}</span><b>${esc(t)}</b><small>${esc(by)}</small></li>`).join("")}</ul>
      <div class="tree">${S.toolkit.map((g) => `<div class="branch" data-reveal><h3>${esc(g.t)}</h3><div class="nodes">${g.items.map((x) => `<span>${esc(x)}</span>`).join("")}</div></div>`).join("")}</div>
      <div class="langs" data-reveal><h3>Languages unlocked</h3><ul>${S.languages.map(([l, lv]) => `<li><b>${esc(l)}</b><span class="pips" aria-label="${esc(lv)}">${[1, 2, 3, 4].map((k) => `<i class="${k <= (LANG_PIPS[lv] || 1) ? "on" : ""}"></i>`).join("")}</span><small>${esc(lv)}</small></li>`).join("")}</ul></div>
    </section>

    <section class="g-sec boss" id="hire">
      <div class="g-card quest" data-reveal>
        <p class="gk">Next quest</p>
        <h2>${esc(S.contact.title)}</h2>
        <p class="q-sub">${esc(S.contact.text)}</p>
        <p class="gk perks-k">Perks for your team</p>
        <ul class="perks">${S.why.map((w) => `<li>${ICON.star}<div><b>${esc(w.t)}</b><small>${esc(w.proof)}</small></div></li>`).join("")}</ul>
        <div class="char-btns">${contacts(P).map(([n, h, icon, attrs], k) => `<a class="gbtn ${k === 0 ? "accent big" : "ghost"}" href="${h}" ${attrs}>${icon}<span>${k === 0 ? "Accept quest: email me" : n === "CV" ? "Download CV" : n}</span></a>`).join("")}</div>
        <p class="where">${esc(S.contact.where)}</p>
      </div>
    </section>
  </main>`;

  /* flip mission cards */
  app.addEventListener("click", (e) => {
    const b = e.target.closest(".flip");
    if (!b) return;
    const on = b.getAttribute("aria-pressed") !== "true";
    b.setAttribute("aria-pressed", String(on));
  });
  /* fill the XP bar once */
  requestAnimationFrame(() => setTimeout(() => app.querySelector(".xp-bar i").classList.add("go"), 300));
  reveal();
})();
