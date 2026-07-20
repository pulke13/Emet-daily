EMET DAILY - phone version (PWA)
================================

This is the Android/phone version of your Windows daily dashboard.
It is a "web app" - it runs in the browser and can be installed to your
phone's home screen so it behaves like a normal app (own icon, full screen,
works offline). No app-store or build credits needed.

There is NO build step. These are plain files - hosting them IS the build.

WHAT'S INSIDE
  index.html          - the app screen and all styling
  app.js              - all the logic (tasks, drag, reminders, AI, backup)
  manifest.webmanifest- lets the phone install it as an app
  sw.js               - makes it work offline
  icon.svg / icon-*.png - the app icons
  LICENSE             - proprietary, all rights reserved

WHAT IT DOES (same idea as the desktop app)
  - Four priority boxes: Do First / Schedule / Delegate / Eliminate, plus a Backlog
  - Add tasks (the round + button), tap a task to edit, tap the square to tick it done
  - Drag a task between boxes using the grip handle
  - Reminders with a time AND an optional date; tap the bell once to allow notifications
  - Repeat a task daily or weekly
  - Progress bar: done today / total done / streak
  - "Today" tab shows tasks due today, sorted by reminder time
  - AI Prioritize (brain icon) sorts the backlog into the matrix using Gemini
  - Settings (gear icon) holds your Gemini API key and model - stored ONLY on the phone
  - Backup icon = export / restore / clear all. The file format matches the
    desktop app's "Phone Sync", so tasks move both ways without losing anything
  - Bilingual English / Hebrew with full right-to-left layout
  - Everything is stored ON THE PHONE only

TO SEE IT ON A COMPUTER
  Open a terminal in this folder and run:
     python -m http.server 5599
  Then open  http://localhost:5599  in a browser.

TO GET IT ONTO YOUR PHONE
  It needs an HTTPS web address. Any of these work - pick one:

  A) GitHub Pages (what this repo uses)
     Free, but on a free GitHub plan the repository must be PUBLIC.
     1. Push this folder to the repository.
     2. Settings > Pages > enable it for the main branch.
     3. Open the address it gives you on your phone.
     4. Browser menu > "Add to Home Screen".

  B) Netlify Drop - simplest, no repository at all
     Go to netlify.com/drop and drag this folder in. You get a free HTTPS
     address in seconds and nothing but the running site is public.

  C) Netlify / Cloudflare Pages / Vercel - from a PRIVATE repository
     All have free tiers that deploy from a private repo, so the source
     stays hidden while the site is live. Use this if you later want the
     code kept private.

  NOTE: a web app always sends its code to the visitor's browser, so anyone
  using the app can read the JavaScript regardless of where it is hosted.
  Keep real secrets on a server, never in this folder. (The Gemini key is
  fine - each user types in their own and it stays on their phone.)

TO MAKE A REAL .APK FILE (optional, also free)
  Once it has an HTTPS address, paste that address into
  https://www.pwabuilder.com and it will build an Android APK for you.
  PWABuilder only needs a public web ADDRESS - the repository can be private.
  This does NOT use your Expo/EAS credits.

AFTER CHANGING ANY FILE
  Bump the cache name at the top of sw.js (emet-daily-vNN) so installed
  phones pick up the new version instead of the cached old one.

DESKTOP-ONLY FEATURES LEFT OUT ON PURPOSE
  System tray, always-on-top, custom/recorded alarm sounds, Word export,
  Zen mode, the numbered 1-10 Today boxes, and the calendar view.
  These are mouse/Windows workflows that do not suit a phone.
