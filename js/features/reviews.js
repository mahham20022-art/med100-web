// Rapid recall. Cards are the questions of completed days: read the
// question, answer in your head, reveal, grade yourself in one tap.
// Scheduling is the SAME fixed 7/30/90-day Leitner ladder the native app
// uses (users/{uid}/flashcardSchedule/{id}); grading adds a ten-minute
// relearn for "missed" and a next-day retry for "needs work"
// (see nextSchedule in core/spaced-repetition.js).
import { state, subscribe } from '../state.js';
import { upsertFlashcardSchedule } from '../core/sync.js';
import { esc } from '../core/dom.js';
import { navigate } from '../router.js';
import { track } from '../core/track.js';
import { flashcardsForCompletedDays, isDue, isWeak, GRADES, nextSchedule, clearHint } from '../core/spaced-repetition.js';

const SEC_PER_CARD = 30;

export function renderReviews(root) {
  const byId = () => new Map(state.flashcardSchedule.map((s) => [s.id, s]));
  let tab = 'due';            // 'due' | 'weak' | 'all'
  let system = 'all';
  let queue = [], current = 0, revealed = false, showOpts = false;
  const done = new Set();
  const tally = { missed: 0, shaky: 0, clear: 0 };
  let busy = false, reported = false;

  function pools() {
    const sched = byId(), all = flashcardsForCompletedDays();
    return {
      all,
      due: all.filter((c) => isDue(sched.get(c.id))),
      weak: all.filter((c) => isWeak(sched.get(c.id))),
    };
  }

  function build() {
    const p = pools();
    const sched = byId();
    let list = p[tab].filter((c) => !done.has(c.id));
    if (system !== 'all') list = list.filter((c) => c.system === system);
    // Oldest-due first, never-seen cards after, in curriculum order.
    list.sort((a, b) => {
      const ea = sched.get(a.id), eb = sched.get(b.id);
      return (ea ? ea.dueDate : Infinity) - (eb ? eb.dueDate : Infinity) || a.day - b.day;
    });
    queue = list; current = 0; revealed = false; showOpts = false;
    return p;
  }

  function paint() {
    if (busy) return;
    const p = build();
    const systems = [...new Set(p[tab].map((c) => c.system))].sort();
    if (system !== 'all' && !systems.includes(system)) { system = 'all'; build(); }
    root.innerHTML = heading() + tabs(p) + (systems.length > 1 ? chips(systems) : '') + body(p);
    wire();
  }

  function heading() {
    return `<div class="page-heading"><span class="page-eyebrow">Spaced review</span><h2>Rapid recall</h2>
      <p>Answer in your head, then reveal. Grade yourself honestly: that is what sets the next review.</p></div>`;
  }

  function tabs(p) {
    const t = (id, label, n) => `<button class="rv-tab${tab === id ? ' on' : ''}" data-tab="${id}" aria-pressed="${tab === id}">${label}<b>${n}</b></button>`;
    return `<div class="rv-tabs" role="group" aria-label="Which cards">${t('due', 'Due now', p.due.length)}${t('weak', 'Weak spots', p.weak.length)}${t('all', 'All', p.all.length)}</div>`;
  }

  function chips(systems) {
    const c = (v, label) => `<button class="rv-chip${system === v ? ' on' : ''}" data-sys="${esc(v)}">${esc(label)}</button>`;
    return `<div class="rv-chips">${c('all', 'All specialties')}${systems.map((s) => c(s, s)).join('')}</div>`;
  }

  function body(p) {
    if (!state.completedDays.length) {
      return `<div class="empty-state">Finish your first day and its questions become review cards here.<br><button class="btn btn-primary btn-sm rv-inline" data-go="/topic/1">Start day 1</button></div>`;
    }
    if (!queue.length) {
      const n = tally.missed + tally.shaky + tally.clear;
      if (n && !reported) { reported = true; track('review-session/' + (n >= 20 ? '20+' : n >= 10 ? '10-19' : n >= 5 ? '5-9' : '1-4')); }
      const summary = n ? `<div class="rv-done"><strong>${n} card${n === 1 ? '' : 's'} reviewed</strong>
        <div class="rv-tally"><span class="g-clear">${tally.clear} clear</span><span class="g-shaky">${tally.shaky} needs work</span><span class="g-missed">${tally.missed} missed</span></div></div>` : '';
      const next = tab === 'due' && p.weak.filter((c) => !done.has(c.id)).length
        ? `<button class="btn btn-outline btn-sm rv-inline" data-tab="weak">Practise weak spots</button>` : '';
      const msg = tab === 'due' ? 'Nothing else is due. The next cards come back on schedule.' : tab === 'weak' ? 'No weak spots left in this set.' : 'You have gone through every card in this set.';
      return summary + `<div class="empty-state">${msg}${next ? `<br>${next}` : ''}</div>`;
    }
    const c = queue[current];
    const entry = byId().get(c.id);
    const left = queue.length - current;
    const mins = Math.max(1, Math.round(left * SEC_PER_CARD / 60));
    const L = (i) => String.fromCharCode(65 + i);
    const opts = (revealed || showOpts)
      ? `<ol class="rv-opts">${c.options.map((o, i) => `<li class="${revealed && i === c.correct ? 'is-right' : ''}"><i>${L(i)}</i><span>${esc(o)}</span></li>`).join('')}</ol>` : '';
    const did = tally.missed + tally.shaky + tally.clear;
    return `<div class="rv-meta"><span>${left} left${did ? ` · ${did} done` : ''}</span><span>about ${mins} min</span></div>
      <div class="rv-bar"><span style="width:${(did / (did + left)) * 100}%"></span></div>
      <article class="rv-card">
        <div class="rv-src">Day ${c.day} · ${esc(c.system)}${entry ? '' : ' · <em>new</em>'}</div>
        <p class="rv-q">${esc(c.stem)}</p>
        ${opts}
        ${revealed
          ? `<div class="rv-ans"><p>${esc(c.explanation)}</p>
             <a href="#/topic/${c.day}" class="rv-reread">Re-read day ${c.day}: ${esc(c.title.split(' — ')[0])} →</a></div>`
          : (showOpts ? '' : '<button class="rv-optbtn" id="rv-opts">Show the options</button>')}
      </article>
      ${revealed
        ? `<div class="rv-grades">${Object.entries(GRADES).map(([k, g], i) =>
            `<button class="rv-grade g-${k}" data-grade="${k}"><span>${g.label}</span><small>${g.hint || clearHint(entry)} · ${i + 1}</small></button>`).join('')}</div>`
        : `<button class="btn btn-primary" id="rv-reveal">Reveal answer <span class="rv-key">Space</span></button>`}`;
  }

  async function grade(k) {
    const c = queue[current];
    if (!c || !state.user || busy) return;
    const existing = byId().get(c.id);
    const next = nextSchedule(existing, k);
    busy = true;
    done.add(c.id); tally[k]++;
    try {
      await upsertFlashcardSchedule(state.user.uid, c.id, {
        topicId: c.topicId,
        stage: next.stage,
        dueDate: next.dueDate,
        lastReviewedAt: Date.now(),
        timesReviewed: (existing?.timesReviewed || 0) + 1,
        timesLapsed: (existing?.timesLapsed || 0) + (k === 'clear' ? 0 : 1),
        createdAt: existing?.createdAt || Date.now(),
      });
    } catch (error) {
      console.error('Failed to update flashcard schedule:', error);
      done.delete(c.id); tally[k]--;
    }
    busy = false;
    paint();
  }

  function wire() {
    root.querySelectorAll('[data-tab]').forEach((b) => b.addEventListener('click', () => { tab = b.dataset.tab; system = 'all'; paint(); }));
    root.querySelectorAll('[data-sys]').forEach((b) => b.addEventListener('click', () => { system = b.dataset.sys; paint(); }));
    root.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => navigate(b.dataset.go)));
    root.querySelector('#rv-reveal')?.addEventListener('click', () => { revealed = true; repaintCard(); });
    root.querySelector('#rv-opts')?.addEventListener('click', () => { showOpts = true; repaintCard(); });
    root.querySelectorAll('[data-grade]').forEach((b) => b.addEventListener('click', () => grade(b.dataset.grade)));
  }

  // In-session changes (reveal, options) must not rebuild the queue.
  function repaintCard() {
    const p = pools();
    const systems = [...new Set(p[tab].map((c) => c.system))].sort();
    root.innerHTML = heading() + tabs(p) + (systems.length > 1 ? chips(systems) : '') + body(p);
    wire();
  }

  function onKey(e) {
    if (e.target.closest('input,textarea,select,[contenteditable]') || e.metaKey || e.ctrlKey || e.altKey) return;
    if (!queue.length) return;
    if (!revealed && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); revealed = true; repaintCard(); }
    else if (revealed && ['1', '2', '3'].includes(e.key)) { e.preventDefault(); grade(Object.keys(GRADES)[+e.key - 1]); }
  }

  paint();
  document.addEventListener('keydown', onKey);
  // External updates (Firestore) rebuild the queue only between cards, so a
  // snapshot arriving mid-card never swaps the card under the reader.
  const unsub = subscribe(() => { if (!revealed && !showOpts) paint(); });
  return () => { unsub(); document.removeEventListener('keydown', onKey); };
}
