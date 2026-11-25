// Dashboard — "Rhythm". Today's day is the hero; the 100 days are a
// rhythm strip the learner writes; numbers appear only when they say
// something (no rows of zeros for a new learner).
import { state, subscribe } from '../state.js';
import { computeStreaks } from '../core/streaks.js';
import { dailyStreak, activeDates } from '../core/activity.js';
import { getDay, getDayByTopicId } from '../data/curriculum.js';
import { getQuestionsForTopic } from '../data/questions.js';
import { relativeTime } from '../core/time.js';
import { esc } from '../core/dom.js';
import { navigate } from '../router.js';
import { dueFlashcards, overdueCount, weakFlashcards } from '../core/spaced-repetition.js';
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
const FLAME = '<svg viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M12 2.5c.6 3.2 4.8 5.6 4.8 10.4A4.8 4.8 0 0 1 12 17.7 4.8 4.8 0 0 1 7.2 12.9c0-2.1 1-3.6 2.2-4.8.2 1.6 1 2.6 2 3.1C11 8.6 11.3 5.3 12 2.5z" fill="currentColor"/><path d="M12 21.5c-2.3 0-4-1.5-4-3.6" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" opacity=".55"/></svg>';

// Streak block under the hero: what keeps it, and the shield.
function streakSection(nextDay) {
  const st = dailyStreak();
  const h = new Date().getHours();
  if (!st.current && !st.total) return '';
  const due = dueFlashcards().length;
  const quick = due ? { go: '/reviews', t: `Recall ${Math.min(due, 5)} question${Math.min(due, 5) === 1 ? '' : 's'}`, s: 'about 2 min' } : { go: `/topic/${nextDay}`, t: `Start day ${nextDay}`, s: 'today’s topic' };
  let head, sub, act = '';
  if (st.doneToday) {
    head = `${st.current}-day streak`;
    sub = st.current >= st.best && st.current > 1 ? 'Your longest yet. Today counts.' : `Today counts. Best: ${st.best} days.`;
  } else if (st.current) {
    head = `Keep your ${st.current}-day streak`;
    sub = `${h >= 18 ? 'The day is nearly over. ' : ''}Any study counts: one question, one card, one note.`;
    act = `<button class="btn btn-signal btn-sm" data-go="${quick.go}">${quick.t}</button>`;
  } else {
    head = 'Start a streak today';
    sub = 'Any study counts: one question, one card, one note.';
    act = `<button class="btn btn-primary btn-sm" data-go="${quick.go}">${quick.t}</button>`;
  }
  const week = [...Array(7)].map((_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const on = activeSet.has(k), shield = st.shieldUsed === k;
    return `<span class="sk-d${on ? ' on' : ''}${shield ? ' shield' : ''}${i === 6 ? ' today' : ''}"><i></i><small>${d.toLocaleDateString(undefined, { weekday: 'narrow' })}</small></span>`;
  }).join('');
  return `<section class="panel streak-wrap${st.atRisk ? ' at-risk' : ''}"><div class="sk">
    <div class="sk-flame">${FLAME}<b>${st.current}</b></div>
    <div class="sk-copy"><strong>${head}</strong><span>${sub}</span></div>${act}</div>
    <div class="sk-week">${week}</div>
    <p class="sk-note">${st.shieldReady ? 'Shield ready: one missed day a week won’t break your streak.' : 'Shield used this week: miss another day and the streak restarts.'}</p></section>`;
}
let activeSet = new Set();

function hero(nextDay, today, isDone) {
  const date = new Date().toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
  const name = firstName();
  const hello = `${greeting()}${name ? `, ${esc(name)}` : ''}.`;
  const st = dailyStreak();
  const streak = st.current
    ? `<span class="hero-streak${st.doneToday ? ' is-lit' : ''}" title="${st.doneToday ? 'Today counts' : 'Study today to keep it'}">${FLAME}<b>${st.current}</b> day${st.current === 1 ? '' : 's'}</span>`
    : '';
  const top = `<div class="hero-top"><span class="hero-day">${isDone ? 'Day 100 · complete' : `Day ${pad(nextDay)} / 100`}</span>${streak || `<span class="hero-date">${esc(date)}</span>`}</div>`;
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
      <div class="hero-meta"><span>${esc(today.system)}</span><span>≈ ${mins} min</span>${qs ? `<span>${qs} questions</span>` : ''}</div>
      ${(today.objectives || []).length ? `<ul class="hero-learn" aria-label="By the end you can">${today.objectives.slice(0, 3).map((o) => `<li>${esc(o)}</li>`).join('')}</ul>` : ''}</div>
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
    (() => { const st = dailyStreak(); return `<div class="vital${st.current >= 7 ? ' is-signal' : ''}"><b>${st.current}</b><span>day streak · best ${st.best}</span></div>`; })(),
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
  const due = dueFlashcards().length, overdue = overdueCount(), weak = weakFlashcards().length;
  if (!due && !weak) return '';
  const line = due
    ? `${overdue ? `${overdue} overdue · ` : ''}about ${Math.max(1, Math.round(due * 0.5))} min${weak ? ` · <em>${weak} weak</em>` : ''}`
    : `Nothing due · <em>${weak} weak spot${weak === 1 ? '' : 's'}</em> to practise`;
  return `<section class="panel due-wrap"><div class="due">
    <div class="due-n">${due || weak}</div>
    <div class="due-copy"><strong>${due ? `${due === 1 ? 'Question' : 'Questions'} to recall` : 'Weak spots'}</strong><span>${line}</span></div>
    <button class="btn btn-primary btn-sm" data-go="/reviews">${due ? 'Recall' : 'Practise'}</button></div></section>`;
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
  activeSet = activeDates();
  const { current, total } = computeStreaks(state.completedDays);
  const nextDay = Math.min(total + 1, TOTAL_DAYS), today = getDay(nextDay), isDone = total >= TOTAL_DAYS;
  return `<div class="dash">
    ${hero(nextDay, today, isDone)}
    ${streakSection(nextDay)}
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
