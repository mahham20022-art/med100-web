import { state } from '../state.js';
import { esc } from '../core/dom.js';

export function renderProfile(root, { onSignOut }) {
  const user = state.user;
  const isGuest = user?.isAnonymous;
  root.innerHTML = `
    <div class="card">
      <div class="profile-row"><span style="color:var(--color-text-secondary);">Account</span><span>${isGuest ? 'Guest' : esc(user?.email || '—')}</span></div>
      <div class="profile-row"><span style="color:var(--color-text-secondary);">User ID</span><span style="font-size:var(--fs-xs);color:var(--color-text-secondary);">${esc(user?.uid || '')}</span></div>
      ${isGuest ? `<div class="profile-row" style="border-bottom:none;"><span style="color:var(--color-text-secondary);font-size:var(--fs-sm);">Guest progress is tied to this browser only — sign in with Google to keep it across devices.</span></div>` : ''}
    </div>
    <button id="btn-signout" class="btn btn-outline">Sign Out</button>
  `;
  root.querySelector('#btn-signout').addEventListener('click', onSignOut);
}
