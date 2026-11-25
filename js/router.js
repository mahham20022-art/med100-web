// Hash-based routing — deliberately, not History API pushState: GitHub
// Pages serves static files with no server-side rewrite rule, and a
// hash fragment is never sent to the server at all, so `/med100-web/#/topic/12`
// surviving a hard refresh needs zero extra config (no 404.html redirect
// trick, no base-path juggling). Trades pretty URLs for "just works".
const routes = [];
let notFoundHandler = () => {};
let currentCleanup = null;

export function route(pattern, handler) {
  // pattern: '/topics' or '/topic/:id' — ':name' segments become params.
  const paramNames = [];
  const regex = new RegExp(
    '^' +
      pattern
        .split('/')
        .map((seg) => {
          if (seg.startsWith(':')) {
            paramNames.push(seg.slice(1));
            return '([^/]+)';
          }
          return seg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        })
        .join('/') +
      '$',
  );
  routes.push({ regex, paramNames, handler });
}

export function notFound(handler) {
  notFoundHandler = handler;
}

function currentPath() {
  const hash = location.hash.slice(1); // drop '#'
  return hash.startsWith('/') ? hash : '/' + hash;
}

async function resolve() {
  const path = currentPath().split('?')[0];
  if (typeof currentCleanup === 'function') {
    try {
      currentCleanup();
    } catch (error) {
      console.error('[router] cleanup failed:', error);
    }
    currentCleanup = null;
  }
  // GoatCounter (The Tract's privacy-friendly counter, no cookies): one hit per screen.
  countView(path);
  for (const r of routes) {
    const match = r.regex.exec(path);
    if (match) {
      const params = {};
      r.paramNames.forEach((name, i) => (params[name] = decodeURIComponent(match[i + 1])));
      const cleanup = await r.handler(params);
      if (typeof cleanup === 'function') currentCleanup = cleanup;
      return;
    }
  }
  notFoundHandler();
}

export function navigate(path) {
  if (currentPath() === path) {
    resolve();
  } else {
    location.hash = '#' + path;
  }
}

export function startRouter(defaultPath = '/dashboard') {
  window.addEventListener('hashchange', resolve);
  if (!location.hash || location.hash === '#') {
    location.hash = '#' + defaultPath;
  } else {
    resolve();
  }
}

export function currentRoutePath() {
  return currentPath().split('?')[0];
}

function countView(path, tries = 0) {
  if (/\.github\.io$/.test(location.hostname) || location.hostname === 'localhost') return;
  try {
    if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: 'med100' + path, title: 'Med100 ' + path });
    else if (tries < 6) setTimeout(() => countView(path, tries + 1), 700);   /* count.js still loading */
  } catch (e) { /* counter blocked */ }
}
