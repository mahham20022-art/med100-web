// Small shared set of inline stroke icons (24x24, matches the style of the
// nav icons in index.html) used to give dashboard tiles a real glyph
// instead of text-only buttons.
const ICONS = {
  challenge: '<path d="M8 4h8v3a4 4 0 0 1-4 4 4 4 0 0 1-4-4V4Z"/><path d="M8 5H5a2 2 0 0 0 0 4h1"/><path d="M16 5h3a2 2 0 0 1 0 4h-1"/><path d="M12 11v3"/><path d="M9 20h6"/><path d="M10 17h4l.5 3h-5l.5-3Z"/>',
  topics: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15.5a1 1 0 0 1-1 1H6.5A2.5 2.5 0 0 0 4 22"/><path d="M4 5.5A2.5 2.5 0 0 0 6.5 8H19"/>',
  mcq: '<rect x="6" y="3.5" width="12" height="17" rx="2"/><path d="M9 3.5V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v.5"/><path d="m9 12.5 2 2 4-4"/>',
  teaching: '<circle cx="12" cy="7" r="3"/><path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7"/><path d="M3 14.5 12 11l9 3.5"/>',
  review: '<path d="M3 12a9 9 0 1 1 3 6.7"/><path d="M3 17v-4h4"/>',
  notes: '<path d="M5 4h10l4 4v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z"/><path d="M15 4v4h4"/><path d="M8 13h8M8 17h5"/>',
  analytics: '<path d="M4 20V10M11 20V4M18 20v-7"/>',
  profile: '<circle cx="12" cy="8" r="3.5"/><path d="M4.5 20c1.5-4 4.2-6 7.5-6s6 2 7.5 6"/>',
};

export function icon(name) {
  const body = ICONS[name] || '';
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;
}
