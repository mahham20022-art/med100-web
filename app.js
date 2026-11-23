// Med100 web edition — plain JS, no build step.
// Firebase JS SDK loaded directly from Google's CDN, dynamically: a static
// `import` of an unreachable URL fails atomically before any of this file's
// own code runs — not even the try/catch below — leaving the page stuck on
// the loading screen forever with zero recovery. A dynamic import() inside
// main()'s try/catch degrades to a real, visible error instead.
import { TOPICS } from './topics.js';

const SDK_VERSION = '11.9.1';
const TOTAL_DAYS = 100;

// Real config for the "med100 (web)" app registered under the
// med100-production Firebase project (Project settings → Your apps → web).
const firebaseConfig = {
  apiKey: 'AIzaSyCAUIrheK1hRTrgpbhCHZlkNuKFr118N60',
  authDomain: 'med100-production.firebaseapp.com',
  projectId: 'med100-production',
  storageBucket: 'med100-production.firebasestorage.app',
  messagingSenderId: '136449767934',
  appId: '1:136449767934:web:91ea2965e1288074d428af',
  measurementId: 'G-CBME9BL5E8',
};

const $ = (id) => document.getElementById(id);
const show = (el) => el.classList.remove('hidden');
const hide = (el) => el.classList.add('hidden');
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function showScreen(name) {
  hide($('loading'));
  hide($('login-screen'));
  $('app-screen').classList.remove('active');
  if (name === 'login') show($('login-screen'));
  if (name === 'app') $('app-screen').classList.add('active');
}

function showLoginError(message) {
  const el = $('login-error');
  el.textContent = message;
  el.className = 'error-banner';
}

function clearLoginError() {
  const el = $('login-error');
  el.textContent = '';
  el.className = 'hidden';
}

// --- Progress math -----------------------------------------------------

function computeStreaks(doneDays) {
  const sorted = [...new Set(doneDays)].sort((a, b) => a - b);
  let longest = 0;
  let run = 0;
  let prev = null;
  for (const day of sorted) {
    run = prev !== null && day === prev + 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
    prev = day;
  }
  // Current streak: the consecutive run ending at the highest done day.
  let current = 0;
  if (sorted.length) {
    current = 1;
    for (let i = sorted.length - 1; i > 0; i--) {
      if (sorted[i] - sorted[i - 1] === 1) current++;
      else break;
    }
  }
  return { longest, current, total: sorted.length };
}

