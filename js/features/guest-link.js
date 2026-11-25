// "Keep your progress": the guest → Google prompt, shared by the
// dashboard (dismissible) and the profile (always there for guests).
import { state, setState } from '../state.js';
import { linkGuestToGoogle } from '../core/auth.js';
import { esc } from '../core/dom.js';

const DISMISS_KEY = 'med100_link_dismissed_at';
const WEEK = 7 * 24 * 3600 * 1000;

export function hasGuestProgress() {
  return !!(state.user && state.user.isAnonymous &&
    (state.completedDays.length || state.quizAttempts.length || state.notes.length || state.teachingSessions.length));
}

export function dashboardLinkDismissed() {
  try { return Date.now() - Number(localStorage.getItem(DISMISS_KEY) || 0) < WEEK; } catch { return false; }
}

function what() {
  const n = state.completedDays.length;
  return n ? `${n} ${n === 1 ? 'day' : 'days'} of work` : 'your progress';
}

export function guestLinkCard({ dismissible }) {
  return `<section class="keep" data-keep>
    <div class="keep-ic" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg></div>
    <div class="keep-copy">
      <strong>Keep ${esc(what())}</strong>
      <span>You are studying as a guest. Your progress lives only in this browser: clear it or change phone and it is gone. Link Google to keep it everywhere.</span>
      <div class="keep-actions">
        <button class="btn btn-primary btn-sm" data-link>Link Google account</button>
        ${dismissible ? '<button class="btn btn-ghost btn-sm" data-dismiss>Not now</button>' : ''}
      </div>
      <p class="keep-msg" data-msg hidden></p>
    </div>
  </section>`;
}

export function wireGuestLink(root) {
  const box = root.querySelector('[data-keep]'); if (!box) return;
  const msg = box.querySelector('[data-msg]');
  const btn = box.querySelector('[data-link]');
  box.querySelector('[data-dismiss]')?.addEventListener('click', () => {
    try { localStorage.setItem(DISMISS_KEY, String(Date.now())); } catch { /* private mode */ }
    box.remove();
  });
  btn.addEventListener('click', async () => {
    btn.disabled = true; btn.textContent = 'Linking…'; msg.hidden = true;
    try {
      const r = await linkGuestToGoogle();
      toast(r.mode === 'linked'
        ? 'Linked. Your progress is now saved to your Google account.'
        : r.failed ? `Signed in to your existing account and moved your progress across (${r.failed} item${r.failed === 1 ? '' : 's'} could not be copied).`
          : 'Signed in to your existing account and moved your progress across.');
      if (r.mode === 'linked') setState({ user: r.user });   /* same uid: no auth event fires, refresh by hand */
    } catch (e) {
      const cancelled = e && (e.code === 'auth/popup-closed-by-user' || e.code === 'auth/cancelled-popup-request');
      msg.hidden = false; msg.className = 'keep-msg is-bad';
      msg.textContent = cancelled ? 'Cancelled. Nothing changed.'
        : e && e.code === 'auth/popup-blocked' ? 'The browser blocked the Google window. Allow pop-ups for this site and try again.'
        : 'Could not link: ' + (e && e.message ? e.message : 'unknown error') + '. Nothing was lost.';
      btn.disabled = false; btn.textContent = 'Link Google account';
    }
  });
}

/* the card disappears once the account is no longer a guest, so the result is announced on its own */
export function toast(text) {
  const t = document.createElement('div');
  t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = text;
  document.body.appendChild(t);
  requestAnimationFrame(() => t.classList.add('on'));
  setTimeout(() => { t.classList.remove('on'); setTimeout(() => t.remove(), 400); }, 6000);
}
