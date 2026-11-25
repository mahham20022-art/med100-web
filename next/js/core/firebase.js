// Firebase bootstrap. Everything here is dynamically imported, not a
// static top-level `import` — a static import of an unreachable CDN URL
// fails atomically before ANY of this app's own code runs (not even a
// try/catch), permanently stranding the page. Dynamic import() inside
// init()'s try/catch degrades to a real, recoverable error instead.
// (Found the hard way building an earlier version of this same app.)
const SDK_VERSION = '11.9.1';
const CDN = `https://www.gstatic.com/firebasejs/${SDK_VERSION}`;

// Real config for the "med100 (web)" app already registered under the
// med100-production Firebase project — the same project the native
// Android/iOS app uses. Web API keys are identifiers, not secrets;
// the real security boundary is Firestore Security Rules, not hiding
// this object.
const firebaseConfig = {
  apiKey: 'AIzaSyCAUIrheK1hRTrgpbhCHZlkNuKFr118N60',
  authDomain: 'med100-production.firebaseapp.com',
  projectId: 'med100-production',
  storageBucket: 'med100-production.firebasestorage.app',
  messagingSenderId: '136449767934',
  appId: '1:136449767934:web:91ea2965e1288074d428af',
  measurementId: 'G-CBME9BL5E8',
};

let _auth = null;
let _db = null;
let _sdk = null; // { authFns, storeFns } — the imported SDK function bags

export async function initFirebase() {
  const [{ initializeApp }, authMod, storeMod] = await Promise.all([
    import(`${CDN}/firebase-app.js`),
    import(`${CDN}/firebase-auth.js`),
    import(`${CDN}/firebase-firestore.js`),
  ]);
  const app = initializeApp(firebaseConfig);
  _auth = authMod.getAuth(app);
  _db = storeMod.getFirestore(app);
  _sdk = { auth: authMod, store: storeMod };
  return { auth: _auth, db: _db, sdk: _sdk };
}

export function getAuthInstance() {
  if (!_auth) throw new Error('Firebase not initialized yet');
  return _auth;
}

export function getDb() {
  if (!_db) throw new Error('Firebase not initialized yet');
  return _db;
}

export function getSdk() {
  if (!_sdk) throw new Error('Firebase not initialized yet');
  return _sdk;
}
