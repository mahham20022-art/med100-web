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
