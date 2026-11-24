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
import { renderTeaching } from './features/teaching.js';
import { renderReviews } from './features/reviews.js';
import { renderNotes } from './features/notes.js';
import { renderProgress } from './features/analytics.js';
import { renderProfile } from './features/profile.js';

const $ = (id) => document.getElementById(id);

function showLoading() {
  $('loading-screen').classList.remove('hidden');
  $('auth-screen').classList.add('hidden');
  $('app-shell').classList.remove('active');
}
function showAuth() {
  $('loading-screen').classList.add('hidden');
  $('auth-screen').classList.remove('hidden');
  $('app-shell').classList.remove('active');
}
function showApp() {
  $('loading-screen').classList.add('hidden');
  $('auth-screen').classList.add('hidden');
  $('app-shell').classList.add('active');
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
    title.textContent = 'Med100';
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
    title.textContent = 'Today’s Topic';
    updateNavHighlight();
    return renderTopicDetail(view, day);
  });
  route('/mastery/:day', ({ day }) => {
    title.textContent = 'AI Mastery Mode';
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

  onAuthChange((user) => {
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
  document.getElementById('loading-screen').innerHTML =
    '<div style="text-align:center;color:#fff;"><p>Something went wrong.</p><p style="font-size:12px;opacity:0.8;margin-top:8px;">' +
    String(error.message).replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c])) +
    '</p></div>';
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch((error) => {
      console.error('Service worker registration failed:', error);
    });
  });
}
