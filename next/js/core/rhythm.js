// The rhythm strip: Med100's signature. The 100 days are drawn as ECG
// paper, one large box per day. A completed day carries a beat, a
// skipped day a flat line, today a red write-head, and the days ahead
// are blank paper. Read row by row it is the learner's own rhythm.
// Pure SVG string; no state of its own.

const CELL = 50;            // one large ECG box per day (5 x 5 small boxes)
const BASE = 31;            // isoelectric line inside a cell

function beat(x, y0, amp, k = 1) {
  // P, QRS, T inside one box (50 units wide x k), from baseline on the left.
  const y = y0 + BASE, r = 22 * amp, X = (u) => (x + u * k).toFixed(1);
  return [
    `L${X(7)},${y}`,
    `C${X(9)},${y - 5} ${X(13)},${y - 5} ${X(15)},${y}`,              // P
    `L${X(18.5)},${y}`, `L${X(19.6)},${y + 3}`,                         // Q
    `L${X(22)},${(y - r).toFixed(1)}`, `L${X(24.6)},${y + 8}`, `L${X(26.4)},${y}`, // R, S
    `L${X(31)},${y}`,
    `C${X(34)},${y - 7.5} ${X(40)},${y - 7.5} ${X(43)},${y}`,           // T
    `L${X(50)},${y}`,
  ].join(' ');
}

function pad(n) { return String(n).padStart(2, '0'); }

/**
 * @param {object} o
 * @param {number[]} o.completed  day numbers completed
 * @param {number[]} [o.skipped]  day numbers skipped
 * @param {number} o.today        the next day to study (1..100), or 0 when done
 * @param {number} [o.cols=10]    days per row
 * @param {boolean} [o.animate=true]
 * @param {string} [o.id]         unique id for the SVG patterns
 */
export function rhythmStrip({ completed, skipped = [], today, cols = 10, animate = true, id = 'rs', maxRows = 0 }) {
  const done = new Set(completed), skip = new Set(skipped);
  const allRows = Math.ceil(100 / cols);
  const lastDay = Math.max(today || 0, ...completed, 1);
  const rows = maxRows ? Math.min(allRows, Math.max(maxRows, Math.ceil(lastDay / cols) + 1)) : allRows;
  const hiddenDays = 100 - rows * cols;
  const gutter = 30, W = gutter + cols * CELL, H = rows * CELL;
  let grid = '', traces = '', flats = '', labels = '', links = '', head = '';

  for (let r = 0; r < rows; r++) {
    let d = '', f = '';
    for (let c = 0; c < cols; c++) {
      const day = r * cols + c + 1;
      if (day > 100) break;
      const x = gutter + c * CELL, y0 = r * CELL;
      if (done.has(day)) {
        const amp = 0.78 + ((day * 37) % 23) / 100;      // small, stable variation
        d += (d ? ' ' : '') + `M${x},${y0 + BASE} ` + beat(x, y0, amp);
      } else if (skip.has(day) || (day < today && !done.has(day))) {
        f += ` M${x},${y0 + BASE} L${x + CELL},${y0 + BASE}`;
      }
      if (day <= today || done.has(day)) {
        links += `<a href="#/topic/${day}" aria-label="Day ${day}"><rect x="${x}" y="${y0}" width="${CELL}" height="${CELL}" fill="transparent"/></a>`;
      }
      if (day === today) {
        head = `<g class="rs-head" transform="translate(${x},${y0})">` +
          `<rect x="0.5" y="0.5" width="${CELL - 1}" height="${CELL - 1}" class="rs-today"/>` +
          `<line x1="3" y1="${BASE}" x2="15" y2="${BASE}" class="rs-head-line"/>` +
          `<circle cx="15" cy="${BASE}" r="3.2" class="rs-head-dot"/>` +
          `<text x="${CELL - 4}" y="11" text-anchor="end" class="rs-today-n">${pad(day)}</text></g>`;
      }
    }
    if (d) traces += `<path class="rs-trace" style="--r:${r}" pathLength="1" d="${d}"/>`;
    if (f) flats += `<path class="rs-flat" d="${f.trim()}"/>`;
    labels += `<text x="${gutter - 7}" y="${r * CELL + BASE + 3.5}" text-anchor="end" class="rs-label">${pad(r * cols + 1)}</text>`;
  }

  grid = `<defs>
    <pattern id="${id}-m" width="10" height="10" patternUnits="userSpaceOnUse" x="${gutter}"><path d="M10 0V10H0" class="rs-minor"/></pattern>
    <pattern id="${id}-M" width="${CELL}" height="${CELL}" patternUnits="userSpaceOnUse" x="${gutter}"><rect width="${CELL}" height="${CELL}" fill="url(#${id}-m)"/><path d="M${CELL} 0V${CELL}H0" class="rs-major"/></pattern>
  </defs>
  <rect x="${gutter}" y="0" width="${cols * CELL}" height="${H}" fill="url(#${id}-M)" class="rs-paper"/>
  <path d="M${gutter} 0.5H${W}M${gutter + 0.5} 0V${H}" class="rs-major"/>`;

  const more = hiddenDays > 0 ? `<p class="rs-more">+ ${hiddenDays} days of blank paper ahead</p>` : '';
  return `<div class="rs-box ${maxRows ? 'is-cropped' : ''}"><svg class="rhythm-strip ${animate ? 'is-animated' : ''}" viewBox="0 0 ${W} ${H}" role="img"
    aria-label="${done.size} of 100 days completed${today ? `; today is day ${today}` : ''}">
    ${grid}${labels}<g class="rs-flats">${flats}</g><g class="rs-traces">${traces}</g>${head}<g class="rs-links">${links}</g></svg>${more}</div>`;
}

// A single short strip for the splash and empty states.
export function beatLine(width = 300, beats = 4) {
  const step = width / beats, k = step / CELL;
  let d = `M0,${BASE}`;
  for (let i = 0; i < beats; i++) d += ' ' + beat(i * step, 0, 1, k);
  return d;
}
