// The data adapter between this web app and the EXISTING Firebase
// schema the native Android/iOS app and its deployed Firestore Security
// Rules already define. Every path/field name here was read directly
// from `firestore.rules` and `challenge_remote_datasource.dart` in the
// native app's repository — nothing here is invented.
//
// Known limitation (documented, not silently papered over): the native
// app writes `challengeProgress/state` with a plain `.set()` (no merge)
// from its own offline-first local database as the source of truth.
// If a user studies on both native and web, whichever side syncs last
// wins for that document — there is no merge/conflict-resolution layer.
// Fine for "same account, mostly one device at a time"; a real
// multi-device story would need a Cloud Function.
import { getDb, getSdk } from './firebase.js';

function store() {
  return getSdk().store;
}

// Firestore timestamps are Timestamp objects with .toMillis() in the
// real SDK; this app's test mock returns a plain number from
// serverTimestamp() instead. Normalize both to a plain ms number so
// feature code never has to care which one it got.
export function toMillis(value) {
  if (value == null) return null;
  if (typeof value === 'number') return value;
  if (typeof value.toMillis === 'function') return value.toMillis();
  return null;
}

// --- Challenge progress (users/{uid}/challengeProgress/state) ---------

export function subscribeChallengeProgress(uid, onChange, onError) {
  const s = store();
  const ref = s.doc(getDb(), 'users', uid, 'challengeProgress', 'state');
  return s.onSnapshot(
    ref,
    (snap) => {
      const data = snap.data() || {};
      onChange({
        completedDays: Array.isArray(data.completedDays) ? data.completedDays : [],
        skippedDays: Array.isArray(data.skippedDays) ? data.skippedDays : [],
        hasStartedAt: !!data.startedAt,
        lastActionDate: toMillis(data.lastActionDate),
      });
    },
    onError,
  );
}

export async function markDayComplete(uid, nextDay, hasStartedAt) {
  const s = store();
  const ref = s.doc(getDb(), 'users', uid, 'challengeProgress', 'state');
  const payload = {
    completedDays: s.arrayUnion(nextDay),
    lastActionDate: s.serverTimestamp(),
    updatedAt: s.serverTimestamp(),
  };
  if (!hasStartedAt) payload.startedAt = s.serverTimestamp();
  await s.setDoc(ref, payload, { merge: true });
}

// --- Notes (users/{uid}/notes/{id}) — own simple shape -----------------
// Path matches Firestore Rules; field names do NOT match the native
// app's richer Note schema (title/bodyMarkdown/folderId/images), so
// these are a web-only scratchpad, not shared with the native Notes
// feature. Documented, not pretended otherwise.

