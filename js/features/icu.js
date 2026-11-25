// ICU practice: 107 ICU-level questions in sessions of ten. Unseen questions
// first, then ones you missed. Answers count toward accuracy and the streak
// (quizAttempts with topicId "icu:<topic>").
import { state, subscribe } from '../state.js';
import { submitQuizAttempt } from '../core/sync.js';
import { esc } from '../core/dom.js';
import { track } from '../core/track.js';
import { ICU_QUESTIONS, ICU_TOPICS, ICU_REVIEW } from '../data/icu/questions.js';

const SESSION = 10;

export function renderIcu(root, params = {}) {
  let topic = params.topic && ICU_TOPICS.some((t) => t.slug === params.topic) ? params.topic : 'all';
  let queue = null, i = 0, picked = null, tally = { right: 0, wrong: 0 }, busy = false;

  const history = () => {
    const last = new Map();
    for (const a of state.quizAttempts) if (String(a.topicId || '').startsWith('icu:')) last.set(a.mcqId, a.isCorrect);
    return last;
  };
  const pool = () => ICU_QUESTIONS.filter((q) => topic === 'all' || q.topicSlug === topic);

  function build() {
    const h = history();
    const list = pool();
    const unseen = list.filter((q) => !h.has(q.id));
    const missed = list.filter((q) => h.get(q.id) === false);
    const right = list.filter((q) => h.get(q.id) === true);
    const shuffle = (a) => a.map((x) => [Math.random(), x]).sort((p, q) => p[0] - q[0]).map((x) => x[1]);
    queue = [...shuffle(unseen), ...shuffle(missed), ...shuffle(right)].slice(0, SESSION);
    i = 0; picked = null; tally = { right: 0, wrong: 0 };
  }

  function stats() {
    const h = history(), list = pool();
    const seen = list.filter((q) => h.has(q.id)).length, correct = list.filter((q) => h.get(q.id) === true).length;
    return { total: list.length, seen, correct };
  }

  function head() {
    const st = stats();
    const reviewed = ICU_REVIEW.status === 'reviewed';
    return `<div class="page-heading"><span class="page-eyebrow">ICU practice</span><h2>${ICU_QUESTIONS.length} critical care questions</h2>
      <p>Airway, sepsis, ARDS, shock, toxicology, neurocritical care and more, each with a worked explanation and a source.</p></div>
      <p class="icu-note">${reviewed ? `Checked by ${esc(ICU_REVIEW.by)} · ${esc(ICU_REVIEW.date)}. ` : 'Not yet reviewed by the editor. '}ICU level: these questions include doses. Check anything you would act on against current guidelines and your local protocols.</p>
      <div class="rv-chips">${[['all', 'All topics'], ...ICU_TOPICS.map((t) => [t.slug, t.name])].map(([v, l]) =>
        `<button class="rv-chip${topic === v ? ' on' : ''}" data-topic="${esc(v)}">${esc(l)}</button>`).join('')}</div>
      <div class="icu-stats"><span><b>${st.seen}</b>/${st.total} answered</span><span><b>${st.seen ? Math.round(st.correct / st.seen * 100) : 0}%</b> correct</span></div>`;
  }

  function body() {
    if (!queue) {
      return `<div class="empty-state">Ten questions at a time: new ones first, then the ones you missed.<br>
        <button class="btn btn-primary btn-sm rv-inline" id="icu-start">Start ${topic === 'all' ? '' : esc(ICU_TOPICS.find((t) => t.slug === topic).name) + ' '}practice</button></div>`;
    }
    if (i >= queue.length) {
      const n = tally.right + tally.wrong;
      return `<div class="rv-done"><strong>${tally.right} of ${n} right</strong><div class="rv-tally"><span class="g-clear">${tally.right} right</span><span class="g-missed">${tally.wrong} missed</span></div></div>
        <div class="empty-state">Missed questions come back in your next sessions.<br><button class="btn btn-primary btn-sm rv-inline" id="icu-again">Ten more</button></div>`;
    }
    const q = queue[i], L = (k) => String.fromCharCode(65 + k);
    return `<div class="rv-meta"><span>${i + 1} of ${queue.length}</span><span>${esc(q.topic)} · ${esc(q.difficulty)}</span></div>
      <div class="rv-bar"><span style="width:${(i / queue.length) * 100}%"></span></div>
      <article class="rv-card">
        <p class="rv-q">${esc(q.stem)}</p>
        <ol class="rv-opts icu-opts">${q.options.map((o, k) => {
          const cls = picked === null ? '' : k === q.correct ? 'is-right' : k === picked ? 'is-wrong' : '';
          return `<li class="${cls}"><button ${picked !== null ? 'disabled' : ''} data-pick="${k}"><i>${L(k)}</i><span>${esc(o)}</span></button></li>`;
        }).join('')}</ol>
        ${picked !== null ? `<div class="rv-ans icu-ex">${q.explanation}${q.ref ? `<p class="icu-ref">Source: ${esc(q.ref)}</p>` : ''}</div>` : ''}
      </article>
      ${picked !== null ? `<button class="btn btn-primary" id="icu-next">${i + 1 < queue.length ? 'Next question' : 'See results'}</button>` : ''}`;
  }

  function paint() {
    root.innerHTML = head() + body();
    root.querySelectorAll('[data-topic]').forEach((b) => b.addEventListener('click', () => { topic = b.dataset.topic; queue = null; paint(); }));
    root.querySelector('#icu-start')?.addEventListener('click', () => { build(); track('icu/start/' + topic); paint(); });
    root.querySelector('#icu-again')?.addEventListener('click', () => { build(); paint(); });
    root.querySelector('#icu-next')?.addEventListener('click', () => { i++; picked = null; paint(); if (i >= queue.length) track('icu/session-done'); window.scrollTo({ top: 0, behavior: 'smooth' }); });
    root.querySelectorAll('[data-pick]').forEach((b) => b.addEventListener('click', () => answer(+b.dataset.pick)));
  }

  async function answer(k) {
    if (busy || picked !== null) return;
    const q = queue[i];
    picked = k; busy = true;
    const ok = k === q.correct;
    tally[ok ? 'right' : 'wrong']++;
    paint();
    if (state.user) {
      try { await submitQuizAttempt(state.user.uid, { topicId: 'icu:' + q.topicSlug, mcqId: q.id, selectedOption: k, isCorrect: ok }); }
      catch (e) { console.error('ICU attempt not saved', e); }
    }
    busy = false;
  }

  paint();
  // Firestore updates refresh the counters only between questions.
  return subscribe(() => { if (!queue || picked === null) paint(); });
}
