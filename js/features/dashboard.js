// Dashboard — "Rhythm". Today's day is the hero; the 100 days are a
// rhythm strip the learner writes; numbers appear only when they say
// something (no rows of zeros for a new learner).
import { state, subscribe } from '../state.js';
import { computeStreaks } from '../core/streaks.js';
import { getDay, getDayByTopicId } from '../data/curriculum.js';
import { getQuestionsForTopic } from '../data/questions.js';
import { relativeTime } from '../core/time.js';
import { esc } from '../core/dom.js';
import { navigate } from '../router.js';
import { dueFlashcards, overdueCount } from '../core/spaced-repetition.js';
import { icon } from '../core/icons.js';
import { rhythmStrip, beatLine } from '../core/rhythm.js';
import { hasGuestProgress, dashboardLinkDismissed, guestLinkCard, wireGuestLink } from './guest-link.js';

const TOTAL_DAYS = 100;
let drawn = false; // animate the strip once per session, not on every data refresh

export function renderDashboard(root) {
  const paint = () => {
    if (root.querySelector('[data-keep] [data-msg]:not([hidden])')) return;   /* keep the link result on screen */
    root.innerHTML = template(); wire(root); drawn = true;
  };
  paint();
  return subscribe(paint);
}

function greeting() {
  const h = new Date().getHours();
  return h < 5 ? 'Late shift' : h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

function firstName() {
  const u = state.user;
  if (!u || u.isAnonymous) return '';
  const n = (u.displayName || '').trim().split(/\s+/)[0];
  if (n) return n;
  const e = (u.email || '').split('@')[0].split(/[._-]/)[0];
  return e ? e[0].toUpperCase() + e.slice(1) : '';
}

export function readingMinutes(day) {
  if (!day || day.comingSoon) return 0;
  const text = [day.coreContent, ...(day.objectives || []), ...(day.keyConcepts || []), ...(day.clinicalPearls || [])].join(' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  const qs = day.topicId ? getQuestionsForTopic(day.topicId).length : 0;
  return Math.max(5, Math.round(words / 190 + qs * 1.2));
}

const pad = (n) => String(n).padStart(2, '0');

function hero(nextDay, today, isDone) {
  const date = new Date().toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
  const name = firstName();
  const hello = `${greeting()}${name ? `, ${esc(name)}` : ''}.`;
  const top = `<div class="hero-top"><span class="hero-day">${isDone ? 'Day 100 · complete' : `Day ${pad(nextDay)} / 100`}</span><span class="hero-date">${esc(date)}</span></div>`;
  const beat = `<svg class="hero-beat" viewBox="0 0 320 46" preserveAspectRatio="none" aria-hidden="true"><path pathLength="1" d="${beatLine(320, 4)}"/><circle cx="320" cy="31" r="4"/></svg>`;

  if (isDone) {
    return `<section class="hero hero-done">${top}<div class="hero-copy"><p class="hero-hello">${hello}</p>
      <h2>One hundred days. The whole rhythm is yours.</h2></div>
      <div class="hero-act">${beat}<button class="btn btn-signal" data-go="/topics">Revisit any topic</button></div></section>`;
  }
  if (today.comingSoon) {
    return `<section class="hero">${top}<div class="hero-copy"><p class="hero-hello">${hello}</p>
      <h2>Day ${nextDay} is being written.</h2>
      <div class="hero-meta"><span>You are fully up to date</span></div></div>
      <div class="hero-act">${beat}<button class="btn btn-signal" data-go="/reviews">Use the time to review</button></div></section>`;
  }
  const mins = readingMinutes(today);
  const qs = getQuestionsForTopic(today.topicId).length;
  return `<section class="hero">${top}
    <div class="hero-copy"><p class="hero-hello">${hello} Today’s topic:</p>
      <h2>${esc(today.title)}</h2>
      <div class="hero-meta"><span>${esc(today.system)}</span><span>≈ ${mins} min</span>${qs ? `<span>${qs} questions</span>` : ''}</div></div>
    <div class="hero-act">${beat}<button id="btn-continue" class="btn btn-signal" data-go="/topic/${nextDay}">Start day ${nextDay} <span aria-hidden="true">→</span></button></div>
  </section>`;
}

function rhythmPanel(total, current, nextDay, isDone) {
  const args = { completed: state.completedDays, skipped: state.skippedDays || [], today: isDone ? 0 : nextDay, animate: !drawn };
  const answered = state.quizAttempts.length;
  const PH = ['Foundation', 'Development', 'Integration', 'Mastery', 'Final'];
  const pn = Math.min(5, Math.ceil(Math.max(1, isDone ? 100 : nextDay) / 20));
  const phase = { n: pn, name: PH[pn - 1] };
  const acc = answered ? Math.round(state.quizAttempts.filter((a) => a.isCorrect).length / answered * 100) : null;
  const vitals = [
    `<div class="vital"><b>${total}<small>/100</small></b><span>days written</span></div>`,
    `<div class="vital"><b>${phase.n}<small>/5</small></b><span>${phase.name} phase</span></div>`,
    `<div class="vital"><b>${100 - total}</b><span>days ahead</span></div>`,
    acc !== null ? `<div class="vital"><b>${acc}<small>%</small></b><span>of ${answered} answers right</span></div>` : '',
  ].join('');
  return `<section class="panel rhythm-wrap">
    <div class="panel-head"><h3>Your rhythm</h3><a href="#/challenge">The 100-day plan</a></div>
    ${rhythmStrip({ ...args, cols: 10, maxRows: 3, id: 'rsn' }).replace('rs-box', 'rs-box narrow')}
    ${rhythmStrip({ ...args, cols: 25, id: 'rsw' }).replace('rs-box', 'rs-box wide')}
    <div class="vitals">${vitals}</div>
  </section>`;
}

function dueSection() {
  if (!state.completedDays.length) return '';
  const due = dueFlashcards().length, overdue = overdueCount();
  if (!due) return '';
  return `<section class="panel due-wrap"><div class="due">
    <div class="due-n">${due}</div>
    <div class="due-copy"><strong>Spaced review is due</strong><span>${overdue ? `${overdue} overdue · ` : ''}about ${Math.max(1, Math.round(due * 0.4))} min</span></div>
    <button class="btn btn-primary btn-sm" data-go="/reviews">Review</button></div></section>`;
}

function toolsSection(nextDay) {
  const d = Math.min(nextDay, TOTAL_DAYS);
  const items = [
    { route: '/mock-exam', ic: 'mcq', t: 'Mock exam', s: 'Timed, mixed topics' },
    { route: `/teaching/${d}`, ic: 'teaching', t: 'Teach it back', s: 'Explain today’s topic' },
    { route: '/challenge', ic: 'challenge', t: 'The plan', s: 'Five phases, 100 days' },
  ];
  return `<section class="tools-wrap"><div class="tools">${items.map((i) =>
    `<button class="tool" data-go="${i.route}"><span class="tool-ic">${icon(i.ic)}</span><span><strong>${i.t}</strong><small>${i.s}</small></span></button>`).join('')}</div></section>`;
}

function performanceSection() {
  if (state.quizAttempts.length < 3) return '';
  const total = state.quizAttempts.length, correct = state.quizAttempts.filter((a) => a.isCorrect).length, pct = Math.round(correct / total * 100);
  const byTopic = new Map();
  for (const a of state.quizAttempts) { const e = byTopic.get(a.topicId) || { total: 0, correct: 0 }; e.total++; if (a.isCorrect) e.correct++; byTopic.set(a.topicId, e); }
  const ranked = [...byTopic.entries()].filter(([, v]) => v.total >= 2)
    .map(([topicId, v]) => ({ title: getDayByTopicId(topicId)?.title || topicId, acc: v.correct / v.total })).sort((a, b) => b.acc - a.acc);
  const strongest = ranked[0], weakest = ranked.length > 1 && ranked[ranked.length - 1].acc < 0.8 ? ranked[ranked.length - 1] : null;
  return `<section class="panel perf-wrap"><div class="panel-head"><h3>Accuracy</h3><a href="#/progress">Details</a></div>
    <div class="perf-line"><span>${correct} of ${total} correct</span><strong>${pct}%</strong></div>
    <div class="perf-bar"><span style="width:${pct}%"></span></div>
    ${strongest ? `<div class="perf-line"><span>Strongest</span><strong>${esc(strongest.title)}</strong></div>` : ''}
    ${weakest ? `<div class="perf-line"><span>Needs work</span><strong>${esc(weakest.title)}</strong></div>` : ''}</section>`;
}

function ms(v) {
  if (typeof v === 'number') return v;
  if (v && typeof v.toMillis === 'function') return v.toMillis();
  if (v && typeof v.seconds === 'number') return v.seconds * 1000;
  return 0;
}

function activitySection() {
  const items = [
    ...state.quizAttempts.map((a) => ({ t: ms(a.answeredAt), topicId: a.topicId, k: a.isCorrect ? '' : 'is-bad', label: `${a.isCorrect ? 'Right' : 'Missed'} · ${getDayByTopicId(a.topicId)?.title || 'Question'}` })),
    ...state.teachingSessions.map((s) => ({ t: ms(s.completedAt), topicId: s.topicId, k: 'is-teach', label: `Taught back · ${s.topicTitle}` })),
  ].filter((a) => a.t > 0).sort((a, b) => b.t - a.t).slice(0, 5);
  if (!items.length) return '';
  return `<section class="panel act-wrap"><div class="panel-head"><h3>Recent</h3></div>
    ${items.map((a) => `<button class="activity" data-topic="${esc(a.topicId)}"><i class="${a.k}"></i><span>${esc(a.label)}</span><small>${esc(relativeTime(a.t))}</small></button>`).join('')}</section>`;
}

function template() {
  const { current, total } = computeStreaks(state.completedDays);
  const nextDay = Math.min(total + 1, TOTAL_DAYS), today = getDay(nextDay), isDone = total >= TOTAL_DAYS;
  return `<div class="dash">
    ${hero(nextDay, today, isDone)}
    ${hasGuestProgress() && !dashboardLinkDismissed() ? `<div class="keep-wrap">${guestLinkCard({ dismissible: true })}</div>` : ''}
    ${rhythmPanel(total, current, nextDay, isDone)}
    ${dueSection()}
    ${toolsSection(nextDay)}
    ${performanceSection()}
    ${activitySection()}
  </div>`;
}

function wire(root) {
  wireGuestLink(root);
  root.querySelectorAll('[data-go]').forEach((b) => b.addEventListener('click', () => navigate(b.dataset.go)));
  root.querySelectorAll('[data-topic]').forEach((b) => b.addEventListener('click', () => {
    const day = getDayByTopicId(b.dataset.topic);
    if (day) navigate(`/topic/${day.day}`);
  }));
}
