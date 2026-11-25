import { initFirebase } from './core/firebase.js';
import { onAuthChange, signInWithGoogle, signInAsGuest, signOutUser } from './core/auth.js';
import {
  subscribeChallengeProgress,
  subscribeNotes,
  subscribeFlashcardSchedule,
  subscribeQuizAttempts,
  subscribeTeachingSessions,
} from './core/sync.js';
import { state, setState } from './state.js';
import { route, notFound, startRouter, navigate, currentRoutePath } from './router.js';

import { renderDashboard } from './features/dashboard.js';
import { renderChallenge } from './features/challenge.js';
import { renderTopics, renderTopicDetail } from './features/topics.js';
import { renderMastery } from './features/mastery.js';
import { renderMockExam } from './features/mock-exam.js';
import { renderTeaching } from './features/teaching.js';
import { renderReviews } from './features/reviews.js';
import { renderNotes } from './features/notes.js';
import { renderProgress } from './features/analytics.js';
import { renderAbout } from './features/about.js';
import { renderProfile } from './features/profile.js';
import { ON_OLD_HOST, moveFromOldHost, takeIncomingMove, finishIncomingMove } from './core/move.js';
import { toast } from './features/guest-link.js';

const $ = (id) => document.getElementById(id);

// The splash is the loading screen: it stays at least long enough for the
// trace to finish writing (shorter for returning visitors), then fades.
const SPLASH_T0 = performance.now();
let SPLASH_MIN = 1750;
try {
  if (localStorage.getItem('med100_seen') === '1') { SPLASH_MIN = 850; $('loading-screen').classList.add('is-quick'); }
  localStorage.setItem('med100_seen', '1');
} catch (e) { /* private mode */ }
if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) SPLASH_MIN = 200;
let splashGone = false;
function leaveSplash(then) {
  if (splashGone) { then(); return; }
  const wait = Math.max(0, SPLASH_MIN - (performance.now() - SPLASH_T0));
  setTimeout(() => {
    then();
    splashGone = true;
    const el = $('loading-screen');
    el.classList.add('is-leaving');
    setTimeout(() => el.classList.add('hidden'), 600);
  }, wait);
}

function showLoading() {
  $('auth-screen').classList.add('hidden');
  $('app-shell').classList.remove('active');
}
function showAuth() {
  leaveSplash(() => {
    $('auth-screen').classList.remove('hidden');
    $('app-shell').classList.remove('active');
  });
}
function showApp() {
  leaveSplash(() => {
    $('auth-screen').classList.add('hidden');
    $('app-shell').classList.add('active');
  });
}

function authErrorBanner(message) {
  const el = $('auth-error');
  el.textContent = message;
  el.className = 'error-banner';
}
function clearAuthError() {
  $('auth-error').className = 'hidden';
}

let unsubProgress = null;
let unsubNotes = null;
let unsubFlashcards = null;
let unsubQuizAttempts = null;
let unsubTeachingSessions = null;
let routerStarted = false;

function teardownSubscriptions() {
  if (unsubProgress) unsubProgress();
  if (unsubNotes) unsubNotes();
  if (unsubFlashcards) unsubFlashcards();
  if (unsubQuizAttempts) unsubQuizAttempts();
  if (unsubTeachingSessions) unsubTeachingSessions();
  unsubProgress = unsubNotes = unsubFlashcards = unsubQuizAttempts = unsubTeachingSessions = null;
}

function setupSubscriptions(uid) {
  unsubProgress = subscribeChallengeProgress(
    uid,
    (data) => setState(data),
    (error) => console.error('[sync] challengeProgress listener failed:', error),
  );
  unsubNotes = subscribeNotes(
    uid,
    (notes) => setState({ notes }),
    (error) => console.error('[sync] notes listener failed:', error),
  );
  unsubFlashcards = subscribeFlashcardSchedule(
    uid,
    (flashcardSchedule) => setState({ flashcardSchedule }),
    (error) => console.error('[sync] flashcardSchedule listener failed:', error),
  );
  unsubQuizAttempts = subscribeQuizAttempts(
    uid,
    (quizAttempts) => setState({ quizAttempts }),
    (error) => console.error('[sync] quizAttempts listener failed:', error),
  );
  unsubTeachingSessions = subscribeTeachingSessions(
    uid,
    (teachingSessions) => setState({ teachingSessions }),
    (error) => console.error('[sync] teachingSessions listener failed:', error),
  );
}

function updateNavHighlight() {
  const path = currentRoutePath();
  window.scrollTo(0, 0);
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    const match = path === btn.dataset.route || (btn.dataset.routePrefix && path.startsWith(btn.dataset.routePrefix));
    if (match) btn.setAttribute('aria-current', 'page');
    else btn.removeAttribute('aria-current');
  });
}

