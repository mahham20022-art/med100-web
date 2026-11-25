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
