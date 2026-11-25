// Shared spaced-repetition logic used by both features/reviews.js (the
// actual review queue) and features/dashboard.js (the "Due for Review"
// count) — kept in one place so the two screens can't disagree about
// what counts as "due", which they did before this was split out: the
// dashboard counted only existing flashcardSchedule docs, missing
// brand-new cards that were never scheduled yet (which the review
// queue correctly treats as due).
import { state } from '../state.js';
import { CURRICULUM } from '../data/curriculum.js';

export const DAY_MS = 24 * 60 * 60 * 1000;
export const STAGE_INTERVALS = { newCard: 0, day7: 7 * DAY_MS, day30: 30 * DAY_MS, day90: 90 * DAY_MS };
export const STAGE_ORDER = ['newCard', 'day7', 'day30', 'day90', 'mastered'];

export function flashcardsForCompletedDays() {
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

export function isDue(scheduleEntry, now = Date.now()) {
  if (!scheduleEntry) return true; // never scheduled = due now (new)
  return scheduleEntry.dueDate <= now;
}

export function dueFlashcards() {
  const byId = new Map(state.flashcardSchedule.map((s) => [s.id, s]));
  const now = Date.now();
  return flashcardsForCompletedDays().filter((card) => isDue(byId.get(card.id), now));
}

export function overdueCount() {
  const byId = new Map(state.flashcardSchedule.map((s) => [s.id, s]));
  const now = Date.now();
  return flashcardsForCompletedDays().filter((card) => {
    const entry = byId.get(card.id);
    // "Overdue" (vs merely due today): either never scheduled and the
    // day itself was completed over a day ago, or scheduled more than
    // a day in the past.
    if (!entry) return false; // a brand-new card is "due", not "overdue"
    return entry.dueDate <= now - DAY_MS;
  }).length;
}