export function subscribeNotes(uid, onChange, onError) {
  const s = store();
  const q = s.query(s.collection(getDb(), 'users', uid, 'notes'), s.orderBy('createdAt', 'desc'));
  return s.onSnapshot(
    q,
    (snap) => onChange(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError,
  );
}

export async function addNote(uid, text) {
  const s = store();
  await s.addDoc(s.collection(getDb(), 'users', uid, 'notes'), { text, createdAt: Date.now() });
}

export async function deleteNote(uid, noteId) {
  const s = store();
  await s.deleteDoc(s.doc(getDb(), 'users', uid, 'notes', noteId));
}

// --- Spaced repetition (users/{uid}/flashcardSchedule/{flashcardId}) --
// Collection name/shape matches the native app's already-shipped fixed
// 7/30/90-day Leitner ladder (see RepetitionStage in the native repo),
// not the SM-2 scheme a from-scratch design might reach for — matching
// the existing, already-deployed client-owned path takes priority over
// introducing a second, incompatible scheduling model for the same data.

export function subscribeFlashcardSchedule(uid, onChange, onError) {
  const s = store();
  return s.onSnapshot(
    s.collection(getDb(), 'users', uid, 'flashcardSchedule'),
    (snap) => onChange(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    onError,
  );
}

export async function upsertFlashcardSchedule(uid, flashcardId, data) {
  const s = store();
  const ref = s.doc(getDb(), 'users', uid, 'flashcardSchedule', flashcardId);
  await s.setDoc(ref, data, { merge: true });
}

// --- Quiz attempts (users/{uid}/quizAttempts/{id}) — append-only ------
// Rules allow create only (no update/delete): submitting raw attempts
// is real and persists, but the native app's `progress`/`streaks`/
// `mastery` aggregates are server-computed by a Cloud Function that
// does not exist yet (Blaze plan not upgraded) — this app computes and
// displays its own equivalent stats client-side instead of writing to
// those (hard-denied) paths.

export async function submitQuizAttempt(uid, attempt) {
  const s = store();
  await s.addDoc(s.collection(getDb(), 'users', uid, 'quizAttempts'), {
    ...attempt,
    answeredAt: s.serverTimestamp(),
  });
}

// Read-side for Dashboard V2.0's Performance Snapshot — Rules allow
// read for the owner (just not update/delete), so this is a real,
// permitted read, not a workaround. Capped to the most recent 200 so a
// long-term user's dashboard doesn't have to pull an ever-growing
// collection.
export function subscribeQuizAttempts(uid, onChange, onError) {
  const s = store();
  const q = s.query(
    s.collection(getDb(), 'users', uid, 'quizAttempts'),
    s.orderBy('answeredAt', 'desc'),
    s.limit(200),
  );
  return s.onSnapshot(q, (snap) => onChange(snap.docs.map((d) => ({ id: d.id, ...d.data() }))), onError);
}

// --- Teaching sessions (users/{uid}/teachingSessions/{id}) ------------
// Append-only, same field shape the native app writes (see
// TeachingSessions Drift table / teaching_remote_datasource), so a
// session logged here is genuinely readable from the native side too.

export async function submitTeachingSession(uid, session) {
  const s = store();
  await s.addDoc(s.collection(getDb(), 'users', uid, 'teachingSessions'), {
    ...session,
    completedAt: s.serverTimestamp(),
  });
}

// Read-side for Dashboard V2.0's Recent Activity feed.
export function subscribeTeachingSessions(uid, onChange, onError) {
  const s = store();
  const q = s.query(
    s.collection(getDb(), 'users', uid, 'teachingSessions'),
    s.orderBy('completedAt', 'desc'),
    s.limit(20),
  );
  return s.onSnapshot(q, (snap) => onChange(snap.docs.map((d) => ({ id: d.id, ...d.data() }))), onError);
}

// --- Guest → Google: carry a guest's data into an existing account ----
// Used only when the Google account already has Med100 data, so the
// guest's anonymous uid cannot simply be upgraded in place. We read the
// guest's documents while still signed in as the guest, then write them
// into the Google account after signing in there. Each write is
// independent: if the Rules refuse one kind (e.g. an append-only
// collection with stricter field checks), the others still land and the
// count of what failed is reported back.

export async function exportUserData(uid) {
  const s = store(), db = getDb();
  const list = async (name) => { try { return (await s.getDocs(s.collection(db, 'users', uid, name))).docs.map((d) => ({ id: d.id, ...d.data() })); } catch { return []; } };
  let progress = {};
  try { const snap = await s.getDoc(s.doc(db, 'users', uid, 'challengeProgress', 'state')); progress = (snap.exists() && snap.data()) || {}; } catch { /* none */ }
  return {
    progress,
    notes: await list('notes'),
    flashcardSchedule: await list('flashcardSchedule'),
    quizAttempts: await list('quizAttempts'),
    teachingSessions: await list('teachingSessions'),
  };
}

export async function importUserData(uid, data) {
  const s = store(), db = getDb();
  let ok = 0, failed = 0;
  const run = async (fn) => { try { await fn(); ok++; } catch (e) { failed++; console.warn('merge write refused', e); } };
  const p = data.progress || {};
  const days = Array.isArray(p.completedDays) ? p.completedDays : [], skipped = Array.isArray(p.skippedDays) ? p.skippedDays : [];
  if (days.length || skipped.length) {
    await run(async () => {
      const ref = s.doc(db, 'users', uid, 'challengeProgress', 'state');
      const cur = await s.getDoc(ref);
      const payload = { updatedAt: s.serverTimestamp(), lastActionDate: s.serverTimestamp() };
      if (days.length) payload.completedDays = s.arrayUnion(...days);
      if (skipped.length) payload.skippedDays = s.arrayUnion(...skipped);
      if (!(cur.exists() && cur.data().startedAt)) payload.startedAt = s.serverTimestamp();
      await s.setDoc(ref, payload, { merge: true });
    });
  }
  for (const n of data.notes || []) await run(() => s.addDoc(s.collection(db, 'users', uid, 'notes'), { text: n.text || '', createdAt: n.createdAt || Date.now() }));
  if ((data.flashcardSchedule || []).length) {
    let existing = new Set();
    try { existing = new Set((await s.getDocs(s.collection(db, 'users', uid, 'flashcardSchedule'))).docs.map((d) => d.id)); } catch { /* none */ }
    for (const f of data.flashcardSchedule) {
      if (existing.has(f.id)) continue;   /* the account's own schedule wins */
      const { id, ...rest } = f;
      await run(() => s.setDoc(s.doc(db, 'users', uid, 'flashcardSchedule', id), rest, { merge: true }));
    }
  }
  for (const a of data.quizAttempts || []) { const { id, answeredAt, ...rest } = a; await run(() => submitQuizAttempt(uid, rest)); }
  for (const t of data.teachingSessions || []) { const { id, completedAt, ...rest } = t; await run(() => submitTeachingSession(uid, rest)); }
  return { ok, failed };
}