async function main() {
  let app, auth, db;
  let GoogleAuthProvider, signInWithPopup, signInAnonymously, onAuthStateChanged, signOut;
  let doc, onSnapshot, setDoc, arrayUnion, serverTimestamp;
  let collection, addDoc, deleteDoc, query, orderBy;

  try {
    const [{ initializeApp }, authMod, firestoreMod] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${SDK_VERSION}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${SDK_VERSION}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${SDK_VERSION}/firebase-firestore.js`),
    ]);
    ({ GoogleAuthProvider, signInWithPopup, signInAnonymously, onAuthStateChanged, signOut } =
      authMod);
    ({ doc, onSnapshot, setDoc, arrayUnion, serverTimestamp, collection, addDoc, deleteDoc, query, orderBy } =
      firestoreMod);

    app = initializeApp(firebaseConfig);
    auth = authMod.getAuth(app);
    db = firestoreMod.getFirestore(app);
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    showScreen('login');
    showLoginError('Could not connect to Med100. Please check your connection and reload.');
    return;
  }

  // --- Shared state, refreshed by Firestore listeners -------------------
  let currentUser = null;
  let completedDays = [];
  let hasStartedAt = false;
  let notes = [];
  let activeTab = 'home';
  let unsubProgress = null;
  let unsubNotes = null;

  const tabTitles = { home: 'Home', topics: 'Topics', progress: 'Progress', notes: 'Notes', profile: 'Profile' };

  function render() {
    $('tab-title').textContent = tabTitles[activeTab];
    document.querySelectorAll('.nav-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tab === activeTab);
    });
    const content = $('tab-content');
    if (activeTab === 'home') content.innerHTML = renderHome();
    if (activeTab === 'topics') content.innerHTML = renderTopics();
    if (activeTab === 'progress') content.innerHTML = renderProgress();
    if (activeTab === 'notes') content.innerHTML = renderNotes();
    if (activeTab === 'profile') content.innerHTML = renderProfile();
    attachTabListeners();
  }

  function renderHome() {
    const radius = 96;
    const circumference = 2 * Math.PI * radius;
    const fraction = Math.min(Math.max(completedDays.length / TOTAL_DAYS, 0), 1);
    const offset = circumference * (1 - fraction);
    return `
      <div class="ring-wrap">
        <svg width="220" height="220" viewBox="0 0 220 220">
          <circle class="ring-track" cx="110" cy="110" r="${radius}"></circle>
          <circle class="ring-progress" cx="110" cy="110" r="${radius}"
            style="stroke-dasharray:${circumference};stroke-dashoffset:${offset}"></circle>
        </svg>
        <div class="ring-text">
          <span class="days">${completedDays.length}/${TOTAL_DAYS}</span>
          <span class="label">days completed</span>
        </div>
      </div>
      <button id="btn-done" class="btn-primary" style="max-width:400px;margin:0 auto 12px;display:block;">Mark Today as Done</button>
    `;
  }

  function renderTopics() {
    const rows = TOPICS.map((t) => {
      const isDone = completedDays.includes(t.day);
      return `
        <div class="topic-card ${isDone ? 'done' : ''}">
          <div class="topic-day ${isDone ? 'done' : ''}">${isDone ? '✓' : t.day}</div>
          <div>
            <div class="topic-title">${esc(t.title)}</div>
            <div class="topic-system">Day ${t.day} · ${esc(t.system)}</div>
          </div>
        </div>`;
    }).join('');
    return rows;
  }

  function renderProgress() {
    const { longest, current, total } = computeStreaks(completedDays);
    return `
      <div class="stats-grid">
        <div class="stat-box"><div class="value">${total}</div><div class="label">Days completed</div></div>
        <div class="stat-box"><div class="value">${current}</div><div class="label">Current streak</div></div>
        <div class="stat-box"><div class="value">${longest}</div><div class="label">Longest streak</div></div>
        <div class="stat-box"><div class="value">${TOTAL_DAYS - total}</div><div class="label">Days remaining</div></div>
      </div>
    `;
  }

  function renderNotes() {
    const list = notes.length
      ? notes.map((n) => `
          <div class="note-card" data-id="${n.id}">
            <div>
              <div class="note-text">${esc(n.text)}</div>
              <div class="note-date">${n.createdAt ? new Date(n.createdAt).toLocaleString() : 'just now'}</div>
            </div>
            <button class="note-delete" data-delete="${n.id}">✕</button>
          </div>`).join('')
      : `<div class="empty-state">No notes yet — write your first one above.</div>`;
    return `
      <div class="note-input-row">
        <textarea id="note-input" placeholder="Write a note…" rows="2"></textarea>
        <button id="btn-add-note">Add</button>
      </div>
      ${list}
    `;
  }

  function renderProfile() {
    const isGuest = currentUser?.isAnonymous;
    return `
      <div class="panel" style="text-align:left;">
        <div class="profile-row"><span class="k">Account</span><span>${isGuest ? 'Guest' : esc(currentUser?.email || '—')}</span></div>
        <div class="profile-row"><span class="k">User ID</span><span style="font-size:11px;color:#999;">${esc(currentUser?.uid || '')}</span></div>
      </div>
      <button id="btn-signout" class="btn-outline">Sign out</button>
    `;
  }

  function attachTabListeners() {
    const btnDone = $('btn-done');
    if (btnDone) {
      btnDone.addEventListener('click', async () => {
        if (!currentUser) return;
        const nextDay = completedDays.length + 1;
        if (nextDay > TOTAL_DAYS) return;
        // Real path/shape per MED100_DATABASE_DESIGN.md and
        // challenge_remote_datasource.dart: users/{uid}/challengeProgress/state
        // with a `completedDays` field — not an app-invented shape, so
        // progress is genuinely shared with the native app on the same
        // account, and so Firestore Rules (which only match this exact
        // path) actually allow the read/write instead of silently denying it.
        const progressRef = doc(db, 'users', currentUser.uid, 'challengeProgress', 'state');
        const payload = {
          completedDays: arrayUnion(nextDay),
          lastActionDate: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
        if (!hasStartedAt) payload.startedAt = serverTimestamp();
        try {
          await setDoc(progressRef, payload, { merge: true });
        } catch (error) {
          console.error('Failed to mark day done:', error);
        }
      });
    }

    const btnAddNote = $('btn-add-note');
    if (btnAddNote) {
      btnAddNote.addEventListener('click', async () => {
        const input = $('note-input');
        const text = input.value.trim();
        if (!text || !currentUser) return;
        // Simple scratch notes, own shape ({text, createdAt}) — the path
        // (users/{uid}/notes/{id}) matches Firestore Rules, but the field
        // names don't match the native app's richer Note schema
        // (title/bodyMarkdown/folderId/...), so these won't show up in
        // the native app's Notes screen. Fine for a quick scratchpad;
        // not meant to be the same feature.
        try {
          await addDoc(collection(db, 'users', currentUser.uid, 'notes'), {
            text,
            createdAt: Date.now(),
          });
          input.value = '';
        } catch (error) {
          console.error('Failed to add note:', error);
        }
      });
    }

    document.querySelectorAll('[data-delete]').forEach((btn) => {
      btn.addEventListener('click', async () => {
        if (!currentUser) return;
        try {
          await deleteDoc(doc(db, 'users', currentUser.uid, 'notes', btn.dataset.delete));
        } catch (error) {
          console.error('Failed to delete note:', error);
        }
      });
    });

    const btnSignOut = $('btn-signout');
    if (btnSignOut) btnSignOut.addEventListener('click', () => signOut(auth));
  }

  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      activeTab = btn.dataset.tab;
      render();
    });
  });

  onAuthStateChanged(auth, (user) => {
    currentUser = user;
    if (unsubProgress) { unsubProgress(); unsubProgress = null; }
    if (unsubNotes) { unsubNotes(); unsubNotes = null; }

    if (user) {
      showScreen('app');
      activeTab = 'home';

      const progressRef = doc(db, 'users', user.uid, 'challengeProgress', 'state');
      unsubProgress = onSnapshot(
        progressRef,
        (snap) => {
          const data = snap.data() || {};
          completedDays = Array.isArray(data.completedDays) ? data.completedDays : [];
          hasStartedAt = !!data.startedAt;
          render();
        },
        (error) => console.error('Progress listener failed:', error),
      );

      const notesQuery = query(collection(db, 'users', user.uid, 'notes'), orderBy('createdAt', 'desc'));
      unsubNotes = onSnapshot(
        notesQuery,
        (snap) => {
          notes = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
          render();
        },
        (error) => console.error('Notes listener failed:', error),
      );

      render();
    } else {
      completedDays = [];
      notes = [];
      showScreen('login');
    }
  });

  $('btn-google').addEventListener('click', async () => {
    clearLoginError();
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
    } catch (error) {
      console.error('Google sign-in failed:', error);
      showLoginError('Google sign-in failed. Please try again.');
    }
  });

  $('btn-guest').addEventListener('click', async () => {
    clearLoginError();
    try {
      await signInAnonymously(auth);
    } catch (error) {
      console.error('Guest sign-in failed:', error);
      showLoginError('Guest sign-in failed. Please try again.');
    }
  });
}

main();
