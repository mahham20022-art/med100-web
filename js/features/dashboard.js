// Dashboard V2.0 — the most important screen in the product (per the
// product brief): in a few seconds the student should know where they
// are, what's next, and what needs review. Every number here is
// computed from real state; a section with no real data yet renders
// nothing rather than a zero/placeholder presented as meaningful.
import { state, subscribe } from '../state.js';
import { computeStreaks } from '../core/streaks.js';
import { streakMessage } from '../data/demo-data.js';
import { getDay, getDayByTopicId } from '../data/curriculum.js';
import { relativeDay, relativeTime } from '../core/time.js';
import { esc } from '../core/dom.js';
import { navigate } from '../router.js';
import { dueFlashcards, overdueCount } from '../core/spaced-repetition.js';
import { icon } from '../core/icons.js';

const TOTAL_DAYS = 100;

export function renderDashboard(root) {
  const paint = () => {
    root.innerHTML = template();
    wire(root);
  };
  paint();
  return subscribe(paint);
}

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}

function welcomeSection() {
  const name = state.user?.isAnonymous ? 'Guest' : state.user?.email?.split('@')[0] || 'there';
  const dateStr = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });
  return `
    <div style="margin-bottom:var(--sp-5);">
      <p style="color:var(--color-text-secondary);font-size:var(--fs-sm);margin-bottom:2px;">${esc(dateStr)}</p>
      <h2 style="font-size:var(--fs-xl);color:var(--color-brand);">${greeting()}, ${esc(name)}.</h2>
      <p style="color:var(--color-text-secondary);">Your next step starts here.</p>
    </div>
  `;
}

function todaysMissionSection(nextDay, today, isDone) {
  if (isDone) {
    return `
      <div class="card card-mission">
        <div class="card-title" style="color:var(--color-gold);">Journey Complete</div>
        <p>You've completed all 100 days. Revisit any topic any time from the Topics tab.</p>
      </div>
    `;
  }
  if (today.comingSoon) {
    return `
      <div class="card card-mission">
        <div class="card-title" style="color:var(--color-gold);">Today's Mission — Day ${nextDay}</div>
        <p style="color:var(--color-text-secondary);">This day's content isn't written yet.</p>
      </div>
    `;
  }
  return `
    <div class="card card-mission">
      <div class="card-title" style="color:var(--color-gold);">Today's Mission — Day ${nextDay}</div>
      <h3 style="font-size:var(--fs-md);margin-bottom:var(--sp-1);">${esc(today.title)}</h3>
      <span class="pill">${esc(today.system)}</span>
      <span class="pill" style="margin-left:4px;">~15 min</span>
      <button id="btn-continue" class="btn btn-primary" style="margin-top:var(--sp-4);">Continue Today's Learning</button>
    </div>
  `;
}

function journeySection(total, nextDay) {
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const fraction = Math.min(total / TOTAL_DAYS, 1);
  const offset = circumference * (1 - fraction);
  const pct = Math.round(fraction * 100);
  return `
    <div class="card" style="text-align:center;">
      <div class="card-title">The 100-Day Journey</div>
      <div class="ring" style="width:180px;height:180px;">
        <svg viewBox="0 0 180 180">
          <defs>
            <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="var(--color-brand)"/>
              <stop offset="100%" stop-color="var(--color-gold)"/>
            </linearGradient>
          </defs>
          <circle class="ring-track" cx="90" cy="90" r="${radius}"></circle>
          <circle class="ring-fill" cx="90" cy="90" r="${radius}" stroke="url(#ringGradient)"
            style="stroke-dasharray:${circumference};stroke-dashoffset:${offset}"></circle>
        </svg>
        <div class="ring-center">
          <span class="big">${Math.min(nextDay, TOTAL_DAYS)}</span>
          <span class="small">of ${TOTAL_DAYS}</span>
        </div>
      </div>
      <p style="margin-top:var(--sp-2);font-weight:700;color:var(--color-gold);">${pct}% Completed</p>
      <p style="color:var(--color-text-secondary);font-size:var(--fs-sm);">${TOTAL_DAYS - total} days remaining</p>
    </div>
  `;
}

function momentumSection(current) {
  const sessionsCompleted = state.quizAttempts.length + state.teachingSessions.length;
  return `
    <div class="card">
      <div class="card-title">Learning Momentum</div>
      <div class="stat-grid">
        <div class="stat-tile"><div class="value">${current}</div><div class="label">Day streak</div></div>
        <div class="stat-tile"><div class="value">${sessionsCompleted}</div><div class="label">Sessions completed</div></div>
      </div>
      <p style="color:var(--color-text-secondary);font-size:var(--fs-sm);margin-top:var(--sp-3);">
        Last active: ${esc(relativeDay(state.lastActionDate))} — ${esc(streakMessage(current))}
      </p>
    </div>
  `;
}

function dueReviewSection() {
  const due = dueFlashcards();
  const overdue = overdueCount();
  if (state.completedDays.length === 0) return ''; // no material to review yet — no fake zeros
  return `
    <div class="card" style="display:flex;align-items:center;justify-content:space-between;">
      <div>
        <div class="card-title" style="margin-bottom:0;">Due for Review</div>
        <strong style="font-size:var(--fs-lg);">${due.length}</strong>
        <span style="color:var(--color-text-secondary);font-size:var(--fs-sm);"> due${overdue ? `, ${overdue} overdue` : ''}</span>
      </div>
      ${due.length ? `<button id="btn-start-review" class="btn btn-primary" style="width:auto;">Start Review</button>` : ''}
    </div>
  `;
}

