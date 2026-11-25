// Small constant data that doesn't belong in curriculum.js/questions.js.

// Teaching Mode's four evaluation dimensions. No AI backend exists yet
// (see features/teaching.js's header comment), so these back a real,
// clearly-labeled self-assessment rubric, not a simulated AI score.
export const TEACHING_DIMENSIONS = [
  { key: 'accuracy', label: 'Accuracy', prompt: 'Were the facts and mechanisms you stated correct?' },
  { key: 'clinicalReasoning', label: 'Clinical Reasoning', prompt: 'Did you connect the concept to how it actually presents or matters clinically?' },
  { key: 'completeness', label: 'Completeness', prompt: 'Did you cover the key concepts for this topic, or leave gaps?' },
  { key: 'confidence', label: 'Confidence & Clarity', prompt: 'Could you explain it fluently, or did you hesitate/stumble on the core idea?' },
];

export function streakMessage(current) {
  if (current === 0) return 'Start your streak today.';
  if (current < 3) return 'Good start — keep it going.';
  if (current < 7) return `${current}-day streak. Building momentum.`;
  if (current < 30) return `${current}-day streak. Real consistency.`;
  return `${current}-day streak. Exceptional discipline.`;
}
