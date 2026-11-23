# Med100 Web

100-day medical study challenge — web edition. One file, `index.html` —
markup, styles, and all logic inline. No build step, no separate files to
fetch. Firebase's JS SDK loads directly from Google's CDN inside the page.
Edit `index.html` and push; GitHub Actions deploys on every push to `main`,
live within about a minute.

This is a lightweight companion to the main Med100 app (native Android/iOS,
separate repository) — a quick way to preview auth and the 100-day progress
ring from any browser. It does not include native-only capabilities (local
offline sync, push notifications, in-app purchases) — those live in the
native app.

## Files
- `index.html` — the whole app (markup, styles, script)
- `manifest.webmanifest` — PWA metadata
- `icons/` — app icons

## Firebase
`index.html` points at the existing `med100-production` project's
registered web app — no build-time config step needed.

**One-time step:** add this site's domain (`<you>.github.io`) to Firebase
Console → Authentication → Settings → **Authorized domains**, or sign-in
fails with `auth/unauthorized-domain`.

Firestore layout: `users/{uid}/challengeProgress/state` → `{ completedDays:
[...] }` — the same path/shape the native app uses, so progress is shared
across both on the same account. Notes use their own simpler shape under
`users/{uid}/notes/{id}` (not the native app's richer Note schema). Security
Rules are shared with the native project (client-agnostic) — never switch
this project to test-mode rules.

## Deploy
Automatic on every push to `main` via `.github/workflows/deploy.yml` — no
build, just the files as they are. Repo → Settings → Pages → Source:
**GitHub Actions** (one-time).

Live at `https://<you>.github.io/med100-web/`.

## Roadmap
- [x] Auth (Google + Guest), 100-day challenge ring
- [x] Topics outline, Progress/streaks, Notes, Profile
- [ ] Teaching mode + AI