function registerRoutes() {
  const view = $('view-root');
  const title = $('header-title');

  route('/dashboard', () => {
    title.textContent = 'Today';
    updateNavHighlight();
    return renderDashboard(view);
  });
  route('/challenge', () => {
    title.textContent = 'Challenge';
    updateNavHighlight();
    return renderChallenge(view);
  });
  route('/topics', () => {
    title.textContent = 'Topics';
    updateNavHighlight();
    return renderTopics(view);
  });
  route('/topic/:day', ({ day }) => {
    title.textContent = 'Topic';
    updateNavHighlight();
    return renderTopicDetail(view, day);
  });
  route('/mock-exam', () => {
    title.textContent = 'Mock Examination';
    updateNavHighlight();
    return renderMockExam(view);
  });
  route('/mastery/:day', ({ day }) => {
    title.textContent = 'Question Practice';
    updateNavHighlight();
    return renderMastery(view, day);
  });
  route('/teaching/:day', ({ day }) => {
    title.textContent = 'Teaching Mode';
    updateNavHighlight();
    return renderTeaching(view, day);
  });
  route('/reviews', () => {
    title.textContent = 'Review Queue';
    updateNavHighlight();
    return renderReviews(view);
  });
  route('/notes', () => {
    title.textContent = 'Notes';
    updateNavHighlight();
    return renderNotes(view);
  });
  route('/progress', () => {
    title.textContent = 'Progress';
    updateNavHighlight();
    return renderProgress(view);
  });
  route('/profile', () => {
    title.textContent = 'Profile';
    updateNavHighlight();
    return renderProfile(view, { onSignOut: () => signOutUser() });
  });
  route('/about', () => {
    title.textContent = 'About';
    updateNavHighlight();
    return renderAbout(view);
  });
  notFound(() => {
    title.textContent = 'Med100';
    view.innerHTML = '<div class="empty-state">Page not found.</div>';
  });
}

function wireNav() {
  document.querySelectorAll('.nav-btn').forEach((btn) => {
    btn.addEventListener('click', () => navigate(btn.dataset.route));
  });
  $('profile-btn').addEventListener('click', () => navigate('/profile'));
}

async function main() {
  const moving = !ON_OLD_HOST && takeIncomingMove();
  registerRoutes();
  wireNav();

  try {
    await initFirebase();
  } catch (error) {
    console.error('Firebase initialization failed:', error);
    showAuth();
    authErrorBanner('Could not connect to Med100. Check your connection and reload. (' + error.message + ')');
    return;
  }

  let moveHandled = false, guestRequested = false;
  onAuthChange((user) => {
    if (ON_OLD_HOST) { if (!moveHandled) { moveHandled = true; moveFromOldHost(user); } return; }
    if (moving && !moveHandled) {
      if (!user) {
        if (!guestRequested) { guestRequested = true; signInAsGuest().catch((e) => { console.error(e); showAuth(); }); }
        return;
      }
      moveHandled = true;
      finishIncomingMove(user.uid).then((r) => {
        if (r) toast(r.failed && !r.ok ? 'We could not bring your earlier progress over.' : 'Welcome to med100.thetract.org — your progress came with you.');
      });
    }
    teardownSubscriptions();
    setState({
      user,
      authReady: true,
      completedDays: [],
      notes: [],
      flashcardSchedule: [],
      quizAttempts: [],
      teachingSessions: [],
    });

    if (user) {
      setupSubscriptions(user.uid);
      showApp();
      if (!routerStarted) {
        routerStarted = true;
        startRouter('/dashboard');
      }
    } else {
      showAuth();
    }
  });

  $('btn-google').addEventListener('click', async () => {
    clearAuthError();
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign-in failed:', error);
      authErrorBanner('Google sign-in failed: ' + error.message);
    }
  });

  $('btn-guest').addEventListener('click', async () => {
    clearAuthError();
    try {
      await signInAsGuest();
    } catch (error) {
      console.error('Guest sign-in failed:', error);
      authErrorBanner('Guest sign-in failed: ' + error.message);
    }
  });
}

main().catch((error) => {
  console.error('Fatal error:', error);
  document.getElementById('loading-screen').querySelector('.sp-stage').insertAdjacentHTML('beforeend', '<div class="sp-err"><p>Something went wrong.</p><p style="font-size:12px;opacity:0.8;margin-top:8px;">' +
    String(error.message).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c])) +
    '</p></div>');
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((error) => {
      console.error('Service worker registration failed:', error);
    });
  });
}
