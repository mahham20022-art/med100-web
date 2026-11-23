// Med100 web edition — plain JS, no build step.
// Firebase JS SDK loaded directly from Google's CDN, dynamically: a static
// `import` of an unreachable URL fails atomically before any of this file's
// own code runs — not even the try/catch below — leaving the page stuck on
// the loading screen forever with zero recovery. A dynamic import() inside
// main()'s try/catch degrades to a real, visible error instead.
const SDK_VERSION = '11.9.1';

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

const TOTAL_DAYS = 100;

const $ = (id) => document.getElementById(id);
const show = (el) => el.classList.remove('hidden');
const hide = (el) => el.classList.add('hidden');

function showScreen(name) {
  hide($('loading'));
  hide($('login-screen'));
  hide($('challenge-screen'));
  if (name === 'login') show($('login-screen'));
  if (name === 'challenge') show($('challenge-screen'));
}

function showLoginError(message) {
  const el = $('login-error');
  el.textContent = message;
  el.className = '';
  el.style.cssText =
    'display:block;background:#fdeaea;color:#a33;padding:10px 14px;border-radius:8px;font-size:14px;margin-bottom:16px;text-align:left;';
}

function clearLoginError() {
  const el = $('login-error');
  el.textContent = '';
  hide(el);
}

function setProgressRing(done) {
  const radius = 96;
  const circumference = 2 * Math.PI * radius;
  const fraction = Math.min(Math.max(done / TOTAL_DAYS, 0), 1);
  const ring = $('ring-progress');
  ring.style.strokeDasharray = `${circumference}`;
  ring.style.strokeDashoffset = `${circumference * (1 - fraction)}`;
  $('days-done').textContent = `${done}/${TOTAL_DAYS}`;
}

async function main() {
  // Never let an init failure strand the page on the loading screen
  // forever — fall back to the login screen so there's at least
  // something actionable on screen, with a visible error.
  let app, auth, db;
  let GoogleAuthProvider, signInWithPopup, signInAnonymously, onAuthStateChanged, signOut;
  let doc, onSnapshot, setDoc, arrayUnion, serverTimestamp;
  try {
    const [{ initializeApp }, authMod, firestoreMod] = await Promise.all([
      import(`https://www.gstatic.com/firebasejs/${SDK_VERSION}/firebase-app.js`),
      import(`https://www.gstatic.com/firebasejs/${SDK_VERSION}/firebase-auth.js`),
      import(`https://www.gstatic.com/firebasejs/${SDK_VERSION}/firebase-firestore.js`),
    ]);
    ({ GoogleAuthProvider, signInWithPopup, signInAnonymously, onAuthStateChanged, signOut } =
      authMod);
    ({ doc, onSnapshot, setDoc, arrayUnion, serverTimestamp } = firestoreMod);

    app = initializeApp(firebaseConfig);
    auth = authMod.getAuth(app);
    db = firestoreMod.getFirestore(app);
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    showScreen('login');
    showLoginError('Could not connect to Med100. Please check your connection and reload.');
    return;
  }

  let unsubscribeProgress = null;

  onAuthStateChanged(auth, (user) => {
    if (unsubscribeProgress) {
      unsubscribeProgress();
      unsubscribeProgress = null;
    }
    if (user) {
      showScreen('challenge');
      const progressRef = doc(db, 'users', user.uid, 'challenge', 'progress');
      unsubscribeProgress = onSnapshot(
        progressRef,
        (snap) => {
          const data = snap.data() || {};
          const done = Array.isArray(data.doneDays) ? data.doneDays.length : 0;
          setProgressRing(done);
        },
        (error) => console.error('Progress listener failed:', error),
      );
    } else {
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

  $('btn-signout').addEventListener('click', () => signOut(auth));

  $('btn-done').addEventListener('click', async () => {
    const user = auth.currentUser;
    if (!user) return;
    const done = parseInt(($('days-done').textContent || '0/100').split('/')[0], 10) || 0;
    const progressRef = doc(db, 'users', user.uid, 'challenge', 'progress');
    try {
      await setDoc(
        progressRef,
        { doneDays: arrayUnion(done + 1), lastCompletedAt: serverTimestamp() },
        { merge: true },
      );
    } catch (error) {
      console.error('Failed to mark day done:', error);
    }
  });
}

main();
