import { getAuthInstance, getSdk } from './firebase.js';

export function onAuthChange(callback) {
  const { auth: authFns } = getSdk();
  return authFns.onAuthStateChanged(getAuthInstance(), callback);
}

export async function signInWithGoogle() {
  const { auth: authFns } = getSdk();
  const provider = new authFns.GoogleAuthProvider();
  const cred = await authFns.signInWithPopup(getAuthInstance(), provider);
  return cred.user;
}

export async function signInAsGuest() {
  const { auth: authFns } = getSdk();
  const cred = await authFns.signInAnonymously(getAuthInstance());
  return cred.user;
}

export async function signOutUser() {
  const { auth: authFns } = getSdk();
  await authFns.signOut(getAuthInstance());
}

export function currentUser() {
  return getAuthInstance().currentUser;
}

/**
 * Keep a guest's progress by attaching Google to the same anonymous
 * account (same uid, nothing to copy). If that Google account already
 * uses Med100, Firebase refuses the link; we then copy the guest's data
 * into that account and sign in there.
 * Returns { mode: 'linked' | 'merged', user, failed }.
 */
export async function linkGuestToGoogle() {
  const { auth: A } = getSdk();
  const auth = getAuthInstance();
  const guest = auth.currentUser;
  if (!guest || !guest.isAnonymous) throw new Error('Not signed in as a guest.');
  const provider = new A.GoogleAuthProvider();
  try {
    const cred = await A.linkWithPopup(guest, provider);
    await cred.user.reload?.();
    return { mode: 'linked', user: auth.currentUser || cred.user, failed: 0 };
  } catch (e) {
    if (e && (e.code === 'auth/credential-already-in-use' || e.code === 'auth/email-already-in-use')) {
      const credential = A.GoogleAuthProvider.credentialFromError(e);
      if (!credential) throw e;
      const { exportUserData, importUserData } = await import('./sync.js');
      const data = await exportUserData(guest.uid);           /* read while still the guest */
      const res = await A.signInWithCredential(auth, credential);
      const { failed } = await importUserData(res.user.uid, data);
      return { mode: 'merged', user: res.user, failed };
    }
    throw e;
  }
}
