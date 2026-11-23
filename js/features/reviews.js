// Spaced repetition using the SAME fixed 7/30/90-day Leitner ladder the
// native app already implements (see RepetitionStage there) — not a
// from-scratch SM-2 design, because this data is meant to be the same
// shared schedule on both platforms (users/{uid}/flashcardSchedule/{id}).
import { state, subscribe } from '../state.js';
import { CURRICULUM } from '../data/curriculum.js';
import { upsertFlashcardSchedule } from '../core/sync.js';
import { esc } from '../core/dom.js';

const DAY_MS = 24 * 60 * 60 * 1000;
const STAGE_INTERVALS = { newCard: 0, day7: 7 * DAY_MS, day30: 30 * DAY_MS, day90: 90 * DAY_MS };
const STAGE_ORDER = ['newCard', 'day7', 'day30', 'day90', 'mastered'];

function flashcardsForCompletedDays() {
  const cards = [];
  for (const dayNum of state.completedDays) {
    const day = CURRICULUM.find((d) => d.day === dayNum);
    if (!day || day.comingSoon) continue;
    day.keyConcepts.forEach((text, i) => {
      cards.push({ id: `${day.topicId}:kc:${i}`, topicId: day.topicId, front: `${day.title} — key concept`, back: text });
    });
  }
  return cards;
}

function isDue(scheduleEntry) {
  if (!scheduleEntry) return true; // never scheduled = due now (new)
  return scheduleEntry.dueDate <= Date.now();
}

export function renderReviews(root) {
  const scheduleById = () => new Map(state.flashcardSchedule.map((s) => [s.id, s]));
  let queue = [];
  let current = 0;
  let showingBack = false;

  function buildQueue() {
    const byId = scheduleById();
    queue = flashcardsForCompletedDays().filter((card) => isDue(byId.get(card.id)));
    current = 0;
    showingBack = false;
  }

  function paint() {
    buildQueue();
    if (queue.length === 0) {
      root.innerHTML = `<div class="empty-state">Nothing due right now. Complete more days in the Challenge to add material to review.</div>`;
      return;
    }
    const card = queue[current];
    root.innerHTML = cardTemplate(card, current, queue.length, showingBack);
    wire(card);
  }

  function wire(card) {
    const flipBtn = root.querySelector('#btn-flip');
    if (flipBtn) {
      flipBtn.addEventListener('click', () => {
        showingBack = true;
        paint();
      });
    }
    root.querySelectorAll('[data-grade]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        if (!state.user) return;
        const byId = scheduleById();
        const existing = byId.get(card.id);
        const grade = btn.dataset.grade; // 'again' | 'good'
        const currentStage = existing?.stage || 'newCard';
        let nextStage;
        if (grade === 'again') {
          nextStage = 'day7';
        } else {
          const idx = STAGE_ORDER.indexOf(currentStage);
          nextStage = STAGE_ORDER[Math.min(idx + 1, STAGE_ORDER.length - 1)];
        }
        const interval = STAGE_INTERVALS[nextStage] ?? STAGE_INTERVALS.day90;
        try {
          await upsertFlashcardSchedule(state.user.uid, card.id, {
            topicId: card.topicId,
            stage: nextStage,
            dueDate: Date.now() + interval,
            lastReviewedAt: Date.now(),
            timesReviewed: (existing?.timesReviewed || 0) + 1,
            timesLapsed: (existing?.timesLapsed || 0) + (grade === 'again' ? 1 : 0),
            createdAt: existing?.createdAt || Date.now(),
          });
        } catch (error) {
          console.error('Failed to update flashcard schedule:', error);
        }
        current++;
        showingBack = false;
        if (current >= queue.length) paint();
        else {
          root.innerHTML = cardTemplate(queue[current], current, queue.length, false);
          wire(queue[current]);
        }
      });
    });
  }

  paint();
  return subscribe(paint);
}

function cardTemplate(card, index, total, showingBack) {
  return `
    <div class="card-title" style="text-align:center;">Reviewing ${index + 1} of ${total}</div>
    <div class="card" style="min-height:160px;display:flex;align-items:center;justify-content:center;text-align:center;padding:var(--sp-6);">
      <div>
        <p style="font-weight:600;font-size:var(--fs-md);">${esc(card.front)}</p>
        ${showingBack ? `<p style="margin-top:var(--sp-3);color:var(--color-text-secondary);">${esc(card.back)}</p>` : ''}
      </div>
    </div>
    ${
      showingBack
        ? `<div style="display:flex;gap:var(--sp-2);">
             <button data-grade="again" class="btn btn-outline">Again</button>
             <button data-grade="good" class="btn btn-primary">Good</button>
           </div>`
        : `<button id="btn-flip" class="btn btn-primary">Show Answer</button>`
    }
  `;
}
