import { state, subscribe } from '../state.js';
import { computeStreaks } from '../core/streaks.js';
import { CURRICULUM } from '../data/curriculum.js';
import { markDayComplete } from '../core/sync.js';
import { esc } from '../core/dom.js';
import { navigate } from '../router.js';

const TOTAL_DAYS = 100;

export function renderChallenge(root) {
  const paint = () => {
    root.innerHTML = template();
    wire(root);
  };
  paint();
  return subscribe(paint);
}

function template() {
  const { total } = computeStreaks(state.completedDays);
  const nextDay = Math.min(total + 1, TOTAL_DAYS);

  const phases = [
    { name: 'Foundation', range: [1, 20], note: 'Build the essential clinical framework.' },
    { name: 'Development', range: [21, 40], note: 'Strengthen core knowledge and patterns.' },
    { name: 'Integration', range: [41, 60], note: 'Connect concepts across disciplines.' },
    { name: 'Mastery', range: [61, 80], note: 'Refine recall and clinical reasoning.' },
    { name: 'Final Challenge', range: [81, 100], note: 'Consolidate the full journey.' },
  ];
  const phaseMarkup = phases.map((phase, index) => {
    const [first, last] = phase.range;
    const days = CURRICULUM.filter(d => d.day >= first && d.day <= last);
    const done = days.filter(d => state.completedDays.includes(d.day)).length;
    const isCurrent = nextDay >= first && nextDay <= last;
    const isOpen = isCurrent || (total === 0 && index === 0);
    const dayRows = days.map(d => {
      const isDone = state.completedDays.includes(d.day);
      const isToday = d.day === nextDay && !isDone;
      const isFuture = d.day > nextDay;
      return `
        <button class="row challenge-day ${isFuture ? 'muted' : ''}" data-day="${d.day}" ${isFuture ? 'disabled' : ''} style="width:100%;text-align:left;">
          <span class="row-badge ${isDone ? 'done' : ''}">${isDone ? '✓' : String(d.day).padStart(2,'0')}</span>
          <span class="row-main">
            <span class="row-title">${esc(d.title)}${isToday ? ' <span class="pill pill-gold">Next</span>' : ''}</span>
            <span class="row-sub">Day ${d.day} · ${esc(d.system)}</span>
          </span>
          <span class="challenge-day-status">${isDone ? 'Complete' : d.comingSoon ? 'Planned' : isToday ? 'Up next' : 'Locked'}</span>
        </button>`;
    }).join('');
    return `
      <details class="challenge-phase" ${isOpen ? 'open' : ''}>
        <summary class="challenge-phase-summary">
          <span class="challenge-phase-number">0${index + 1}</span>
          <span class="challenge-phase-copy"><strong>${phase.name}</strong><small>${phase.note}</small></span>
          <span class="challenge-phase-count">${done}/20</span>
          <span class="challenge-phase-chevron" aria-hidden="true">＋</span>
        </summary>
        <div class="challenge-phase-progress"><span style="width:${done / 20 * 100}%"></span></div>
        <div class="challenge-phase-days">${dayRows}</div>
      </details>`;
  }).join('');

  return `
    <div class="page-heading">
      <span class="page-eyebrow">YOUR 100-DAY PLAN</span>
      <h2>The Challenge</h2>
      <p>Build consistency. Complete one focused step at a time.</p>
    </div>
    <div class="card" style="display:flex;align-items:center;justify-content:space-between;">
      <div>
        <div class="card-title" style="margin-bottom:0;">Progress</div>
        <strong style="font-size:var(--fs-lg);color:var(--color-brand);">${total}/${TOTAL_DAYS}</strong>
      </div>
      ${total < TOTAL_DAYS ? `<button id="btn-mark-done" class="btn btn-primary" style="width:auto;">Mark Today as Done</button>` : ''}
    </div>
    ${phaseMarkup}
  `;
}

function wire(root) {
  const btnDone = root.querySelector('#btn-mark-done');
  if (btnDone) {
    btnDone.addEventListener('click', async () => {
      if (!state.user) return;
      const { total } = computeStreaks(state.completedDays);
      const nextDay = total + 1;
      if (nextDay > TOTAL_DAYS) return;
      btnDone.disabled = true;
      try {
        await markDayComplete(state.user.uid, nextDay, state.hasStartedAt);
      } catch (error) {
        console.error('Failed to mark day done:', error);
        btnDone.disabled = false;
      }
    });
  }

  root.querySelectorAll('[data-day]').forEach((btn) => {
    btn.addEventListener('click', () => navigate(`/topic/${btn.dataset.day}`));
  });
}
