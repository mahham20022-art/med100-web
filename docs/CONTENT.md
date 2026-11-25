# Writing and reviewing Med100 content

Med100 is studied by students and trainees, so content follows one rule: **nothing is called reviewed until a clinician has checked it against named sources.**

## Every written day in `js/data/curriculum.js` carries

```js
review: { status: 'unreviewed' },          // or 'reviewed'
sources: [],                                 // [{ label, url }]
```

A reviewed day looks like:

```js
review: { status: 'reviewed', by: 'Dr Name, specialty', date: '2026-12-01' },
sources: [
  { label: '2023 ESC Heart Failure Guidelines (McDonagh et al., Eur Heart J)', url: 'https://doi.org/...' },
],
```

`npm`-free check: `node scripts/validate-static.mjs` fails if a day has no review status, or if a day marked reviewed has no reviewer, no date or no source. It also prints how many written days are reviewed.

## The workflow for each batch

1. **Draft** the days with `review.status: 'unreviewed'`. Every clinical statement must be traceable to a source listed in `sources`: a current guideline, a major textbook chapter or a primary paper. No uncited numbers (thresholds, doses, percentages).
2. **Review** by a clinician in that specialty (neurology content by the editor; cardiology, respiratory, renal and others by a colleague in that field, or at least line-by-line against the listed guideline). Corrections go in the text, not in a side note.
3. **Sign off**: set `status: 'reviewed'`, `by`, `date`. Only then does the topic page show "Clinically reviewed".
4. Unreviewed days stay visible but carry a notice on the page asking the reader to check against current guidelines, and link to `#/about`.

## What the app shows

- Topic page: review status under the title; a **Sources** section when sources exist.
- `#/about`: what Med100 is and is not (study aid, not medical advice; question bank not a validated exam; Teaching Mode is self-assessed).

## Review packs

Days 19-100 live in `js/data/days/<specialty>.js`; day order is a round-robin across specialties (`js/data/days/index.js`). To print one review PDF per specialty for outside reviewers:

    node scripts/review-pack/export.mjs > /tmp/med100.json
    python3 scripts/review-pack/build.py /tmp/med100.json out/

Review is done by the editor (Dr Mohamed Najm); no outside reviewers are named. After checking a day against its sources, apply corrections in the specialty file and set `review: { status: 'reviewed', by: 'Dr Mohamed Najm', date }` on it (validation enforces the fields).
