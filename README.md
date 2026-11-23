# Med100 Web

A structured 100-day medical learning journey — "Master medicine, one day
at a time." Web companion to the native Med100 app (Android/iOS, separate
repository, same Firebase project), built as a real modular web
application: HTML5, modern CSS, vanilla JavaScript (ES modules), Firebase
Web SDK. No build step, no framework, no bundler — deploys straight to
GitHub Pages on every push to `main`.

## Why no framework
Static-first by design: every file here is served as-is by GitHub Pages.
Firebase's SDK is dynamically imported from Google's CDN at runtime (see
`js/core/firebase.js`'s header comment for exactly why that's a dynamic
`import()` inside a `try/catch`, not a static one) — the one external
dependency, and it degrades to a real, visible error screen if unreachable
rather than a silently blank page.

## Architecture
```
index.html                 the shell: header, bottom nav, loading/auth screens
sw.js                       service worker — network-first (see its header comment)
manifest.webmanifest
css/
  tokens.css                color/type/spacing tokens — the single source of truth
  base.css, layout.css, components.css, responsive.css
js/
  app.js                     entry point: Firebase init, auth wiring, route table
  router.js                  hash-based router (works on GitHub Pages with zero config)
  state.js                   tiny pub/sub store
  core/
    firebase.js, auth.js, sync.js, storage.js, dom.js, streaks.js
  features/
    dashboard.js, challenge.js, topics.js, mastery.js,
    teaching.js, reviews.js, notes.js, analytics.js, profile.js
  data/
    curriculum.js            the 100-day outline (real content for some days, see below)
    questions.js             curated MCQ bank
    demo-data.js             small constants (teaching rubric, streak copy)
```

## Firebase — real schema, not invented
Every Firestore path/field here was read directly from the native app's
`firestore.rules` and its Dart data sources, not guessed:

| Data | Path | Notes |
|---|---|---|
| Challenge progress | `users/{uid}/challengeProgress/state`, field `completedDays` | Same path the native app writes — progress is genuinely shared on the same account |
| Spaced repetition | `users/{uid}/flashcardSchedule/{id}` | Matches the native app's fixed 7/30/90-day ladder, not a from-scratch SM-2 design |
| Quiz attempts | `users/{uid}/quizAttempts/{id}` | Append-only per Security Rules (create only, no update/delete) |
| Teaching sessions | `users/{uid}/teachingSessions/{id}` | Append-only, same field shape as the native app |
| Notes | `users/{uid}/notes/{id}` | Own simple shape (`text`, `createdAt`) — **not** schema-compatible with the native app's richer Notes feature |

**Known limitation:** the native app writes `challengeProgress/state` with a
plain (non-merge) `.set()` from its own offline-first database as source of
truth. If the same account studies on both native and web, whichever side
syncs last wins for that one document — there's no conflict-resolution
layer. Fine for "mostly one device at a time"; real multi-device
reconciliation would need a Cloud Function.

**One-time Firebase step:** add this site's domain (`<you>.github.io`) to
Firebase Console → Authentication → Settings → **Authorized domains**, or
sign-in fails with `auth/unauthorized-domain`.

## What's real vs. explicitly not faked
- **Topics/MCQs/flashcards server content** (`topics`, `mcqs`, `flashcards`,
  `learningPaths` Firestore collections): public-read, server-write-only,
  and currently **empty** — no Cloud Function has ever populated them (the
  Editorial publish pipeline needs one, which needs the Blaze plan, not yet
  upgraded). This app ships its own curated content in `js/data/` instead of
  pretending to read from those.
- **Curriculum content**: real, written content exists for a first set of
  days across several systems (`js/data/curriculum.js`); every other day in
  the 1–100 range is an explicit `comingSoon` stub the UI labels honestly,
  not filler text presented as finished.
- **AI Mastery Mode / Teaching Mode evaluation**: no secure server-side AI
  endpoint exists (and never put an AI API key in frontend JS — that's a
  real security hole). Mastery Mode uses a real curated MCQ bank; Teaching
  Mode uses a genuine, clearly-labeled **self-assessment rubric**, not a
  simulated AI score. The integration boundary for real AI later is
  documented in both files' header comments.
- **Payments**: no checkout button exists this release. No fake purchase
  flow, nothing that pretends RevenueCat's native subscriptions work on a
  web page.
- **Voice input** in Teaching Mode uses the browser's native
  `SpeechRecognition` API where supported (feature-detected; the button
  simply doesn't appear where it isn't, e.g. Safari) — not a server
  transcription service.

## Deploy
Automatic on every push to `main` via `.github/workflows/deploy.yml` — no
build step, the repo's files are uploaded to Pages as-is. One-time setup:
repo → **Settings → Pages** → Source: **GitHub Actions**.

Live at `https://<you>.github.io/med100-web/`.

## Testing performed
Every feature (auth, dashboard, challenge completion, topic detail, MCQ
flow with real grading, teaching self-assessment, spaced-repetition
flip/grade, notes CRUD, progress stats, sign-out) was exercised end-to-end
in a headless browser against a mocked Firebase SDK (the real `gstatic.com`
CDN isn't reachable from the build sandbox), confirming the actual app
logic renders and behaves correctly — not just that the homepage looks
right. It has not yet been tested against the real Firebase backend on a
real device; that's the next real-world verification step.
