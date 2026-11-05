/* Ask SFS — staff desktop app. Vanilla JS, no build step.
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
// STAFF APP (desktop)
// ==========================================================================================
const desk = $("#desk");
let sd = {view:"inbox", box:"all", sel:null, q:"", denied:false, policyQ:"", policyA:null};
const UL = {high:["Urgent","b-red","#FF3B30"], med:["Soon","b-orange","#FF9500"], low:["Routine","b-green","#34C759"]};
const BOXES = [["all","Inbox","tray"],["high","Urgent","alert"],["app","From the app","phoneApp"],["bursar","For Bursar","route"],["sent","Answered","done"]];
function inBox(c, box){ if (box === "sent") return c.status === "sent"; if (c.status === "sent") return false;
  return box === "all" || (box === "high" && c.urgency === "high") || (box === "app" && c.kind === "student") || (box === "bursar" && TOPICS[c.topic].office === "Bursar"); }
function visible(){ const o = {high:0, med:1, low:2}; const q = sd.q.toLowerCase();
  return S.cases.filter(c => inBox(c, sd.box) && (!q || (c.subj + c.body + c.from).toLowerCase().includes(q))).sort((a, b) => o[a.urgency] - o[b.urgency] || b.at - a.at); }

function renderDesk(){
  if (!S.staff) {
    desk.innerHTML = `<div class="d-signin"><div class="d-card">
      <div class="app-icon">${ic("logo")}</div><h1>Ask SFS for Staff</h1>
      <p class="subhead" style="margin:0">The staff inbox holds student messages, so only Student Financial Services accounts can open it.</p>
      <button class="btn" data-d="in">${ic("shield")}Sign in as SFS staff</button>
      <button class="btn plain" data-d="deny">Try a student account</button>
      ${sd.denied ? `<div class="alert">${ic("lock")}<span><b>Access denied.</b> Student accounts can't open the SFS staff dashboard.</span></div>` : ""}</div></div>`;
    desk.querySelector('[data-d="in"]').onclick = () => { S.staff = true; sd.denied = false; save(); renderDesk(); };
    desk.querySelector('[data-d="deny"]').onclick = () => { sd.denied = true; renderDesk(); };
    return;
  }
  const count = box => S.cases.filter(c => inBox(c, box)).length;
  const side = `<aside class="side" aria-label="Mailboxes">
    <div class="who"><span class="avatar sm">AR</span><div><b>A. Rivera</b><span>Financial Aid Counselor</span></div></div>
    <h4>Mailboxes</h4>${BOXES.map(([k, l, i]) => `<button class="s-item" data-box="${k}" aria-current="${sd.view === "inbox" && sd.box === k}">${ic(i)}${l}<span class="n">${count(k) || ""}</span></button>`).join("")}
    <h4>Insights</h4><button class="s-item" data-view="trends" aria-current="${sd.view === "trends"}">${ic("chart")}Trends</button>
    <h4>Tools</h4><button class="s-item" data-view="policy" aria-current="${sd.view === "policy"}">${ic("book")}Policy lookup</button>
    <div class="foot"><p class="caption" style="margin:0 2px">Demo inbox with made-up emails. Replies are not actually sent.</p><button class="s-item" data-d="reset">${ic("refund")}Reset demo</button><button class="s-item" data-d="out">${ic("signout")}Sign out</button></div>
  </aside>`;
  let main;
  if (sd.view === "trends") main = trendsView();
  else if (sd.view === "policy") main = policyView();
  else main = listPane() + detailPane();
  desk.innerHTML = `<div class="d-app ${sd.view === "inbox" ? "" : "wide"}">${side}${main}</div>`;
  bindDesk();
}
function listPane(){
  const items = visible(), title = BOXES.find(b => b[0] === sd.box)[1];
  return `<section class="list-pane"><div class="pane-head"><div class="ttl"><h2>${title}</h2><span class="caption">${items.length} message${items.length === 1 ? "" : "s"}</span></div>
    <label class="search">${ic("search")}<input id="dq" value="${esc(sd.q)}" placeholder="Search" aria-label="Search messages"></label></div>
    <div class="mlist" role="listbox" aria-label="Messages">${items.length ? items.map(c => { const [ul, ub, uc] = UL[c.urgency];
      return `<button class="mrow" role="option" data-sel="${c.id}" aria-selected="${sd.sel === c.id}"><span class="dot" style="background:${c.read ? "transparent" : uc}"></span><span>
        <span class="top"><b>${esc(c.from)}</b><span class="caption muted">${ago(c.at)}</span></span>
        <span class="subj" style="display:block">${esc(c.subj)}</span><span class="prev muted">${esc(c.summary)}</span>
        <span class="tags"><span class="badge ${ub}">${ul}</span><span class="badge b-gray">${esc(TOPICS[c.topic].label)}</span>${c.kind === "student" ? `<span class="badge b-cherry">From app</span>` : ""}${c.draft && c.status !== "sent" ? `<span class="badge b-blue">Draft</span>` : ""}</span></span></button>`; }).join("")
      : `<div class="d-empty" style="min-height:240px"><div>${ic("done")}<p class="subhead">Nothing here.</p></div></div>`}</div></section>`;
}
function detailPane(){
  const c = S.cases.find(x => x.id === sd.sel);
  if (!c) return `<section class="detail"><div class="d-empty"><div>${ic("tray")}<p class="title3" style="margin-top:8px">No message selected</p><p class="subhead">Urgent messages are at the top of the list.</p></div></div></section>`;
  const T = TOPICS[c.topic], sent = c.status === "sent";
  const srcs = [...new Set(T.kb.map(id => KB.find(e => e.id === id).src))];
  return `<section class="detail"><div class="toolbar">
      <button class="tbtn" data-d="draft" ${sent ? "disabled" : ""}>${ic("sparkle")}${c.draft ? "Redraft" : "Draft reply"}</button>
      ${T.office === "Bursar" && !sent ? `<button class="tbtn" data-d="route">${ic("route")}Route to Bursar</button>` : ""}
      <span style="flex:1"></span>
      <label class="caption">Topic <select class="d-sel" data-d="topic" aria-label="Topic">${Object.entries(TOPICS).map(([k, t]) => `<option value="${k}" ${k === c.topic ? "selected" : ""}>${esc(t.label)}</option>`).join("")}</select></label>
      <label class="caption">Priority <select class="d-sel" data-d="urg" aria-label="Priority">${Object.entries(UL).map(([k, v]) => `<option value="${k}" ${k === c.urgency ? "selected" : ""}>${v[0]}</option>`).join("")}</select></label>
    </div>
    <div class="d-body">
      <h1>${esc(c.subj)}</h1>
      <div class="from"><span class="avatar sm">${esc(c.from[0])}</span><div><b style="font-size:14px">${esc(c.from)}</b><div class="meta">${c.kind === "student" ? "Sent from the Ask SFS app" : "Email to sfs@temple.edu"} · ${ago(c.at)} ago · ${T.office === "Bursar" ? "Bursar's Office topic" : "SFS topic"}</div></div></div>
      <div class="ai-sum"><span class="k">${ic("sparkle")}Summary</span><span>${esc(c.summary)}</span></div>
      ${c.flags.map(f => `<div class="flag">${ic("alert")}<span>${esc(f)}</span></div>`).join("")}
      <div class="mailbody">${esc(c.body)}</div>
      ${sent ? `<div class="banner ok">${ic("done")}<div><b style="display:block;font-size:15px">${c.draft.startsWith("(Routed") ? "Routed to the Bursar's Office" : "Reply approved and sent"}</b><span class="subhead">Demo only: nothing actually left this page.</span></div></div>` : `
      <div class="compose"><div class="ch">${ic("send", 'style="width:14px;height:14px"')}Reply to ${esc(c.from)}<span style="flex:1"></span><span class="caption">Drafted from SFS policy · you approve before it sends</span></div>
        <textarea id="draftBox" placeholder="Click “Draft reply” to write a reply from SFS policy, then edit it.">${esc(c.draft)}</textarea>
        <div class="cf"><div class="srcs">${srcs.map(s => `<a href="${SRC[s].u}" target="_blank" rel="noopener">${esc(SRC[s].t)}</a>`).join("")}</div><span style="flex:1"></span>
          <button class="tbtn primary" data-d="approve" ${c.draft ? "" : "disabled"}>${ic("send")}Approve &amp; send</button></div></div>`}
    </div></section>`;
}
function draftFor(c){
  const T = TOPICS[c.topic], card = CARDS[c.topic] || CARDS.other, first = c.from.split(" ")[0];
  if (c.flags.some(f => /FERPA/.test(f))) return `Hello,\n\nThank you for reaching out. Because of federal privacy law (FERPA), we can only discuss a student's financial aid with people listed on the student's FERPA waiver.\n\nIf your student adds you to their waiver, we'd be glad to help. You can also call us together at 215-204-2244 (Mon–Fri, 8:30–5).\n\nBest,\nStudent Financial Services`;
  const lines = card.steps.map(s => "• " + s).join("\n");
  const docs = c.flags.some(f => /tax documents/.test(f)) ? "\n\nPlease don't email tax documents. Upload them securely to the SFS dashboard at temple.studentforms.com." : "";
  const tail = T.office === "Bursar" ? "For billing details, the Bursar's Office can also help at bursar@temple.edu or 215-204-7269." : "If you still need help, call us at 215-204-2244 (Mon–Fri, 8:30–5) or book an appointment through QLess.";
  return `Hi ${first},\n\nThanks for reaching out, and sorry for the stress. ${card.brief}\n\nWhat to do next:\n${lines}${docs}\n\n${tail}\n\nBest,\nStudent Financial Services`;
}
function trendsView(){
  const counts = {}; S.cases.forEach(c => counts[c.topic] = (counts[c.topic] || 0) + 1);
  const rows = Object.entries(counts).sort((a, b) => b[1] - a[1]), max = rows[0]?.[1] || 1, total = S.cases.length;
  const open = S.cases.filter(c => c.status !== "sent");
  return `<section class="detail"><div class="wide-body">
    <div><div class="eyebrow">This week</div><h1 style="font-size:28px;margin:2px 0 0">What students are asking</h1></div>
    <div class="kpis">
      <div class="kpi"><span>Open messages</span><b>${open.length}</b><span>${open.filter(c => c.urgency === "high").length} urgent</span></div>
      <div class="kpi"><span>Answered in the app</span><b>${S.stats.solved}</b><span>no email needed</span></div>
      <div class="kpi"><span>Prepped cases from app</span><b>${S.cases.filter(c => c.kind === "student").length}</b><span>arrive with documents ready</span></div>
      <div class="kpi"><span>Belong to the Bursar</span><b>${open.filter(c => TOPICS[c.topic].office === "Bursar").length}</b><span>route, don't answer</span></div>
    </div>
    <div class="panes2">
      <div class="box"><h3>Messages by topic</h3>${rows.map(([k, n]) => `<div class="hb"><span>${esc(TOPICS[k].label)}</span><span class="t"><i style="width:${n / max * 100}%"></i></span><span class="v">${n}</span></div>`).join("")}</div>
      <div class="box"><h3>Fix it once, not 300 times</h3>${rows.slice(0, 3).map(([k, n]) => `<div class="fix"><b>${esc(TOPICS[k].label)} · ${Math.round(n / total * 100)}%</b><span>${esc(TOPICS[k].act)}</span><span class="caption">Page to rewrite: ${esc(TOPICS[k].page)}</span></div>`).join("")}</div>
    </div></div></section>`;
}
function policyView(){
  const qs = ["Can a part-time student get their loan before add/drop?","Can federal aid pay a prior semester balance?","Parent calling without a FERPA waiver?","When is the fall SAP appeal deadline?"];
  const a = sd.policyA;
  return `<section class="detail"><div class="wide-body" style="max-width:820px">
    <div><div class="eyebrow">Tools</div><h1 style="font-size:28px;margin:2px 0 0">Policy lookup</h1><p class="subhead" style="margin:6px 0 0">The exact rule and its source, so every counselor gives the same answer.</p></div>
    <form id="pform" class="search" style="padding:10px 14px;border-radius:12px">${ic("search")}<input id="pq" value="${esc(sd.policyQ)}" placeholder="Ask a policy question" aria-label="Policy question" style="font-size:15px"><button class="tbtn primary" type="submit">Look up</button></form>
    <div class="chips" style="padding:0;flex-wrap:wrap">${qs.map(q => `<button class="chip" data-pq="${esc(q)}" style="font-size:13px;padding:7px 12px">${esc(q)}</button>`).join("")}</div>
    ${a ? `<div class="p-answer">${a.map((e, i) => `<div style="${i ? "border-top:.5px solid var(--sep);padding-top:10px" : ""}"><div class="eyebrow" style="margin-bottom:4px">${esc(SRC[e.src].t)}</div><span>${esc(e.text)}</span><div style="margin-top:6px"><a href="${SRC[e.src].u}" target="_blank" rel="noopener" style="font-size:13px">Open policy page</a></div></div>`).join("")}</div>` : ""}
  </div></section>`;
}
function bindDesk(){
  desk.querySelectorAll("[data-box]").forEach(b => b.onclick = () => { sd.view = "inbox"; sd.box = b.dataset.box; sd.sel = null; renderDesk(); });
  desk.querySelectorAll("[data-view]").forEach(b => b.onclick = () => { sd.view = b.dataset.view; renderDesk(); });
  desk.querySelectorAll("[data-sel]").forEach(b => b.onclick = () => { sd.sel = b.dataset.sel; const c = S.cases.find(x => x.id === sd.sel); c.read = true; save(); renderDesk(); });
  const dq = $("#dq"); if (dq) dq.oninput = () => { sd.q = dq.value; const pos = dq.selectionStart; renderDesk(); const n = $("#dq"); n.focus(); n.setSelectionRange(pos, pos); };
  const c = S.cases.find(x => x.id === sd.sel);
  const dB = $("#draftBox"); if (dB && c) dB.oninput = () => { c.draft = dB.value; save(); const ap = desk.querySelector('[data-d="approve"]'); if (ap) ap.disabled = !dB.value.trim(); };
  desk.querySelectorAll("[data-d]").forEach(el => {
    const k = el.dataset.d;
    if (el.tagName === "SELECT") el.onchange = () => { if (k === "topic") { c.topic = el.value; c.summary = summarize(c); } else c.urgency = el.value; save(); renderDesk(); };
    else el.onclick = () => {
      if (k === "out") { S.staff = false; save(); renderDesk(); }
      else if (k === "reset") { seed(); S.stats = {asked:0, solved:0, handoffs:0}; sd.sel = null; save(); renderDesk(); toast("Demo reset"); }
      else if (k === "draft") { c.draft = draftFor(c); save(); renderDesk(); toast("Draft ready. Review it before sending."); }
      else if (k === "approve") { c.status = "sent"; save(); renderDesk(); toast("Reply approved"); }
      else if (k === "route") { c.status = "sent"; c.draft = "(Routed to Bursar)"; save(); renderDesk(); toast("Routed to the Bursar's Office"); }
    };
  });
  const pf = $("#pform"); if (pf) pf.onsubmit = e => { e.preventDefault(); lookup($("#pq").value); };
  desk.querySelectorAll("[data-pq]").forEach(b => b.onclick = () => lookup(b.dataset.pq));
}
function lookup(q){ sd.policyQ = q; if (!q.trim()) return; const hits = retrieve(q).filter(x => x.s > 0).slice(0, 2).map(x => x.e); sd.policyA = hits.length ? hits : [KB[0]]; renderDesk(); }

// ==========================================================================================
// BOOT
// ==========================================================================================
renderDesk();
})();
