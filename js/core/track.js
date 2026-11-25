// GoatCounter events for Med100 (no cookies): med100/ev/<name>.
export function track(name) {
  if (/\.github\.io$/.test(location.hostname) || location.hostname === 'localhost') return;
  try { if (window.goatcounter && window.goatcounter.count) window.goatcounter.count({ path: 'med100/ev/' + name, title: 'Med100: ' + name, event: true }); } catch (e) { /* blocked */ }
}
