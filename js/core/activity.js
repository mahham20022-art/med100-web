// Daily streak. A day counts when the learner does any study on it
// (finishes a day, answers a question, reviews a card, teaches back,
// writes a note). Dates are the learner's local calendar days.
//
// One missed day is forgiven by a "shield" (once in any 7 days), so a
// single night on call does not wipe out a month of work; two missed days
// in a row, or two misses in a week, end the streak.
//
// Sources: the dated records already synced (quiz attempts, teach-backs,
// notes, last review of each card), an `activeDates` list on the progress
// doc (best effort: written with merge, ignored if the Rules refuse it),
// and a local copy so the streak shows instantly and offline.
import { state, setState } from '../state.js';

const LS = 'med100_active_days';
const DAY = 86400000;
export const dayKey = (t = Date.now()) => { const d = new Date(t); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
const ms = (v) => typeof v === 'number' ? v : (v && typeof v.toMillis === 'function') ? v.toMillis() : (v && typeof v.seconds === 'number') ? v.seconds * 1000 : 0;
const shift = (key, n) => { const [y, m, d] = key.split('-').map(Number); return dayKey(new Date(y, m - 1, d + n, 12).getTime()); };

function local() { try { return JSON.parse(localStorage.getItem(LS) || '[]'); } catch { return []; } }

export function activeDates() {
  const set = new Set(local());
  (state.activeDates || []).forEach((k) => set.add(k));
  const add = (v) => { const t = ms(v); if (t) set.add(dayKey(t)); };
  state.quizAttempts.forEach((a) => add(a.answeredAt));
  state.teachingSessions.forEach((s) => add(s.completedAt));
  state.flashcardSchedule.forEach((f) => add(f.lastReviewedAt));
  state.notes.forEach((n) => add(n.createdAt));
  if (state.lastActionDate) add(state.lastActionDate);
  return set;
}

// Walk back from today. Today not yet active does not break anything:
// the streak is "at risk" until midnight.
export function dailyStreak(now = Date.now()) {
  const set = activeDates(), today = dayKey(now);
  const doneToday = set.has(today);
  let d = doneToday ? today : shift(today, -1);
  let count = 0, lastShield = null, shieldUsed = false;
  for (let guard = 0; guard < 2000; guard++) {
    if (set.has(d)) { count++; d = shift(d, -1); continue; }
    const prev = shift(d, -1);
    const shieldFree = lastShield === null || (Date.parse(lastShield) - Date.parse(d)) / DAY >= 7;
    if (count > 0 && set.has(prev) && shieldFree) { lastShield = d; if (!shieldUsed) shieldUsed = d; d = prev; continue; }
    break;
  }
  // best run over all history, with the same shield rule
  const sorted = [...set].sort();
  let best = 0, run = 0, prevKey = null, shieldAt = null;
  for (const k of sorted) {
    if (prevKey && shift(prevKey, 1) === k) run++;
    else if (prevKey && shift(prevKey, 2) === k && (shieldAt === null || (Date.parse(k) - Date.parse(shieldAt)) / DAY >= 7)) { run++; shieldAt = shift(prevKey, 1); }
    else { run = 1; shieldAt = null; }
    best = Math.max(best, run); prevKey = k;
  }
  // the shield is still available if none was spent in the last 7 days
  const shieldReady = !lastShield || (Date.parse(today) - Date.parse(lastShield)) / DAY >= 7;
  return { current: count, best: Math.max(best, count), doneToday, atRisk: count > 0 && !doneToday, shieldUsed: lastShield, shieldReady, total: set.size };
}

let syncFn = null;
export function setActivitySync(fn) { syncFn = fn; }

// Call after any study action. Cheap; writes at most once per day.
export function recordActivity() {
  const k = dayKey();
  const l = local();
  if (!l.includes(k)) { l.push(k); try { localStorage.setItem(LS, JSON.stringify(l.slice(-400))); } catch { /* private mode */ } }
  if (!(state.activeDates || []).includes(k)) {
    setState({ activeDates: [...(state.activeDates || []), k] });
    if (syncFn && state.user) syncFn(state.user.uid, k).catch((e) => console.warn('[activity] activeDates not saved (rules?)', e?.code || e));
  }
}
