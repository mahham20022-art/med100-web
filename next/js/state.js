// A tiny pub/sub store — no framework. Features read `state.x` and call
// `subscribe()` to re-render on change; nothing here is a reactivity
// framework, just enough structure to avoid passing data through a web
// of manual DOM updates.
const listeners = new Set();

export const state = {
  user: null, // Firebase User | null
  authReady: false,
  completedDays: [],
  hasStartedAt: false,
  lastActionDate: null, // ms timestamp of the last completed-day action
  notes: [],
  flashcardSchedule: [], // [{id, topicId, stage, dueDate, ...}]
  quizAttempts: [], // most recent 200, for Performance Snapshot
  teachingSessions: [], // most recent 20, for Recent Activity
};

export function setState(patch) {
  Object.assign(state, patch);
  for (const fn of listeners) fn(state);
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
