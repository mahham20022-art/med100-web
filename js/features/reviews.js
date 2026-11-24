// Spaced repetition using the SAME fixed 7/30/90-day Leitner ladder the
// native app already implements (see RepetitionStage there) — not a
// from-scratch SM-2 design, because this data is meant to be the same
// shared schedule on both platforms (users/{uid}/flashcardSchedule/{id}).
import { state, subscribe } from '../state.js';
import { upsertFlashcardSchedule } from '../core/sync.js';
import { esc } from '../core/dom.js';
import { flashcardsForCompletedDays, isDue, STAGE_INTERVALS, STAGE_ORDER } from '../core/spaced-repetition.js';

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

  // Full rebuild from external state (initial mount, or a Firestore
  // update arriving via subscribe()) — this is the only path allowed
  // to reset `current`/`showingBack`.
  function refresh() {
    buildQueue();
    renderCurrent();
  }

  // Pure render of whatever queue/current/showingBack already are —
  // used by in-session UI actions (flip, grade) that must NOT trigger
  // a queue rebuild, or they'd stomp the very state they just set.
  function renderCurrent() {
    if (queue.length === 0) {
      root.innerHTML = pageHeading() + `<div class="empty-state">Nothing due right now. Complete more days in the Challenge to add material to review.</div>`;
      return;
    }
    const card = queue[current];
    root.innerHTML = pageHeading() + cardTemplate(card, current, queue.length, showingBack);
    wire(card);
  }

  function wire(card) {
    const flipBtn = root.querySelector('#btn-flip');
    if (flipBtn) {
      flipBtn.addEventListener('click', () => {
        showingBack = true;
        renderCurrent();
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
          // No manual state mutation here: the write updates
          // flashcardSchedule, which flows back through the
          // subscribe(refresh) below (Firestore's local-cache
          // onSnapshot fires before the write is even server-acked),
          // rebuilding the queue with this card now correctly excluded
          // and naturally landing on the next due card. Manually
          // advancing `current` here as well would race the
          // subscription's own rebuild and show the wrong card.
        } catch (error) {
          console.error('Failed to update flashcard schedule:', error);
          showingBack = false;
          renderCurrent();
        }
      });
    });
  }

  refresh();
  return subscribe(refresh);
}

function pageHeading() {
  return `
    <div class="page-heading">
      <span class="page-eyebrow">SPACED REPETITION</span>
      <h2>Review & retain</h2>
      <p>Strengthen recall with your scheduled review cards.</p>
    </div>
  `;
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
