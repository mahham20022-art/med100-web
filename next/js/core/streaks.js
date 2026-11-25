export function computeStreaks(completedDays) {
  const sorted = [...new Set(completedDays)].sort((a, b) => a - b);
  let longest = 0, run = 0, prev = null;
  for (const day of sorted) {
    run = prev !== null && day === prev + 1 ? run + 1 : 1;
    longest = Math.max(longest, run);
    prev = day;
  }
  let current = 0;
  if (sorted.length) {
    current = 1;
    for (let i = sorted.length - 1; i > 0; i--) {
      if (sorted[i] - sorted[i - 1] === 1) current++;
      else break;
    }
  }
  return { longest, current, total: sorted.length, sorted };
}
