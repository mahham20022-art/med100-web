# Med100 Web

100-day medical study challenge — web edition (Flutter Web + Firebase + GitHub Pages).

This is a lightweight companion to the main Med100 app (native Android/iOS,
in a separate repository) — a quick way to preview and test parts of the
product from any browser. It intentionally does not include native-only
capabilities (local SQLite sync, push notifications, in-app purchases,
crash reporting) — those live in the native app.

## Architecture
- `lib/app/` — router, theme
- `lib/core/` — web-safe Firebase wiring (no plugins without web support —
  `firebase_crashlytics`, notably, has none)
- `lib/features/` — one folder per feature: `auth`, `challenge` (starter)

## Setup
```bash
flutter pub get
flutter run -d chrome
```

Firebase config in `lib/firebase_options.dart` points at the existing
`med100-production` project's registered web app — no `flutterfire configure`
needed unless that app is ever re-registered.

**One-time Firebase step:** add this site's domain (`<you>.github.io`) to
Firebase Console → Authentication → Settings → **Authorized domains**, or
sign-in will fail with `auth/unauthorized-domain`.

## Deploy to GitHub Pages (automatic)
Every push to `main` builds and deploys via `.github/workflows/deploy.yml`.

One-time setup: repo → **Settings → Pages** → Source: **GitHub Actions**.

Live at `https://<you>.github.io/med100-web/` after the first successful run.

## Web-first decisions (locked)
- No Crashlytics, no local SQLite — Firestore persistence only.
- No service worker registered (see `web/flutter_bootstrap.js`) — avoids
  stale cached builds while this iterates.
- Push notifications deferred (Web Push needs a backend + VAPID — Phase 2).

## Roadmap
- [x] Auth (Google + Guest), router, theme, 100-day challenge ring
- [ ] Topics / daily content viewer
- [ ] Progress + streaks
- [ ] Notes (Firestore-backed)
- [ ] Teaching mode + AI (Cloud Functions proxy)
- [ ] RevenueCat web paywall (Phase 2 — needs Stripe)

## Security note
Firestore Security Rules are shared with the native project (client-agnostic)
— never switch this project to test-mode rules.

