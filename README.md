# Goal Planner - Lifeplans

## Branding (logo + favicon)

The app currently uses `public/favicon.ico` as the logo in the navbar.

- **Replace favicon**
  - Replace `public/favicon.ico` with your own `.ico` file.
  - Keep the filename the same to avoid code changes.

- **Replace navbar logo**
  - The navbar references `/favicon.ico`.
  - If you want to use a different image format (e.g. `logo.png`), add it to `public/` and update `src/components/Navbar.tsx`.

## Development

```bash
pnpm install
pnpm dev
```

## Vercel deployment

### Environment variables

Set the following environment variables in Vercel (Project Settings -> Environment Variables). You can copy them from your Firebase project settings.

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_FIREBASE_MEASUREMENT_ID`

Local development: create a `.env` file (see `.env.example`).

### Build settings

- **Build command**: `pnpm build`
- **Output directory**: `dist`

## Production build

```bash
pnpm build
pnpm preview
```

## Firestore permissions (important)

If you see `Missing or insufficient permissions` when creating goals or saving check-ins, your Firestore security rules are blocking writes.

- **Rules file**
  - This repo includes `firestore.rules`.

- **Deploy rules (recommended)**
  - Install Firebase CLI and deploy:
  - `firebase deploy --only firestore:rules`

- **Or update in Firebase Console**
  - Firebase Console
  - Firestore Database
  - Rules
  - Paste the contents of `firestore.rules` and publish
