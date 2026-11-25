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
