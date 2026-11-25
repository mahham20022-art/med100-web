// Days 19-100. Each specialty lives in its own file so specialist
// reviewers can be sent exactly their part (see scripts/review-pack).
// Days are interleaved across specialties in a fixed round-robin so a
// learner never spends a fortnight on one system. Every day starts as
// review: { status: 'unreviewed' } until a named clinician signs it off.
import cardiology from './cardiology.js';
import pulmonology from './pulmonology.js';
import nephrology from './nephrology.js';
import endocrinology from './endocrinology.js';
import neurology from './neurology.js';
import infectious from './infectious.js';
import gastro from './gastro.js';
import rheumatology from './rheumatology.js';
import haematology from './haematology.js';
import psychiatry from './psychiatry.js';
import obgyn from './obgyn.js';
import emergency from './emergency.js';

const GROUPS = [cardiology, pulmonology, nephrology, endocrinology, neurology, infectious,
  gastro, rheumatology, haematology, psychiatry, obgyn, emergency].map((g) => g.slice());

const ordered = [];
while (GROUPS.some((g) => g.length)) for (const g of GROUPS) if (g.length) ordered.push(g.shift());

export const LATER_DAYS = ordered.map((d, i) => {
  const { questions, ...day } = d;
  return { day: 19 + i, review: d.review || { status: 'unreviewed' }, ...day };
});

export const LATER_QUESTIONS = Object.fromEntries(ordered.map((d) => [
  d.topicId,
  d.questions.map((q, i) => ({ id: `q${i + 1}`, ...q })),
]));
