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

  const rows = CURRICULUM.map((d) => {
    const isDone = state.completedDays.includes(d.day);
    const isCurrent = d.day === nextDay && !isDone;
    const isFuture = d.day > nextDay;
    return `
      <button class="row ${isFuture ? 'muted' : ''}" data-day="${d.day}" style="width:100%;text-align:left;${isFuture ? 'pointer-events:none;' : ''}">
        <div class="row-badge ${isDone ? 'done' : ''}">${isDone ? '✓' : d.day}</div>
        <div class="row-main">
          <div class="row-title">${esc(d.title)}${isCurrent ? ' <span class=\"pill pill-gold\">Today</span>' : ''}</div>
          <div class="row-sub">Day ${d.day} · ${esc(d.system)}</div>
        </div>
      </button>`;
  }).join('');

  return `
    <div class="card" style="display:flex;align-items:center;justify-content:space-between;">
      <div>
        <div class="card-title" style="margin-bottom:0;">Progress</div>
        <strong style="font-size:var(--fs-lg);color:var(--color-brand);">${total}/${TOTAL_DAYS}</strong>
      </div>
      ${total < TOTAL_DAYS ? `<button id="btn-mark-done" class="btn btn-primary" style="width:auto;">Mark Today as Done</button>` : ''}
    </div>
    ${rows}
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
