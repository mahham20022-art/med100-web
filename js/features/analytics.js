// Every metric here is computed from data the student actually owns
// (completedDays, flashcardSchedule) — no vanity counters, and nothing
// written to Firestore's server-computed `progress`/`streaks`/`mastery`
// paths (those are hard-denied to clients; see core/sync.js header).
import { state, subscribe } from '../state.js';
import { computeStreaks } from '../core/streaks.js';

const TOTAL_DAYS = 100;

export function renderProgress(root) {
  const paint = () => {
    root.innerHTML = template();
  };
  paint();
  return subscribe(paint);
}

function template() {
  const { current, longest, total } = computeStreaks(state.completedDays);
  const mastered = state.flashcardSchedule.filter((s) => s.stage === 'mastered').length;
  const dueNow = state.flashcardSchedule.filter((s) => s.dueDate <= Date.now()).length;
  const consistency = total > 0 ? Math.round((current / total) * 100) : 0;

  return `
    <div class="page-heading">
      <span class="page-eyebrow">YOUR LEARNING DATA</span>
      <h2>Progress & insight</h2>
      <p>A clear view of consistency, retention and completed work.</p>
    </div>
    <div class="stat-grid">
      <div class="stat-tile"><div class="value">${total}</div><div class="label">Days completed</div></div>
      <div class="stat-tile"><div class="value">${TOTAL_DAYS - total}</div><div class="label">Days remaining</div></div>
      <div class="stat-tile"><div class="value">${current}</div><div class="label">Current streak</div></div>
      <div class="stat-tile"><div class="value">${longest}</div><div class="label">Longest streak</div></div>
      <div class="stat-tile"><div class="value">${mastered}</div><div class="label">Cards mastered</div></div>
      <div class="stat-tile"><div class="value">${dueNow}</div><div class="label">Cards due now</div></div>
    </div>
    <div class="card" style="margin-top:var(--sp-4);">
      <div class="card-title">Consistency</div>
      <p style="color:var(--color-text-secondary);font-size:var(--fs-sm);">
        Your current streak is ${consistency}% of your total completed days —
        ${consistency >= 80 ? 'very consistent studying.' : consistency >= 40 ? 'solid, with some gaps.' : 'try to close the gaps between study days.'}
      </p>
    </div>
  `;
}
