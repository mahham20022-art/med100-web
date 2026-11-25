// Med100 moved from mahham20022-art.github.io/med100-web to
// med100.thetract.org. Browser storage (including a guest's Firebase
// session) belongs to one address, so a guest moving over would start
// from zero. On the old address we export the guest's data and carry it
// in the URL fragment (never sent to any server); the new address picks
// it up, signs the visitor in as a guest again and writes it back.
import { exportUserData, importUserData } from './sync.js';

export const NEW_ORIGIN = 'https://med100.thetract.org';
export const ON_OLD_HOST = /\.github\.io$/.test(location.hostname);
const KEY = 'med100_move';
const MAX = 400000;

const b64url = (s) => btoa(unescape(encodeURIComponent(s))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const unb64url = (s) => decodeURIComponent(escape(atob(s.replace(/-/g, '+').replace(/_/g, '/'))));
// Firestore Timestamps -> plain ms numbers, so they survive JSON.
const plain = (v) => (v && typeof v.toMillis === 'function') ? v.toMillis()
  : Array.isArray(v) ? v.map(plain)
  : (v && typeof v === 'object') ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, plain(x)])) : v;

function notice() {
  const el = document.createElement('div');
  el.setAttribute('role', 'status');
  el.style.cssText = 'position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:#FAF6EF;color:#161A22;font:500 16px/1.5 Inter,system-ui,sans-serif;text-align:center;padding:24px';
  el.innerHTML = '<div><div style="font:700 22px Inter,system-ui,sans-serif;margin-bottom:6px">Med100 has a new home</div>Moving you to <b>med100.thetract.org</b> with your progress…</div>';
  document.body.appendChild(el);
}

// Old host: called once auth has settled. Never returns if it redirects.
export async function moveFromOldHost(user) {
  const go = (frag) => location.replace(NEW_ORIGIN + '/' + (frag || location.hash || ''));
  notice();
  if (!user || !user.isAnonymous) return go();
  let data = null;
  try { data = plain(await exportUserData(user.uid)); } catch (e) { console.warn('export failed', e); }
  const has = data && ((data.progress.completedDays || []).length || data.notes.length || data.quizAttempts.length || data.teachingSessions.length || data.flashcardSchedule.length);
  if (!has) return go();
  const enc = b64url(JSON.stringify(data));
  return go(enc.length < MAX ? '#move=' + enc : '');
}

// New host: call before the router starts. Returns true when a move is pending.
export function takeIncomingMove() {
  if (location.hash.startsWith('#move=')) {
    try { sessionStorage.setItem(KEY, location.hash.slice(6)); } catch { /* private mode */ }
    history.replaceState(null, '', location.pathname + location.search + '#/dashboard');
  }
  try { return !!sessionStorage.getItem(KEY); } catch { return false; }
}

export async function finishIncomingMove(uid) {
  let raw = null;
  try { raw = sessionStorage.getItem(KEY); sessionStorage.removeItem(KEY); } catch { return null; }
  if (!raw) return null;
  try { return await importUserData(uid, JSON.parse(unb64url(raw))); } catch (e) { console.warn('move import failed', e); return { ok: 0, failed: 1 }; }
}
