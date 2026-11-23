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
  notes: [],
  flashcardSchedule: [], // [{id, topicId, stage, dueDate, ...}]
};

export function setState(patch) {
  Object.assign(state, patch);
  for (const fn of listeners) fn(state);
}

export function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}