function performanceSection() {
  if (state.quizAttempts.length === 0) return ''; // no data yet — don't show vanity zeros
  const total = state.quizAttempts.length;
  const correct = state.quizAttempts.filter((a) => a.isCorrect).length;
  const pct = Math.round((correct / total) * 100);

  const byTopic = new Map();
  for (const a of state.quizAttempts) {
    const entry = byTopic.get(a.topicId) || { total: 0, correct: 0 };
    entry.total++;
    if (a.isCorrect) entry.correct++;
    byTopic.set(a.topicId, entry);
  }
  const ranked = [...byTopic.entries()]
    .filter(([, v]) => v.total >= 2)
    .map(([topicId, v]) => ({ topicId, acc: v.correct / v.total, title: getDayByTopicId(topicId)?.title || topicId }))
    .sort((a, b) => b.acc - a.acc);

  const strongest = ranked[0];
  // Only call out a "weakest" topic if it's genuinely below par — a
  // tied-at-100% second topic isn't something to flag as "needs work".
  const weakest = ranked.length > 1 && ranked[ranked.length - 1].acc < 0.8 ? ranked[ranked.length - 1] : null;

  return `
    <div class="card">
      <div class="card-title">Performance Snapshot</div>
      <div class="stat-grid">
        <div class="stat-tile"><div class="value">${total}</div><div class="label">Questions answered</div></div>
        <div class="stat-tile"><div class="value">${pct}%</div><div class="label">Correct</div></div>
      </div>
      ${strongest ? `<p style="margin-top:var(--sp-3);font-size:var(--fs-sm);">★ Strongest: <strong>${esc(strongest.title)}</strong> (${Math.round(strongest.acc * 100)}%)</p>` : ''}
      ${weakest ? `<p style="font-size:var(--fs-sm);">⚠ Needs work: <strong>${esc(weakest.title)}</strong> (${Math.round(weakest.acc * 100)}%)</p>` : ''}
    </div>
  `;
}

function quickAccessSection(nextDay) {
  const items = [
    { label: 'Challenge', route: '/challenge', icon: 'challenge' },
    { label: 'Topics', route: '/topics', icon: 'topics' },
    { label: 'MCQ', route: `/mastery/${Math.min(nextDay, TOTAL_DAYS)}`, icon: 'mcq' },
    { label: 'Teaching', route: `/teaching/${Math.min(nextDay, TOTAL_DAYS)}`, icon: 'teaching' },
    { label: 'Review', route: '/reviews', icon: 'review' },
    { label: 'Notes', route: '/notes', icon: 'notes' },
    { label: 'Analytics', route: '/progress', icon: 'analytics' },
    { label: 'Profile', route: '/profile', icon: 'profile' },
  ];
  return `
    <div class="card">
      <div class="card-title">Quick Access</div>
      <div class="quick-grid">
        ${items
          .map(
            (it) => `
              <button data-quick="${it.route}" class="quick-tile">
                <span class="quick-tile-icon">${icon(it.icon)}</span>
                <span class="quick-tile-label">${esc(it.label)}</span>
              </button>
            `,
          )
          .join('')}
      </div>
    </div>
  `;
}

function recentActivitySection() {
  const activities = [
    ...state.quizAttempts.map((a) => ({
      type: 'mcq',
      time: a.answeredAt,
      topicId: a.topicId,
      label: `Answered a question — ${a.isCorrect ? 'correct' : 'incorrect'}`,
    })),
    ...state.teachingSessions.map((s) => ({
      type: 'teaching',
      time: s.completedAt,
      topicId: s.topicId,
      label: `Taught back "${s.topicTitle}" — scored ${s.masteryScore}`,
    })),
  ]
    .filter((a) => typeof a.time === 'number')
    .sort((a, b) => b.time - a.time)
    .slice(0, 5);

  if (activities.length === 0) return '';

  return `
    <div class="card">
      <div class="card-title">Recent Activity</div>
      ${activities
        .map(
          (a) => `
        <button data-activity-topic="${esc(a.topicId)}" class="row" style="width:100%;text-align:left;margin-bottom:6px;">
          <div class="row-main">
            <div class="row-title" style="font-size:var(--fs-sm);">${esc(a.label)}</div>
            <div class="row-sub">${esc(relativeTime(a.time))}</div>
          </div>
        </button>`,
        )
        .join('')}
    </div>
  `;
}

function template() {
  const { current, total } = computeStreaks(state.completedDays);
  const nextDay = Math.min(total + 1, TOTAL_DAYS);
  const today = getDay(nextDay);
  const isDone = total >= TOTAL_DAYS;

  return [
    welcomeSection(),
    todaysMissionSection(nextDay, today, isDone),
    journeySection(total, nextDay),
    momentumSection(current),
    dueReviewSection(),
    performanceSection(),
    quickAccessSection(nextDay),
    recentActivitySection(),
  ].join('');
}

function wire(root) {
  const btnContinue = root.querySelector('#btn-continue');
  if (btnContinue) {
    btnContinue.addEventListener('click', () => {
      const { total } = computeStreaks(state.completedDays);
      navigate(`/topic/${Math.min(total + 1, TOTAL_DAYS)}`);
    });
  }
  const btnReview = root.querySelector('#btn-start-review');
  if (btnReview) btnReview.addEventListener('click', () => navigate('/reviews'));

  root.querySelectorAll('[data-quick]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(btn.dataset.quick));
  });
  root.querySelectorAll('[data-activity-topic]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const day = getDayByTopicId(btn.dataset.activityTopic);
      if (day) navigate(`/topic/${day.day}`);
    });
  });
}
