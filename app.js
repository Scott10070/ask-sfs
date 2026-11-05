/* Ask SFS — student app (iPhone web app). Vanilla JS, no build step.
   Answers come from the official SFS/Bursar facts in data.js (no private data, no network calls). */
(function () {
"use strict";

// ---------- icons (SF Symbols–style line icons) ----------
const I = {
  home:'<path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/>',
  ask:'<path d="M20 12a8 8 0 0 1-11.7 7.1L4 20l1-4.1A8 8 0 1 1 20 12Z"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5M12 16h.01"/>',
  money:'<rect x="2.5" y="6" width="19" height="12" rx="2.5"/><circle cx="12" cy="12" r="2.6"/><path d="M6 9.5v5M18 9.5v5"/>',
  tasks:'<path d="M9 6.5h11M9 12h11M9 17.5h11"/><path d="m3.5 6.5 1.3 1.3L7 5.5M3.5 12l1.3 1.3L7 11M3.5 17.5l1.3 1.3L7 16.5"/>',
  chevR:'<path d="m1 1 6 6-6 6" stroke-width="2.2"/>',
  back:'<path d="M15 4 7 12l8 8"/>',
  phone:'<path d="M5 3.5h3.5l2 5-2.5 1.5a11 11 0 0 0 6 6l1.5-2.5 5 2V19a2 2 0 0 1-2 2A17.5 17.5 0 0 1 3 5.5a2 2 0 0 1 2-2Z"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 6.5 8.5 6.5 8.5-6.5"/>',
  person:'<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5M9 13h6M9 17h4"/>',
  lock:'<rect x="5" y="10.5" width="14" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>',
  refund:'<path d="M4 12a8 8 0 1 0 2.3-5.6"/><path d="M4 4v4.5h4.5"/><path d="M12 8v8M9.5 10.2c0-1 1.1-1.7 2.5-1.7s2.5.7 2.5 1.7-1.1 1.4-2.5 1.8-2.5.8-2.5 1.8 1.1 1.7 2.5 1.7 2.5-.7 2.5-1.7"/>',
  chart:'<path d="M4 20V4M4 20h16"/><path d="m7.5 15 3.5-4.5 3 2.5 5-6.5"/>',
  bank:'<path d="M3 9.5 12 4l9 5.5M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20.5h18"/>',
  bill:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
  up:'<path d="M12 19V5M5.5 11.5 12 5l6.5 6.5"/>',
  x:'<path d="M6 6l12 12M18 6 6 18"/>',
  check:'<path d="m5 12.5 4.5 4.5L19 7.5" stroke-width="2.6"/>',
  sparkle:'<path d="M12 3.5 13.8 9l5.7 1.8-5.7 1.9L12 18.5l-1.8-5.8L4.5 10.8 10.2 9z"/><path d="M19 3v3M17.5 4.5h3"/>',
  search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/>',
  tray:'<path d="M3 13.5 5.5 5h13l2.5 8.5V19a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19z"/><path d="M3 13.5h5.5l1.2 2.5h4.6l1.2-2.5H21"/>',
  alert:'<path d="M12 3 2.5 20h19z"/><path d="M12 10v4.5M12 17.5h.01"/>',
  phoneApp:'<rect x="6.5" y="2.5" width="11" height="19" rx="2.5"/><path d="M10.5 18.5h3"/>',
  route:'<path d="M5 12h12M13 7l5 5-5 5"/>',
  send:'<path d="M21 3 10 14M21 3l-6.5 18-3.5-7-7-3.5z"/>',
  done:'<circle cx="12" cy="12" r="9"/><path d="m8 12.5 3 3 5-6"/>',
  book:'<path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z"/><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>',
  signout:'<path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l-4-4 4-4M6 12h10"/>',
  shield:'<path d="M12 3 4.5 6v6c0 4.5 3.2 7.8 7.5 9 4.3-1.2 7.5-4.5 7.5-9V6z"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  logo:'<path d="M12 3.5v17M16 7.5c0-1.7-1.8-3-4-3s-4 1.3-4 3 1.8 2.6 4 3.2 4 1.6 4 3.3-1.8 3-4 3-4-1.3-4-3"/>',
};
const ic = (n, extra = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${extra}>${I[n]}</svg>`;
const chev = `<svg class="chev" viewBox="0 0 8 14" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I.chevR}</svg>`;
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const $ = s => document.querySelector(s);
const money = n => (n < 0 ? "−" : "") + "$" + Math.abs(Math.round(n)).toLocaleString("en-US");
const SENSITIVE = /\b916\d{6}\b|\b\d{3}-\d{2}-\d{4}\b|\b\d{9}\b|\b\d{12,19}\b/;
const today = () => { const d = new Date(); d.setHours(0,0,0,0); return d; };
const daysUntil = s => Math.round((new Date(s + "T00:00:00") - today()) / 864e5);
const fmtShort = s => new Date(s + "T00:00:00").toLocaleDateString("en-US", {month:"short", day:"numeric"});
const ago = ms => { const m = Math.round((Date.now() - ms) / 6e4); if (m < 1) return "now"; if (m < 60) return m + "m"; const h = Math.round(m / 60); if (h < 24) return h + "h"; return Math.round(h / 24) + "d"; };
function toast(msg){ const t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, 2800); }

// ---------- topic helpers ----------
const TILE = {late:["clock","#FF9500"], bill:["bill","#A41E35"], refund:["refund","#34C759"], hold:["lock","#FF3B30"], verif:["doc","#007AFF"], sap:["chart","#5856D6"], loans:["bank","#30B0C7"], other:["phone","#8E8E93"], offer:["sparkle","#FF2D55"], fafsa:["doc","#5AC8FA"]};
const classify = t => { for (const [k, re] of Object.entries(TOPIC_KEYS)) if (re.test(t)) return k; return "other"; };
function retrieve(text){ const w = (text.toLowerCase().match(/[a-z]+/g) || []);
  return KB.map(e => ({e, s: w.reduce((a, x) => a + (x.length > 2 && e.keys.includes(x) ? 2 : 0) + (x.length > 4 && e.text.toLowerCase().includes(x) ? .3 : 0), 0)})).sort((a, b) => b.s - a.s); }
function answerFor(q){
  const t = classify(q), c = CARDS[t];
  const personal = /\bmy (exact|aid amount|account)|how much (do i|will i) get|why (do|does) (i|my)|is my .* (processed|approved)/i.test(q);
  if (c) return {topic:t, text:c.brief, steps:c.steps, src:c.src, office:TOPICS[t].office, human:personal || t === "other"};
  const h = retrieve(q)[0]; const e = h && h.s > 0 ? h.e : KB[0];
  return {topic:t, text:e.text.split(". ").slice(0, 2).join(". ") + ".", steps:[], src:e.src, office:e.office, human:true};
}
const CONTACT = {Bursar:["Bursar's Office","215-204-7269"], Both:["SFS","215-204-2244"], SFS:["SFS","215-204-2244"]};

// ---------- storage ----------
const KEY = "asksfs-final-v1";
let S = {stu:null, staff:false, todo:{}, cases:null, stats:{asked:0, solved:0, handoffs:0}};
try { const r = localStorage.getItem(KEY); if (r) S = Object.assign(S, JSON.parse(r)); } catch {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {} };
function flagsFor(t){ const f = [];
  if (/\b(my (son|daughter|child)|i'?m the (mother|father|parent)|parent of)\b/i.test(t)) f.push("Parent is asking. Check the student's FERPA waiver before sharing anything.");
  if (/email (you )?(my|the)|attach/i.test(t) && /tax|return|document/i.test(t)) f.push("Wants to email tax documents. Point them to the SFS dashboard instead.");
  if (/follow(ing)? up|called \d|couldn'?t get through|weeks? ago/i.test(t)) f.push("Repeat contact. This student has already tried to reach SFS.");
  return f; }
function summarize(c){ const first = c.body.split(/(?<=[.?!])\s/)[0]; return `${TOPICS[c.topic].label}. ${first.length > 140 ? first.slice(0, 137) + "…" : first}`; }
function seed(){ const now = Date.now();
  S.cases = SAMPLE_EMAILS.map((m, i) => { const t = m.subj + " " + m.body; const c = {id:"e" + i, kind:"email", from:m.from, subj:m.subj, body:m.body, at:now - m.h * 36e5,
    topic:classify(t), urgency: URGENT.test(t) ? "high" : (/fee|missing|still|hasn'?t/i.test(t) ? "med" : "low"), flags:flagsFor(t), status:"new", draft:"", read:i > 3};
    c.summary = summarize(c); return c; }); }
if (!Array.isArray(S.cases)) seed();

// ==========================================================================================
// STUDENT APP (iPhone)
// ==========================================================================================
const app = $("#app");
let st = {tab:"home", stack:[], sheet:null, chat:[], edit:false};
const P = () => PERSONAS.find(p => p.id === S.stu) || PERSONAS[0];
let cur = null;
function loadPersona(){ cur = JSON.parse(JSON.stringify(P())); }

function calc(){ const bill = cur.bill.reduce((a, r) => a + r[1], 0), early = cur.aid.filter(r => r[1] === "early").reduce((a, r) => a + r[2], 0),
  late = cur.aid.filter(r => r[1] === "late").reduce((a, r) => a + r[2], 0); return {bill, early, late, short:Math.max(0, bill - early), gap:bill - early - late}; }
function openTasks(){ const d = S.todo[S.stu] || {}; return P().todo.filter(k => !d[k]).map(k => [k, TODO[k]]).sort((a, b) => (a[1].date || "0") < (b[1].date || "0") ? -1 : 1); }

function render(){
  if (!S.stu) return renderWelcome();
  const top = st.stack[st.stack.length - 1];
  let html = "";
  if (top) html = pageTopic(top);
  else html = ({home:pageHome, ask:pageAsk, money:pageMoney, tasks:pageTasks})[st.tab]();
  html += tabbar();
  if (st.tab === "ask" && !top) html += composer();
  if (st.sheet) html += sheet();
  app.innerHTML = html;
  const pg = app.querySelector(".page");
  if (pg) { pg.addEventListener("scroll", () => pg.querySelector(".navbar")?.classList.toggle("scrolled", pg.scrollTop > 40), {passive:true});
    if (st.tab === "ask" && !top) pg.scrollTop = pg.scrollHeight; }
  bindStudent();
}

function navbar(title, {back, right = "", always = false} = {}){
  return `<div class="navbar${always ? " always" : ""}"><div class="nav-left">${back ? `<button class="nav-btn" data-act="back" aria-label="Back to ${esc(back)}">${ic("back")}<span>${esc(back)}</span></button>` : ""}</div>
    <div class="nav-title">${esc(title)}</div><div class="nav-right">${right}</div></div>`;
}
function largeTitle(t, eyebrow){ return `<div class="large-title">${eyebrow ? `<div class="eyebrow">${esc(eyebrow)}</div>` : ""}<h1>${esc(t)}</h1></div>`; }
function tile(topic){ const [i, c] = TILE[topic] || TILE.other; return `<span class="tile" style="background:${c}">${ic(i)}</span>`; }
function tabbar(){
  const n = openTasks().length;
  const t = (id, label, icon) => `<button class="tab" data-tab="${id}" ${st.tab === id && !st.stack.length ? 'aria-current="page"' : ""}>${ic(icon)}<span>${label}</span>${id === "tasks" && n ? `<span class="count">${n}</span>` : ""}</button>`;
  return `<nav class="tabbar" aria-label="Tabs">${t("home","Home","home")}${t("ask","Ask","ask")}${t("money","Money","money")}${t("tasks","Tasks","tasks")}</nav>`;
}

// ---- Welcome / sign-in
function renderWelcome(){
  app.innerHTML = `<div class="welcome">
    <div class="app-icon">${ic("logo")}</div>
    <h1>Ask SFS</h1>
    <p class="lede">Straight answers about aid, bills and refunds at Temple.</p>
    <div class="feat">
      <div>${ic("ask")}<p style="margin:0"><b>Ask anything, anytime</b><span>Plain answers from official SFS policy, with the source.</span></p></div>
      <div>${ic("money")}<p style="margin:0"><b>Know what you'll pay</b><span>See your bill, your aid and what arrives after the due date.</span></p></div>
      <div>${ic("person")}<p style="margin:0"><b>One visit, not five</b><span>Still need SFS? We prep your case so it gets solved fast.</span></p></div>
    </div>
    <div style="display:grid;gap:10px;margin-top:28px">
      <button class="btn" data-act="choose">${ic("shield")}Sign in with Temple SSO</button>
      <p class="fine">Demo prototype. Sign-in picks a sample student. No real login, password or student data is used.</p>
    </div></div>${st.sheet === "accounts" ? sheet() : ""}`;
  app.querySelector('[data-act="choose"]').onclick = () => { st.sheet = "accounts"; renderWelcome(); };
  bindSheet();
}

// ---- Home
function pageHome(){
  const p = P(), c = calc(), tasks = openTasks().slice(0, 2);
  const hour = new Date().getHours(), greet = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  const date = new Date().toLocaleDateString("en-US", {weekday:"long", month:"long", day:"numeric"});
  const tot = Math.max(c.bill, c.early + c.late) || 1;
  const owe = c.gap > 0;
  return `<div class="page">${navbar("Home", {right:`<button class="nav-btn glass" data-act="profile" aria-label="Account"><span class="avatar sm">${p.init}</span></button>`})}
    ${largeTitle(`${greet}, ${p.name}`, date)}
    <div class="hero">
      <div class="k"><span>Spring 2027</span><span class="status-pill ${owe ? "sp-warn" : "sp-ok"}">${owe ? "Payment needed" : "Fully covered"}</span></div>
      <div><div class="hero-label">${owe ? "Estimated balance after aid" : "Estimated refund"}</div><div class="big">${owe ? money(c.gap) : money(-c.gap)}</div><div class="sub">${owe ? `Due Jan 21 · Your aid covers ${money(c.early + c.late)} of ${money(c.bill)}.` : `Your aid covers the full bill. The remaining amount comes back to you.`}</div></div>
      <div class="meter" aria-hidden="true"><i style="width:${Math.min(c.early, c.bill) / tot * 100}%;background:var(--green)"></i><i style="width:${Math.min(c.late, Math.max(0, c.bill - c.early)) / tot * 100}%;background:var(--orange)"></i></div>
      ${c.short > 0 && c.late > 0 ? `<div class="sub">${money(Math.min(c.late, c.short))} of your aid won't count until after add/drop. That's normal and won't cause a hold.</div>` : ""}
      <div class="h-actions"><button class="pill-btn solid" data-tab="money">See breakdown</button><button class="pill-btn" data-act="help">Talk to SFS</button></div>
    </div>
    ${tasks.length ? `<div class="section"><div class="section-h"><h2>Up next</h2><button data-tab="tasks">See all</button></div><div class="group">
      ${tasks.map(([k, t]) => `<button class="row" data-tab="tasks">${dueTile(t)}<span class="main"><b>${esc(t.t)}</b><span>${dueText(t)}</span></span>${chev}</button>`).join("")}</div></div>` : ""}
    <div class="section"><div class="section-h"><h2>Get a quick answer</h2><button data-act="more">${st.moreTopics ? "Show less" : "See all"}</button></div><div class="group">
      ${(st.moreTopics ? ["late","bill","refund","hold","verif","sap","loans"] : ["late","bill","refund"]).map(k => `<button class="row" data-topic="${k}">${tile(k)}<span class="main"><b>${esc(CARDS[k].title)}</b></span>${chev}</button>`).join("")}
    </div></div>
    <div class="section support-card">
      <div><span class="eyebrow">Need more help?</span><h2>Talk to the right person</h2><p>We’ll organize your question and tell you whether to contact SFS or the Bursar.</p></div>
      <button class="pill-btn solid" data-act="help">Prep my case</button>
    </div>
  </div>`;
}
function relDays(s){ const d = daysUntil(s); return d < 0 ? "passed" : d === 0 ? "today" : d === 1 ? "tomorrow" : `in ${d} days`; }
function dueText(t){ if (!t.date) return "Do this now"; const d = daysUntil(t.date); return d < 0 ? "Past due" : d === 0 ? "Due today" : `In ${d} day${d === 1 ? "" : "s"} · ${fmtShort(t.date)}`; }
function dueTile(t){ const d = t.date ? daysUntil(t.date) : 0; const col = !t.date ? "#A41E35" : d <= 30 ? "#FF3B30" : d <= 90 ? "#FF9500" : "#34C759"; return `<span class="tile" style="background:${col}">${ic(t.date ? "clock" : "tasks")}</span>`; }

// ---- Topic detail (pushed)
function pageTopic(k){
  const c = CARDS[k], T = TOPICS[k], [who, num] = CONTACT[T.office];
  const backLabel = {home:"Home", ask:"Ask", money:"Money", tasks:"Tasks"}[st.tab];
  return `<div class="page pushed">${navbar(c.title, {back:backLabel})}
    <div class="large-title" style="display:flex;gap:12px;align-items:center;padding-top:6px">${tile(k).replace('class="tile"','class="tile" style="width:44px;height:44px;border-radius:12px;background:' + (TILE[k]||TILE.other)[1] + '"')}<h1 style="font-size:28px;line-height:34px">${esc(c.title)}</h1></div>
    <div class="section"><div class="card"><p class="callout" style="margin:0;font-size:17px;line-height:23px">${esc(c.brief)}</p></div></div>
    <div class="section"><div class="section-h"><h2>What to do</h2></div><div class="group plain">
      ${c.steps.map((s, i) => `<div class="row"><span class="tile" style="background:var(--cherry-tint);color:var(--cherry);font-weight:700;font-size:15px">${i + 1}</span><span class="main"><b style="font-size:16px">${esc(s)}</b></span></div>`).join("")}
    </div></div>
    <div class="section"><div class="group">
      <a class="row" href="${SRC[c.src].u}" target="_blank" rel="noopener"><span class="tile" style="background:#8E8E93">${ic("book")}</span><span class="main"><b>Official policy</b><span>${esc(SRC[c.src].t)}</span></span>${chev}</a>
      <a class="row" href="tel:+1${num.replace(/-/g, "")}">${tile("other")}<span class="main"><b>Call ${esc(who)}</b><span>${num}</span></span>${chev}</a>
    </div></div>
    <div class="section" style="display:grid;gap:10px"><button class="btn" data-act="help" data-topic-help="${k}">Still stuck? Get help from SFS</button><button class="btn plain" data-act="askabout" data-q="${esc(c.title)}">Ask a follow-up question</button></div>
  </div>`;
}

// ---- Ask
function pageAsk(){
  const empty = !st.chat.length;
  const sug = ["My grant hasn't shown up and my bill is due","When do I get my refund?","Why do I have a hold?","Who do I ask, SFS or the Bursar?"];
  return `<div class="page">${navbar("Ask SFS", {always:!empty, right: empty ? "" : `<button class="nav-btn" data-act="clear">Clear</button>`})}
    ${empty ? `${largeTitle("Ask")}
      <div class="empty-ask"><div class="glyph">${ic("ask")}</div><p class="title3">What's going on?</p><p class="subhead" style="margin:0">Ask in your own words. Answers come from official SFS policy.</p></div>
      <div class="suggest">${sug.map(q => `<button data-q="${esc(q)}">${esc(q)}${ic("up", 'style="transform:rotate(45deg)"')}</button>`).join("")}</div>
      <p class="section-foot" style="text-align:center;padding-top:14px">Never type your TUid, SSN or bank numbers.</p>`
    : `<div class="chat" style="padding-top:12px">${st.chat.map(m => m.me ? `<div class="bub me">${esc(m.text)}</div>` : botBubble(m)).join("")}</div><div style="height:70px"></div>`}
  </div>`;
}
function botBubble(m){
  if (m.typing) return `<div class="bub bot typing" aria-label="Typing"><span class="dots"><i></i><i></i><i></i></span></div>`;
  if (m.blocked) return `<div class="bub bot"><span style="color:var(--red);font-size:15px">That looks like an ID, SSN or account number, so it wasn't sent. Please remove it.</span></div>`;
  const a = m.a, [who, num] = CONTACT[a.office];
  const parts = a.text.split(/(?<=\.)\s/); const lead = parts.shift(), rest = parts.join(" ");
  return `<div class="bub bot"><span><span class="lead">${esc(lead)}</span>${rest ? " " + esc(rest) : ""}</span>
    ${a.steps.length ? `<ol>${a.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>` : ""}
    <div class="meta-row"><span class="badge b-gray">${esc(who)} · ${num}</span><a href="${SRC[a.src].u}" target="_blank" rel="noopener" style="font-size:13px">${esc(SRC[a.src].t)}</a></div>
    ${a.human ? `<button class="btn secondary" style="padding:11px;font-size:15px" data-act="help" data-topic-help="${a.topic}" data-text="${esc(m.q)}">This needs a person. Prep my case</button>` : `<button class="btn plain" style="padding:4px 0;font-size:15px;justify-content:flex-start" data-topic="${a.topic}">More on ${esc(CARDS[a.topic]?.title || "this")}</button>`}
  </div>`;
}
function composer(){ return `<div class="composer"><div class="field"><textarea id="askInput" rows="1" placeholder="Ask about aid, bills, refunds…" aria-label="Your question"></textarea>
  <button class="send" id="sendBtn" aria-label="Send" disabled>${ic("up")}</button></div></div>`; }
function ask(q){
  q = q.trim(); if (!q) return;
  st.chat.push({me:true, text:q});
  if (SENSITIVE.test(q)) { st.chat.push({blocked:true}); render(); return; }
  st.chat.push({typing:true}); render();
  S.stats.asked++; save();
  setTimeout(() => { st.chat.pop(); const a = answerFor(q); if (!a.human) { S.stats.solved++; save(); } st.chat.push({a, q}); render(); }, 650);
}

// ---- Money
function pageMoney(){
  const c = calc(), tot = Math.max(c.bill, c.early + c.late) || 1;
  const ed = st.edit;
  const amt = (v, id) => ed ? `<input class="amount-input" inputmode="numeric" data-amt="${id}" value="${v}" aria-label="Amount">` : `<span class="amount">${money(v)}</span>`;
  return `<div class="page">${navbar("Money", {right:`<button class="nav-btn" data-act="edit">${ed ? "Done" : "Edit"}</button>`})}
    ${largeTitle("Money", "Spring 2027")}
    <div class="section" style="margin-top:6px"><div class="group">
      <div class="stats"><div class="stat"><span class="caption">Bill</span><b>${money(c.bill)}</b></div>
        <div class="stat ${c.short > 0 ? "warn" : ""}"><span class="caption">Short Jan 21</span><b>${money(c.short)}</b></div>
        <div class="stat"><span class="caption">${c.gap > 0 ? "You pay" : "Refund"}</span><b>${money(Math.abs(c.gap))}</b></div></div>
      <div class="bar" role="img" aria-label="${money(c.early)} aid by Jan 21, ${money(c.late)} after add/drop, ${money(Math.max(0, c.gap))} you pay"><i style="width:${Math.min(c.early, c.bill) / tot * 100}%;background:var(--green)"></i><i style="width:${Math.min(c.late, Math.max(0, c.bill - c.early)) / tot * 100}%;background:var(--orange)"></i><i style="width:${Math.max(0, c.gap) / tot * 100}%;background:var(--cherry)"></i></div>
      <div class="legend"><span style="--c:var(--green)">Aid by Jan 21</span><span style="--c:var(--orange)">After add/drop</span><span style="--c:var(--cherry)">You pay</span></div>
    </div>
    ${c.short > 0 && c.late > 0 ? `<p class="section-foot">Unpaid on Jan 21 moves to a payment plan automatically ($50 fee). Pay by Mar 4 to avoid a $200 fee and a hold.</p>` : ""}</div>
    <div class="section"><div class="section-h"><h2>Charges</h2></div><div class="group plain">
      ${cur.bill.map((r, i) => `<div class="row"><span class="main"><b>${esc(r[0])}</b></span><span class="trail">${amt(r[1], "b" + i)}</span></div>`).join("")}
    </div></div>
    <div class="section"><div class="section-h"><h2>Aid</h2></div><div class="group plain">
      ${cur.aid.map((r, i) => `<div class="row"><span class="main"><b>${esc(r[0])}</b><span><span class="badge ${r[1] === "early" ? "b-green" : "b-orange"}">${r[1] === "early" ? "By Jan 13" : "After add/drop"}</span></span></span><span class="trail">${amt(r[2], "a" + i)}</span></div>`).join("")}
    </div><p class="section-foot">${ed ? "Type the numbers from your own aid offer. Nothing leaves your phone." : "Sample aid offer. Tap Edit to use your own numbers."}</p></div>
    <div class="section timeline"><div class="section-h"><h2>When money moves</h2></div><div class="group plain">
      ${[["Jan 6","Pell, SEOG and Temple Grants post","var(--green)"],["Jan 13","Full-time Direct Loans post","var(--green)"],["Jan 21","Spring bill due","var(--cherry)"],["After add/drop","PA State Grant, Promise, part-time loans","var(--orange)"],["Mar 4","Final due date · $200 fee + hold after","var(--red)"]]
        .map(([d, t, col]) => `<div class="row"><span class="dot" style="background:${col}"></span><span class="main"><b style="font-size:16px">${t}</b></span><span class="trail" style="font-size:15px">${d}</span></div>`).join("")}
    </div></div>
  </div>`;
}

// ---- Tasks
function pageTasks(){
  const done = S.todo[S.stu] || {};
  const all = P().todo.map(k => [k, TODO[k]]).sort((a, b) => (a[1].date || "0") < (b[1].date || "0") ? -1 : 1);
  const open = all.filter(([k]) => !done[k]), fin = all.filter(([k]) => done[k]);
  const soon = open.filter(([, t]) => !t.date || daysUntil(t.date) <= 30), later = open.filter(([, t]) => t.date && daysUntil(t.date) > 30);
  const row = ([k, t]) => { const on = !!done[k]; const d = t.date ? daysUntil(t.date) : null;
    const b = on ? "" : !t.date ? `<span class="badge b-cherry">Now</span>` : d < 0 ? `<span class="badge b-gray">Passed</span>` : `<span class="badge ${d <= 7 ? "b-red" : d <= 30 ? "b-orange" : "b-gray"}">${fmtShort(t.date)}</span>`;
    return `<div class="row ${on ? "task-done" : ""}" style="align-items:flex-start"><button class="check ${on ? "on" : ""}" data-task="${k}" aria-pressed="${on}" aria-label="Mark ${esc(t.t)} ${on ? "not done" : "done"}">${on ? ic("check") : ""}</button>
      <span class="main"><b>${esc(t.t)}</b><span>${esc(t.why)}</span>${t.date && !on ? `<span class="caption">${relDays(t.date)[0].toUpperCase() + relDays(t.date).slice(1)} · ${fmtShort(t.date)}</span>` : ""}</span>${b}</div>`; };
  const grp = (title, list) => list.length ? `<div class="section"><div class="section-h"><h2>${title}</h2><span class="caption">${list.length}</span></div><div class="group plain">${list.map(row).join("")}</div></div>` : "";
  return `<div class="page">${navbar("Tasks")}${largeTitle("Tasks", open.length ? `${open.length} to do` : "All done")}
    ${open.length ? "" : `<div class="section"><div class="card" style="text-align:center;justify-items:center">${ic("done", 'style="width:40px;height:40px;color:var(--green)"')}<p class="title3">You're all caught up</p></div></div>`}
    ${grp("Do soon", soon)}${grp("Later", later)}
    ${fin.length ? `<div class="section" style="margin-top:8px"><button class="toggle-row" data-act="showdone">${st.showDone ? "Hide" : "Show"} completed (${fin.length})</button></div>${st.showDone ? grp("Completed", fin) : ""}` : ""}
    <p class="section-foot" style="padding-top:14px">Missing these is what causes holds, late fees and lost aid.</p>
  </div>`;
}

// ---- Sheets
function sheet(){
  if (st.sheet === "accounts") return `<div class="scrim" data-act="close"></div><div class="sheet" role="dialog" aria-label="Choose an account"><div class="grab"></div>
    <div class="sheet-head"><span></span><h3>Choose a demo student</h3><div style="justify-self:end"><button class="nav-btn" data-act="close">Cancel</button></div></div>
    <div class="sheet-body"><div class="section" style="margin-top:6px"><div class="group">
      ${PERSONAS.map(p => `<button class="row" data-signin="${p.id}"><span class="avatar">${p.init}</span><span class="main"><b>${p.name}</b><span>${esc(p.desc.split(" · ").slice(0, 3).join(" · "))}</span></span>${chev}</button>`).join("")}
    </div><p class="section-foot">In the real app this is Temple's single sign-on.</p></div></div></div>`;
  if (st.sheet === "profile") { const p = P(); return `<div class="scrim" data-act="close"></div><div class="sheet" role="dialog" aria-label="Account"><div class="grab"></div>
    <div class="sheet-head"><span></span><h3>Account</h3><div style="justify-self:end"><button class="nav-btn" data-act="close" style="font-weight:600">Done</button></div></div>
    <div class="sheet-body"><div class="section" style="margin-top:6px"><div class="group"><div class="row"><span class="avatar">${p.init}</span><span class="main"><b>${p.name}</b><span>${esc(p.desc)}</span></span></div></div></div>
    <div class="section"><div class="group"><button class="row" data-act="signout" style="color:var(--red)"><span class="main"><b>Sign out</b></span></button></div></div></div></div>`; }
  // help sheet
  const h = st.sheet;
  return `<div class="scrim" data-act="close"></div><div class="sheet" role="dialog" aria-label="Get help from SFS"><div class="grab"></div>
    <div class="sheet-head"><div><button class="nav-btn" data-act="close">Cancel</button></div><h3>Get help from SFS</h3><span></span></div>
    <div class="sheet-body">
    ${h.result ? helpResult(h) : `
      <div class="section" style="margin-top:4px"><div class="group field-group">
        <div class="row"><span class="main"><b>Topic</b></span><select id="hTopic" aria-label="Topic">${Object.entries(TOPICS).map(([k, t]) => `<option value="${k}" ${k === h.topic ? "selected" : ""}>${esc(t.label)}</option>`).join("")}</select></div>
        <div style="border-top:.5px solid var(--sep)"><textarea id="hText" placeholder="What's going on? One or two sentences is enough." aria-label="What's going on">${esc(h.text || "")}</textarea></div>
      </div><p class="section-foot">We'll check if you can fix it now. If not, we'll get you ready so one visit solves it.</p></div>
      <div class="section"><button class="btn" data-act="check">Check my situation</button></div>`}
    </div></div>`;
}
function helpResult(h){
  const T = TOPICS[h.topic], self = h.result.self, [who, num] = CONTACT[T.office];
  if (h.sent) return `<div class="section" style="margin-top:20px"><div class="card" style="justify-items:center;text-align:center;padding:28px 20px">
      <div class="app-icon" style="width:64px;height:64px;border-radius:50%;background:var(--green);box-shadow:none;margin:0">${ic("check")}</div>
      <p class="title3">Sent to SFS</p><p class="subhead" style="margin:0">A counselor sees your case with everything already filled in. You'll get a reply by email. (Demo: open Staff · Desktop to see it arrive.)</p></div></div>
    <div class="section"><button class="btn secondary" data-act="close">Done</button></div>`;
  return `<div class="section" style="margin-top:4px"><div class="banner ${self ? "ok" : "info"}">${ic(self ? "done" : "person")}<div><b style="display:block;font-size:16px">${self ? "You can probably fix this now" : "This needs SFS"}</b><span class="subhead">${esc((CARDS[h.topic] || CARDS.other).brief)}</span></div></div></div>
    <div class="section"><div class="section-h"><h2>Have ready</h2></div><div class="group plain">${T.bring.slice(0, 3).map(b => `<div class="row">${ic("done", 'style="width:22px;height:22px;color:var(--green);flex:none"')}<span class="main"><b style="font-size:16px">${esc(b)}</b></span></div>`).join("")}</div></div>
    <div class="section"><div class="group"><div class="row"><span class="main"><b>Best way to reach them</b><span>${esc(who)} · ${esc(T.appt)}</span></span></div></div></div>
    <div class="section" style="display:grid;gap:10px">${self ? `<button class="btn" data-act="close">Got it</button><button class="btn plain" data-act="send">Send to SFS anyway</button>` : `<button class="btn" data-act="send">${ic("send")}Send my case to SFS</button><button class="btn plain" data-act="call">Call ${num} instead</button>`}</div>`;
}

// ---- events
function bindStudent(){
  app.querySelectorAll("[data-tab]").forEach(b => b.onclick = () => { st.tab = b.dataset.tab; st.stack = []; st.edit = false; render(); });
  app.querySelectorAll("[data-topic]").forEach(b => b.onclick = () => { st.stack.push(b.dataset.topic); render(); });
  app.querySelectorAll(".suggest [data-q]").forEach(b => b.onclick = () => ask(b.dataset.q));
  app.querySelectorAll("[data-task]").forEach(b => b.onclick = () => { const m = (S.todo[S.stu] ||= {}); m[b.dataset.task] = !m[b.dataset.task]; save(); render(); });
  app.querySelectorAll("[data-amt]").forEach(inp => inp.onchange = () => { const id = inp.dataset.amt, v = Math.max(0, +inp.value.replace(/[^\d.]/g, "") || 0);
    if (id[0] === "b") cur.bill[+id.slice(1)][1] = v; else cur.aid[+id.slice(1)][2] = v; render(); });
  app.querySelectorAll("[data-act]").forEach(b => b.onclick = e => act(b.dataset.act, b, e));
  const inp = $("#askInput"), send = $("#sendBtn");
  if (inp) { inp.oninput = () => { send.disabled = !inp.value.trim(); inp.style.height = "40px"; inp.style.height = Math.min(110, inp.scrollHeight) + "px"; };
    inp.onkeydown = e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); ask(inp.value); } };
    send.onclick = () => ask(inp.value); }
  bindSheet();
}
function bindSheet(){
  app.querySelectorAll("[data-signin]").forEach(b => b.onclick = () => { S.stu = b.dataset.signin; save(); loadPersona(); st = {tab:"home", stack:[], sheet:null, chat:[], edit:false}; render(); });
  app.querySelectorAll(".scrim, .sheet [data-act='close']").forEach(b => b.onclick = () => { st.sheet = null; S.stu ? render() : renderWelcome(); });
}
function act(a, b){
  if (a === "back") { st.stack.pop(); render(); }
  else if (a === "help") { st.sheet = {topic:b.dataset.topicHelp || (st.stack[st.stack.length - 1]) || "late", text:b.dataset.text || ""}; render(); }
  else if (a === "askabout") { st.stack = []; st.tab = "ask"; render(); const i = $("#askInput"); i.value = b.dataset.q + ": "; i.focus(); $("#sendBtn").disabled = false; }
  else if (a === "clear") { st.chat = []; render(); }
  else if (a === "showdone") { st.showDone = !st.showDone; render(); }
  else if (a === "more") { st.moreTopics = !st.moreTopics; render(); }
  else if (a === "edit") { st.edit = !st.edit; render(); }
  else if (a === "profile") { st.sheet = "profile"; render(); }
  else if (a === "signout") { S.stu = null; save(); st = {tab:"home", stack:[], sheet:null, chat:[], edit:false}; render(); }
  else if (a === "check") { const topic = $("#hTopic").value, text = $("#hText").value.trim();
    if (!text) { $("#hText").focus(); return; }
    if (SENSITIVE.test(text)) { toast("Please remove ID, SSN or account numbers."); return; }
    const personal = /\bmy\b.*\b(account|bill|grant|loan|refund|hold|aid)\b/i.test(text) || /hasn'?t|still|missing|wrong|didn'?t/i.test(text);
    st.sheet = {topic, text, result:{self: !personal && ["refund","verif","loans"].includes(topic)}}; render(); }
  else if (a === "send") { const h = st.sheet, p = P(), T = TOPICS[h.topic];
    S.cases.unshift({id:"s" + Date.now(), kind:"student", from:p.name, subj:`${h.text.slice(0, 60)}${h.text.length > 60 ? "…" : ""}`,
      body:`${h.text}\n\n— Sent from the Ask SFS app\nStudent profile: ${p.desc}\nHas ready: ${T.bring.slice(0, 3).join("; ")}`,
      at:Date.now(), topic:h.topic, urgency: URGENT.test(h.text) ? "high" : "med", flags:["Prepped in the app: the student already has the documents ready."], status:"new", draft:"", read:false,
      summary:`${T.label}. ${h.text.slice(0, 140)}`});
    S.stats.handoffs++; save(); h.sent = true; render(); }
  else if (a === "call") toast("Calling SFS at 215-204-2244 (demo)");
}

// ==========================================================================================
// BOOT
// ==========================================================================================
if (S.stu) loadPersona(); else cur = JSON.parse(JSON.stringify(PERSONAS[0]));
render();
if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}
})();
