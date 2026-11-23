import { state, subscribe } from '../state.js';
import { computeStreaks } from '../core/streaks.js';
import { streakMessage } from '../data/demo-data.js';
import { getDay } from '../data/curriculum.js';
import { esc } from '../core/dom.js';
import { navigate } from '../router.js';

const TOTAL_DAYS = 100;

export function renderDashboard(root) {
  const paint = () => {
    root.innerHTML = template();
    wire(root);
  };
  paint();
  return subscribe(paint);
}

function template() {
  const { current, total } = computeStreaks(state.completedDays);
  const nextDay = Math.min(total + 1, TOTAL_DAYS);
  const today = getDay(nextDay);
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const fraction = Math.min(total / TOTAL_DAYS, 1);
  const offset = circumference * (1 - fraction);
  const done = total >= TOTAL_DAYS;

  return `
    <div class="card" style="text-align:center;">
      <div class="ring">
        <svg viewBox="0 0 200 200">
          <circle class="ring-track" cx="100" cy="100" r="${radius}"></circle>
          <circle class="ring-fill" cx="100" cy="100" r="${radius}"
            style="stroke-dasharray:${circumference};stroke-dashoffset:${offset}"></circle>
        </svg>
        <div class="ring-center">
          <span class="big">${total}</span>
          <span class="small">of ${TOTAL_DAYS} days</span>
        </div>
      </div>
      <p style="margin-top:var(--sp-3);color:var(--color-text-secondary);font-size:var(--fs-sm);">${esc(streakMessage(current))}</p>
    </div>

    <div class="stat-grid" style="margin-bottom:var(--sp-4);">
      <div class="stat-tile"><div class="value">${current}</div><div class="label">Current streak</div></div>
      <div class="stat-tile"><div class="value">${TOTAL_DAYS - total}</div><div class="label">Days remaining</div></div>
    </div>

    <div class="card">
      <div class="card-title">${done ? 'Challenge complete' : `Day ${nextDay} of ${TOTAL_DAYS}`}</div>
      ${
        done
          ? `<p>You’ve completed the full 100-day journey. Revisit any topic any time from the Topics tab.</p>`
          : today.comingSoon
            ? `<p style="color:var(--color-text-secondary);">This day’s content isn’t written yet — the journey structure is ready for it.</p>`
            : `
              <h3 style="font-size:var(--fs-md);margin-bottom:var(--sp-1);">${esc(today.title)}</h3>
              <span class="pill">${esc(today.system)}</span>
              <button id="btn-continue" class="btn btn-primary" style="margin-top:var(--sp-4);">Continue Today’s Learning</button>
            `
      }
    </div>
  `;
}

function wire(root) {
  const btn = root.querySelector('#btn-continue');
  if (btn) {
    btn.addEventListener('click', () => {
      const { total } = computeStreaks(state.completedDays);
      navigate(`/topic/${Math.min(total + 1, TOTAL_DAYS)}`);
    });
  }
}
