/* Ask SFS help center. Uses the same public SFS facts and answer rules as the app (../data.js). */
(function () {
"use strict";
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const SENSITIVE = /\b916\d{6}\b|\b\d{3}-\d{2}-\d{4}\b|\b\d{9}\b|\b\d{12,19}\b/;
const COLORS = {late:"#FF9500", bill:"#981B31", refund:"#34C759", hold:"#FF3B30", verif:"#007AFF", sap:"#5856D6", loans:"#30B0C7", other:"#8E8E93"};
const CONTACT = {Bursar:["Bursar’s Office","215-204-7269"], Both:["SFS","215-204-2244"], SFS:["SFS","215-204-2244"]};
const ORDER = ["late","bill","refund","hold","verif","sap","loans","other"];

// ---- answer engine (same rules as the app)
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

// ---- chips
const CHIPS = ["My grant hasn’t shown up and my bill is due", "When do I get my refund?", "Why do I have a hold?", "SFS or the Bursar, who do I ask?"];
$("#chips").innerHTML = CHIPS.map(q => `<button type="button" class="chip" data-q="${esc(q)}">${esc(q)}</button>`).join("");

// ---- chat
let chat = [];
function bubble(m){
  if (m.me) return `<div class="bub me">${esc(m.text)}</div>`;
  if (m.typing) return `<div class="bub bot" aria-label="Typing"><span class="dots"><i></i><i></i><i></i></span></div>`;
  if (m.blocked) return `<div class="bub bot"><span class="warn">That looks like an ID, SSN or account number, so it wasn’t sent. Please remove it and ask again.</span></div>`;
  const a = m.a, [who, num] = CONTACT[a.office];
  const parts = a.text.split(/(?<=\.)\s/); const lead = parts.shift(), rest = parts.join(" ");
  return `<div class="bub bot"><span><span class="lead">${esc(lead)}</span>${rest ? " " + esc(rest) : ""}</span>
    ${a.steps.length ? `<ol>${a.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>` : ""}
    <div class="meta"><span class="badge">${esc(who)} · ${num}</span><a href="${SRC[a.src].u}" target="_blank" rel="noopener">Source: ${esc(SRC[a.src].t)}</a></div>
    <div class="next">${a.human ? `<a class="btn solid" href="../">Prep my case in the app</a><a class="btn" href="#contact">Contact info</a>` : `<button type="button" class="btn" data-topic="${a.topic}">More on ${esc(CARDS[a.topic].title.toLowerCase())}</button>`}</div>
  </div>`;
}
function renderChat(){
  $("#chatWrap").hidden = !chat.length;
  $("#chat").innerHTML = chat.map(bubble).join("");
}
function ask(q){
  q = q.trim(); if (!q) return;
  chat.push({me:true, text:q});
  if (SENSITIVE.test(q)) { chat.push({blocked:true}); renderChat(); scrollToChat(); return; }
  chat.push({typing:true}); renderChat(); scrollToChat();
  setTimeout(() => { chat.pop(); chat.push({a:answerFor(q)}); renderChat(); }, 600);
}
function scrollToChat(){ $("#chatWrap").scrollIntoView({behavior:"smooth", block:"start"}); }
$("#askForm").addEventListener("submit", e => { e.preventDefault(); const i = $("#askInput"); ask(i.value); i.value = ""; });
$("#clearChat").onclick = () => { chat = []; renderChat(); };

// ---- topic cards + dialog
const tile = k => `<span class="tile" style="background:${COLORS[k]}"><svg viewBox="0 0 24 24" aria-hidden="true">${CARDS[k].icon}</svg></span>`;
$("#cards").innerHTML = ORDER.map(k => `<button type="button" class="card" data-topic="${k}">${tile(k)}<b>${esc(CARDS[k].title)}</b><span>${esc(CARDS[k].brief)}</span></button>`).join("");
function openTopic(k){
  const c = CARDS[k], [who, num] = CONTACT[TOPICS[k].office];
  $("#dialog").innerHTML = `<button type="button" class="x" data-close aria-label="Close">×</button>
    ${tile(k)}<h2 id="dlgTitle">${esc(c.title)}</h2><p>${esc(c.brief)}</p>
    <ol>${c.steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol>
    <div class="meta"><span class="badge">${esc(who)} · ${num}</span><a href="${SRC[c.src].u}" target="_blank" rel="noopener">Source: ${esc(SRC[c.src].t)}</a></div>
    <div class="next"><a class="btn solid" href="../">Prep my case in the app</a><button type="button" class="btn" data-close>Done</button></div>`;
  $("#dialog").hidden = false; $("#scrim").hidden = false; $("#dialog").querySelector(".x").focus();
}
function closeTopic(){ $("#dialog").hidden = true; $("#scrim").hidden = true; }
$("#scrim").onclick = closeTopic;
document.addEventListener("keydown", e => { if (e.key === "Escape") closeTopic(); });

// ---- key dates
const today = () => { const d = new Date(); d.setHours(0,0,0,0); return d; };
const days = s => Math.round((new Date(s + "T00:00:00") - today()) / 864e5);
const DATES = [["sapappeal","Fall SAP appeal deadline"],["bill","Spring bill due"],["fafsa","2027–28 FAFSA priority deadline"],["final","Final spring payment date"]];
$("#dateList").innerHTML = DATES.map(([k, t]) => { const d = TODO[k].date, n = days(d);
  const when = new Date(d + "T00:00:00").toLocaleDateString("en-US", {month:"short", day:"numeric", year:"numeric"});
  const rel = n < 0 ? "Passed" : n === 0 ? "Today" : `In ${n} day${n === 1 ? "" : "s"}`;
  return `<div class="date"><span class="d">${when}</span><b>${esc(t)}</b><span>${esc(TODO[k].why)}</span><span class="rel" style="color:${n < 0 ? "var(--label3)" : n <= 30 ? "var(--red)" : "var(--label2)"}">${rel}</span></div>`; }).join("");

// ---- one click handler
document.addEventListener("click", e => {
  const q = e.target.closest("[data-q]"); if (q) { ask(q.dataset.q); return; }
  const t = e.target.closest("[data-topic]"); if (t) { openTopic(t.dataset.topic); return; }
  if (e.target.closest("[data-close]")) closeTopic();
});
})();
