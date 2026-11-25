// Shared spaced-repetition logic used by both features/reviews.js (the
// actual review queue) and features/dashboard.js (the "Due for Review"
// count) — kept in one place so the two screens can't disagree about
// what counts as "due", which they did before this was split out: the
// dashboard counted only existing flashcardSchedule docs, missing
// brand-new cards that were never scheduled yet (which the review
// queue correctly treats as due).
import { state } from '../state.js';
import { CURRICULUM } from '../data/curriculum.js';
import { getQuestionsForTopic } from '../data/questions.js';

export const DAY_MS = 24 * 60 * 60 * 1000;
export const STAGE_INTERVALS = { newCard: 0, day7: 7 * DAY_MS, day30: 30 * DAY_MS, day90: 90 * DAY_MS };
export const STAGE_ORDER = ['newCard', 'day7', 'day30', 'day90', 'mastered'];

// Review cards are real recall prompts: each of a completed day's
// questions becomes a card (stem first, answer and explanation on the
// back). Before Nov 2026 the cards were the day's key-concept sentences
// with a "key concept" label on the front, which is re-reading rather
// than recall; their schedule docs (id ...:kc:N) are simply no longer
// shown here.
export function flashcardsForCompletedDays() {
  const cards = [];
  for (const dayNum of state.completedDays) {
    const day = CURRICULUM.find((d) => d.day === dayNum);
    if (!day || day.comingSoon) continue;
    for (const q of getQuestionsForTopic(day.topicId)) {
      cards.push({ id: `${day.topicId}:q:${q.id}`, topicId: day.topicId, day: day.day, system: day.system, title: day.title,
        stem: q.stem, options: q.options, correct: q.correct, explanation: q.explanation });
    }
  }
  return cards;
}

// A card is "weak" when it has been missed or marked "needs work" and
// has not yet climbed past the first review stage.
export function isWeak(entry) {
  return !!(entry && (entry.timesLapsed || 0) > 0 && (entry.stage === 'newCard' || entry.stage === 'day7'));
}

export function weakFlashcards() {
  const byId = new Map(state.flashcardSchedule.map((s) => [s.id, s]));
  return flashcardsForCompletedDays().filter((c) => isWeak(byId.get(c.id)));
}

// Three grades. Missed comes back in ten minutes, needs-work tomorrow at
// the same stage, clear climbs the 7/30/90-day ladder shared with the
// native app.
export const GRADES = {
  missed: { label: 'Missed', hint: '10 min' },
  shaky: { label: 'Needs work', hint: '1 day' },
  clear: { label: 'Clear', hint: null },
};
export function nextSchedule(existing, grade, now = Date.now()) {
  const stage = existing?.stage || 'newCard';
  let nextStage = stage, due;
  if (grade === 'missed') { nextStage = 'newCard'; due = now + 10 * 60 * 1000; }
  else if (grade === 'shaky') { nextStage = stage === 'mastered' ? 'day90' : stage; due = now + DAY_MS; }
  else {
    nextStage = STAGE_ORDER[Math.min(STAGE_ORDER.indexOf(stage) + 1, STAGE_ORDER.length - 1)];
    due = now + (STAGE_INTERVALS[nextStage] ?? STAGE_INTERVALS.day90);
  }
  return { stage: nextStage, dueDate: due };
}
export function clearHint(existing) {
  const stage = existing?.stage || 'newCard';
  const next = STAGE_ORDER[Math.min(STAGE_ORDER.indexOf(stage) + 1, STAGE_ORDER.length - 1)];
  return { day7: '7 days', day30: '30 days', day90: '90 days', mastered: '90 days' }[next] || '7 days';
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
