EMET DAILY - phone version (PWA)
================================

This is the Android/phone version of your Windows daily dashboard.
It is a "web app" - it runs in the browser and can be installed to your
phone's home screen so it behaves like a normal app (own icon, full screen,
works offline). No app-store or build credits needed.

WHAT'S INSIDE
  index.html          - the app screen
  app.js              - all the logic (tasks, drag, reminders, backup)
  manifest.webmanifest- lets the phone install it as an app
  sw.js               - makes it work offline
  icon.svg            - the app icon

WHAT IT DOES (same idea as the desktop app)
  - Four priority boxes: Do First / Schedule / Delegate / Eliminate, plus a Backlog
  - Add tasks (the round + button), tap a task to edit, tap the square to tick it done
  - Drag a task between boxes using the little grip handle on the right
  - Set a reminder time; tap the bell once to allow notifications
  - "Today" tab shows tasks sorted by their reminder time
  - Save icon (top right) = export a backup file / restore / clear all
  - Everything is stored ON THE PHONE only

TO SEE IT ON A COMPUTER
  Open a terminal in this folder and run:
     python -m http.server 5599
  Then open  http://localhost:5599  in a browser.

TO GET IT ONTO YOUR PHONE (free, no build credits)
  Easiest reliable way is free HTTPS hosting via GitHub Pages:
   1. Put this folder in a GitHub repository.
   2. Turn on "Pages" for that repo (Settings > Pages).
   3. Open the address it gives you on your phone's browser.
   4. Use the browser menu > "Add to Home Screen".
  That gives you the installed, offline app with its own icon.

TO MAKE A REAL .APK FILE (optional, also free)
  Once it's on a GitHub Pages web address, paste that address into
  https://www.pwabuilder.com  and it will build an Android APK for you
  to download and install. This does NOT use your Expo/EAS credits.

DESKTOP-ONLY FEATURES LEFT OUT ON PURPOSE
  System tray, always-on-top, Windows alarm sound, Word export, Zen mode.
  These don't apply to a phone.
