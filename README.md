# Help Nearby

Connect people who need help with nearby volunteers. Built with React, Firebase, Leaflet, Tailwind CSS.

Repo: https://github.com/RhythmPahwa14/Help-Nearby

## Features

- Post and view help requests
- Map view with location using Leaflet
- Firebase Auth (email/password) and Firestore storage

## Tech Stack

- React 18 (Create React App, `react-scripts@5`)
- React Router v6
- Firebase v10 (Auth + Firestore)
- Leaflet + React-Leaflet
- Tailwind CSS 3


## Getting Started

Prerequisites: Node.js 18+ and npm.

1) Clone and install

```powershell
git clone https://github.com/RhythmPahwa14/Help-Nearby.git
cd Help-Nearby
npm install
```

2) Configure environment variables in `.env.local`

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

3) Run the app

```powershell
npm start
```

App runs at http://localhost:3000

## Project Structure

```
src/
	components/       # UI components
	context/          # Auth, Theme, Background contexts
	pages/            # Home, Login, Register, Requests, MapView
	firebase.js       # Firebase init (reads .env.local)
	index.js, App.js  # App entry
```

## Scripts

- `npm start` – start dev server
- `npm run build` – production build to `build/`
- `npm test` – run tests
- `npm run eject` – CRA eject (irreversible)

## Deployment (Vercel)

- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `build`
- Add the same Firebase env vars in Vercel Project Settings → Environment Variables

Compatibility note:

- This project pins TypeScript to 4.9.5 for CRA compatibility and uses an `.npmrc` with `legacy-peer-deps=true` to avoid peer-dependency conflicts on Vercel.

## Maps

Leaflet/React-Leaflet are used for location and map display. Ensure network access to tile providers in your deployment environment.

## Troubleshooting

- npm ERESOLVE peer-deps issues on CI/Vercel: keep `.npmrc` with `legacy-peer-deps=true` and TypeScript pinned to 4.9.5.
- Firebase errors: verify `.env.local` values and that they are also set in your hosting provider.

## License


