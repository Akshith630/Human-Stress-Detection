# 🧠 Human Stress Detection - AI-Powered Health Monitoring



Advanced stress detection system using machine learning to analyze physiological parameters and provide real-time stress level assessment. Built with React, Vite, Electron, and Tailwind CSS.

---

## ✨ Features

- **🤖 Real-time Stress Analysis**: Decision Tree ML algorithm analyzes multiple health parameters
- **📊 Multi-Parameter Monitoring**: Heart Rate, Skin Conductance, Sleep Hours, Blood Oxygen, Respiration Rate, Physical Activity
- **📋 Smart Habit Tracker**: Build and track healthy habits with streak counting and persistence
- **💾 Data Persistence**: localStorage-based persistence for habits and data
- **🖥️ Desktop App**: Native macOS application via Electron
- **🌐 Web Version**: Progressive Web App (PWA) support
- **🎨 Dark Mode UI**: Beautiful dark-themed interface with Tailwind CSS
- **⚡ One-Click Analysis**: Pre-filled scenario button for quick testing
- **📱 Responsive Design**: Works on desktop and mobile

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 16+ and **npm**
- **macOS** (for Electron packaging; web version works on all platforms)

### 1. Install Dependencies
```bash
cd Human_Stress_Detection_With_HabitTracker
npm install
```

### 2. Run the App (Choose One)

**Option A: Web Development (Fastest)**
```bash
npm run dev
# Opens at http://localhost:8080/
# Live reload enabled, dev server with HMR
```

**Option B: Desktop Development (Electron with Live Reload)**
```bash
npm run electron:dev
# Starts Vite dev server + Electron
```

**Option C: Built/Packaged Version (Simulate Distribution)**
```bash
npm run build        # Build production bundle
npx electron .       # Run with file:// loading
```

**Option D: Package as macOS App (DMG/ZIP/App)**
```bash
npm run electron:package
# Artifacts in release/mac-arm64/
```

### 3. Install to Applications (macOS)
```bash
cp -R release/mac-arm64/Stress\ Detect\ Companion.app /Applications/
# Then launch from Launchpad or Applications folder
```

---

## 📋 Health Parameters

| Parameter | Unit | Normal | Stress Indicator |
|-----------|------|--------|-----------------|
| Heart Rate (SR) | bpm | 60-100 | >100 |
| Skin Conductance (RR) | μS | 1-20 | >20 |
| Sleep Hours (T) | hours | 7-9 | <6 |
| Blood Oxygen (BO) | % | 95-100 | <95 |
| Respiration Rate | breaths/min | 12-20 | >20 |
| Physical Activity | min/day | 30-60 | <20 |

---

## 🎯 Pages

- **Home** (`/`) — Hero section and overview
- **Data Info** (`/data-info`) — Parameter explanations and ML algorithm overview
- **Detection** (`/detection`) ⭐ — Enter data, get stress analysis, **one-click run button**
- **Habit Tracker** (`/habit-tracker`) — Build and track healthy habits
- **Not Found** (`/*`) — 404 error page

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| React 18 | Frontend framework |
| TypeScript | Type safety |
| Vite 7 | Build tool |
| Electron 39 | Desktop app |
| Tailwind CSS | Styling |
| shadcn/ui | UI components |
| React Router | Routing |
| React Hook Form | Form handling |
| TanStack Query | State management |

---

## 📂 Project Structure

```
src/
├── pages/          # Home, Detection, DataInfo, HabitTracker, NotFound
├── components/     # Navigation, UI components
├── hooks/          # Custom hooks
├── App.tsx         # Main app with routing
└── main.tsx        # React entry point
public/
├── icons/          # App icons (.icns, .png)
└── robots.txt
electron-main.cjs   # Electron main process
vite.config.ts      # Vite & PWA config
tailwind.config.ts  # Tailwind setup
```

---

## 💾 Data Storage

- **Habit Tracker**: Stored in `localStorage` under key `"stress-habits"`
- **User Data**: macOS → `~/Library/Application Support/vite_react_shadcn_ts/`

---

## 🚀 Available Scripts

```bash
npm run dev              # Vite dev server
npm run build            # Production build
npm run electron:dev     # Dev server + Electron
npm run electron:prod    # Build + Electron
npm run electron:package # Build + electron-builder
npm run lint             # ESLint check
```

---

## 🐛 Troubleshooting

**App not in Launchpad?**
```bash
/System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister -f /Applications/Stress\ Detect\ Companion.app
killall Dock
```

