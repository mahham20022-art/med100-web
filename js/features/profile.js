import { state, subscribe } from '../state.js';
import { esc } from '../core/dom.js';
import { guestLinkCard, wireGuestLink } from './guest-link.js';

export function renderProfile(root, { onSignOut }) {
  const paint = () => {
    const user = state.user;
    const isGuest = user?.isAnonymous;
    root.innerHTML = `
      <div class="page-heading">
        <span class="page-eyebrow">ACCOUNT</span>
        <h2>Your profile</h2>
      </div>
      ${isGuest ? guestLinkCard({ dismissible: false }) : ''}
      <div class="card">
        <div class="profile-row"><span>Account</span><span>${isGuest ? 'Guest (this browser only)' : esc(user?.email || '—')}</span></div>
        <div class="profile-row"><span>Days written</span><span>${state.completedDays.length} / 100</span></div>
        <div class="profile-row"><span>About Med100</span><a href="#/about">What it is, and is not</a></div>
        <div class="profile-row" style="border-bottom:none"><span>Published by</span><a href="https://thetract.org" target="_blank" rel="noopener">The Tract</a></div>
      </div>
      <div data-out>
        <button id="btn-signout" class="btn btn-outline">Sign out</button>
      </div>`;
    wireGuestLink(root);
    root.querySelector('#btn-signout').addEventListener('click', () => {
      if (!isGuest) { onSignOut(); return; }
      /* a guest who signs out cannot come back to the same progress: say so first */
      root.querySelector('[data-out]').innerHTML = `
        <div class="error-banner" role="alert"><strong>Signing out as a guest deletes your access to this progress.</strong> There is no way back into a guest account. Link Google above to keep it.</div>
        <button id="btn-signout-sure" class="btn btn-outline">Sign out and lose my progress</button>`;
      root.querySelector('#btn-signout-sure').addEventListener('click', onSignOut);
    });
  };
  paint();
  return subscribe(() => { if (!root.querySelector('[data-out] .error-banner') && !root.querySelector('[data-msg]:not([hidden])')) paint(); });
}
