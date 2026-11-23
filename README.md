# Med100 Web

100-day medical study challenge — web edition. Plain HTML/CSS/JS, no build
step, no framework — Firebase's JS SDK loaded directly from Google's CDN as
ES modules. Edit `index.html` / `app.js` directly and push; GitHub Actions
deploys on every push to `main`, live within about a minute.

This is a lightweight companion to the main Med100 app (native Android/iOS,
separate repository) — a quick way to preview auth and the 100-day progress
ring from any browser. It does not include native-only capabilities (local
offline sync, push notifications, in-app purchases) — those live in the
native app.

## Files
- `index.html` — markup + styles (login screen, challenge screen)
- `app.js` — all logic: Firebase init, auth, Firestore read/write
- `manifest.webmanifest` — PWA metadata
- `icons/` — app icons

## Firebase
`app.js` points at the existing `med100-production` project's registered
web app — no build-time config step needed.

**One-time step:** add this site's domain (`<you>.github.io`) to Firebase
Console → Authentication → Settings → **Authorized domains**, or sign-in
fails with `auth/unauthorized-domain`.

Firestore layout: `users/{uid}/challenge/progress` → `{ doneDays: [...] }`.
Security Rules are shared with the native project (client-agnostic) — never
switch this project to test-mode rules.

## Deploy
Automatic on every push to `main` via `.github/workflows/deploy.yml` — no
build, just the files as they are. Repo → Settings → Pages → Source:
**GitHub Actions** (one-time).

Live at `https://<you>.github.io/med100-web/`.

## Roadmap
- [x] Auth (Google + Guest), 100-day challenge ring
- [ ] Topics / daily content viewer
- [ ] Progress + streaks
- [ ] Notes
- [ ] Teaching mode + AI