**Blank window?**
- Uses `HashRouter` for Electron (file://), `BrowserRouter` for web
- Check DevTools console for errors: `npm run dev` → F12

**Build errors?**
```bash
rm -rf dist node_modules
npm install && npm run build
```

---

## 🤝 Contributing

1. Fork the repo
2. Create feature branch: `git checkout -b my-feature`
3. Commit: `git commit -m "Add feature"`
4. Push: `git push origin my-feature`
5. Open Pull Request

---

## 📝 License

MIT License - see LICENSE file

---

## 👤 Author

**Akshith Reddy Bairu** 

---

## 📚 Guides

- **[USER_GUIDE.md](./USER_GUIDE.md)** — Step-by-step user instructions

---

## 📦 **Quick: How to Get the App**

### For End Users (No Building Required):
1. **Download from GitHub Releases** (if available):
   - Go to: `https://github.com/YOUR_USERNAME/YOUR_REPO/releases`
   - Download the installer for your platform:
     - **Windows:** `.exe` file
     - **macOS:** `.dmg` file
     - **Linux:** `.AppImage` or `.deb` file
   - Install and run!

2. **Or get the built app directly:**
   - Ask the developer for the installer from `release/` folder
   - Install and run immediately

### For Developers:
```bash
git clone YOUR_REPO_URL
cd Human_Stress_Detection_With_HabitTracker
npm install
npm run electron:package
# App will be in: release/
```


---

**Ready to detect stress? 🧠✨**

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

You can deploy this project to any static hosting service like Vercel, Netlify, or GitHub Pages. Simply build the project and upload the `dist` folder.

## Install it like an app (PWA)

This project now ships as a Progressive Web App:

1. Run `npm run dev` (or deploy a production build) and open the site in Chrome, Edge, or Safari.
2. Look for the browser's **Install App** / **Add to Home Screen** option and confirm.
3. The Stress Detection Companion runs in its own window with offline support and auto-updates via the service worker.

## Run as a desktop app (Electron)

This repository includes a minimal Electron wrapper that can load the production build and run as a native desktop app.

1. Install dependencies:

```sh
npm install
```

2. Build the web app and start Electron:

```sh
npm run electron:prod
```

This will produce the production build (`/dist`) and launch the Electron window that loads `dist/index.html`.

Notes:

- For iterative development it's easiest to run the dev server (`npm run dev`) and open the site in the browser.
- If you want an improved Electron developer experience (auto-reload, packaging), consider adding tools like `electron-builder` or `electron-forge` and a small dev script that points Electron to `http://localhost:8080` during development.

### Electron development (live reload)

To run the web app inside Electron during development with hot-reload:

1. Install dependencies (this adds `concurrently` and `wait-on` used by the helper script):

```sh
npm install
```

2. Run the dev workflow that starts the Vite dev server and then launches Electron pointed at the dev server once it's ready:

```sh
npm run electron:dev
```

This starts `vite` and then opens the Electron window at `http://localhost:8080`. Edits to the web app will hot-reload via Vite.

## Packaging the desktop app (create installers)

You can create native installers for macOS, Windows, and Linux using `electron-builder`. A basic configuration is already included in `package.json`.

1. Ensure native build tools are available on your machine:

	- macOS: Xcode command line tools (for signing/notarization extra steps), otherwise building a dmg/zip works.
	- Windows: Building an installer on Windows is recommended (cross-compiling from macOS requires extra setup).
	- Linux: Required tools depend on target (AppImage/DEB usually work on Linux hosts).

2. Install dependencies (if not already):

```sh
npm install
```

3. Run the packaging script:

```sh
npm run electron:package
```

This runs the Vite production build (producing `dist/`) and then runs `electron-builder`. The built artifacts are placed in the `release/` directory by default.

Notes:
- Cross-building (creating Windows installers from macOS or vice-versa) can be more complex and sometimes requires additional build tools or CI that runs on the target OS. For production releases, I recommend building on each target platform or using a CI service (GitHub Actions, GitLab CI) configured with electron-builder.
- If you want me to add a GitHub Actions workflow to build and publish installers automatically, I can scaffold that next.
 - I added a GitHub Actions workflow (`.github/workflows/packaging.yml`) that will run `electron-builder` on macOS, Windows, and Linux runners when you push a tag (v*). It uploads the produced artifacts as workflow artifacts for easy download.

If you'd like, I can also wire the workflow to automatically create a GitHub Release and attach artifacts there instead of only uploading them as workflow artifacts.

I added a release step: when you push a tag like `v1.0.0` the CI will build installers on macOS/Windows/Linux, upload artifacts, and then create a GitHub Release with those installers attached.

