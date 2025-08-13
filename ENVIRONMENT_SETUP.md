# Environment Variables Setup

## Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your actual values in the `.env` file:
   - Get Firebase config from your Firebase Console
   - Get OpenCage API key from https://opencagedata.com/

## Vercel Deployment

In your Vercel dashboard, add these environment variables:

### Firebase Configuration
- `REACT_APP_FIREBASE_API_KEY` = Your Firebase API key
- `REACT_APP_FIREBASE_AUTH_DOMAIN` = your-project-id.firebaseapp.com
- `REACT_APP_FIREBASE_PROJECT_ID` = Your Firebase project ID
- `REACT_APP_FIREBASE_STORAGE_BUCKET` = your-project-id.firebasestorage.app
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID` = Your messaging sender ID
- `REACT_APP_FIREBASE_APP_ID` = Your Firebase app ID

### Other APIs
- `REACT_APP_OPENCAGE_API_KEY` = Your OpenCage geocoding API key

## Security Notes

- Never commit the `.env` file to Git
- Always use `REACT_APP_` prefix for React environment variables
- Keep your API keys secure and rotate them regularly
- Use different Firebase projects for development and production

## Getting Firebase Config

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings (gear icon)
4. Scroll down to "Your apps" section
5. Click on your web app
6. Copy the config values to your environment variables
