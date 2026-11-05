# Ask SFS — student app, staff desktop and help center

Quick answers about Temple financial aid, bills and refunds. Built by Team 12 for the Temple AI Build Challenge.

It's a web app that installs to the iPhone Home Screen and runs full screen like a native app. It also works offline after the first visit. It uses plain HTML, CSS and JavaScript, so there's no build step.

> Prototype. "Sign in with Temple SSO" is a demo button that picks a made-up student. There is no real login, and no real student data is used. Answers come from public SFS and Bursar pages (linked in each answer).

## Help center website
The `web/` folder is the desktop/mobile help center: one ask bar (chat), topic cards, key dates and who to contact. It uses the same `data.js` as the app. Live at `/ask-sfs/web/`.

## Staff desktop
The `staff/` folder is the SFS staff tool: a sorted inbox with summaries, privacy flags, drafted replies a person approves, Trends and Policy lookup. Sample emails only. Cases sent from the student app on the same device show up under “From the app.” Live at `/ask-sfs/staff/`.

## Run it in Visual Studio Code
1. Open this folder in VS Code (**File → Open Folder**).
2. Install the **Live Server** extension. VS Code will suggest it.
3. Right-click `index.html` → **Open with Live Server**.
4. To test on your iPhone (same Wi-Fi as your computer), open `http://<your-computer-IP>:5500` in Safari.

## Put it online with GitHub Pages
1. On github.com, click **New repository** and name it `ask-sfs`. Make it public.
2. Click **uploading an existing file**, then drag in everything in this folder (including the `icons` folder) and click **Commit**.
3. Go to **Settings → Pages**. Under Source, pick **Deploy from a branch**, then branch `main` and folder `/ (root)`. Click **Save**.
4. After about a minute the app is live at `https://<your-username>.github.io/ask-sfs/`.

## Install on iPhone
Open the link in Safari, tap **Share**, then tap **Add to Home Screen**.

## Files
| File | What it does |
|---|---|
| `index.html` | App shell |
| `styles.css` | Design: Temple cherry, Apple-style layout |
| `app.js` | Screens: Home, Ask, Money, Tasks, help sheet |
| `data.js` | SFS facts, topics, sample students |
| `sw.js` | Offline cache |
| `manifest.webmanifest`, `icons/` | Home Screen name and icon |
