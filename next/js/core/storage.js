// Local persistence: localStorage for small, synchronous state (the data
// here — a day list, a handful of notes, flashcard schedules — is well
// within localStorage's size and performance envelope); a minimal
// IndexedDB wrapper is also provided for anything that later needs
// larger or async-only storage (e.g. a bigger offline content cache),
// rather than reaching for it where it wouldn't add anything.
const PREFIX = 'med100:';

export function getLocal(key, fallback = null) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (error) {
    console.error(`[storage] getLocal(${key}) failed:`, error);
    return fallback;
  }
}

export function setLocal(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (error) {
    console.error(`[storage] setLocal(${key}) failed:`, error);
  }
}

export function removeLocal(key) {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch (error) {
    console.error(`[storage] removeLocal(${key}) failed:`, error);
  }
}

// --- Minimal IndexedDB key-value store (used by core/sync.js for an
// offline write-queue, which can hold more entries than is comfortable
// to keep re-serializing through localStorage on every change) --------
const DB_NAME = 'med100';
const DB_VERSION = 1;
const STORE = 'kv';

function openDb() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = () => {
      if (!req.result.objectStoreNames.contains(STORE)) {
        req.result.createObjectStore(STORE);
      }
    };
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function idbGet(key) {
  try {
    const db = await openDb();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).get(key);
      req.onsuccess = () => resolve(req.result ?? null);
      req.onerror = () => reject(req.error);
    });
  } catch (error) {
    console.error(`[storage] idbGet(${key}) failed:`, error);
    return null;
  }
}

export async function idbSet(key, value) {
  try {
    const db = await openDb();
    return await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(value, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
  } catch (error) {
    console.error(`[storage] idbSet(${key}) failed:`, error);
  }
}
