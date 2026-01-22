# 🎮 Quest Mode

A gamified routine and chore tracker for kids. Built as a Progressive Web App (PWA) with real-time sync across all family devices.

## Features

- **Individual profiles** for each child with PIN protection
- **Parent dashboard** with approval controls and settings
- **Real-time sync** across all devices (iPads, phones, etc.)
- **Gamification**: XP, levels, streaks, unlockable themes/avatars
- **Virtual pet** that evolves with consistency
- **Reward system** with redeemable points

## Quick Setup (15 minutes)

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** (or "Add project")
3. Name it something like "quest-mode-family"
4. Disable Google Analytics (not needed) and click **Create**

### Step 2: Enable Realtime Database

1. In your Firebase project, click **"Build"** → **"Realtime Database"**
2. Click **"Create Database"**
3. Choose your region (us-central1 is fine)
4. Select **"Start in test mode"** → Click Enable
   
   > ⚠️ Test mode allows anyone with your database URL to read/write for 30 days. See Security section below to lock it down.

### Step 3: Get Your Config

1. Click the **gear icon** (⚙️) → **"Project settings"**
2. Scroll down to **"Your apps"** section
3. Click the **Web icon** (`</>`) to add a web app
4. Name it "Quest Mode" (no need to set up hosting)
5. Copy the `firebaseConfig` object - it looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB...",
  authDomain: "quest-mode-family.firebaseapp.com",
  databaseURL: "https://quest-mode-family-default-rtdb.firebaseio.com",
  projectId: "quest-mode-family",
  storageBucket: "quest-mode-family.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### Step 4: Update index.html

1. Open `index.html` in a text editor
2. Find the `firebaseConfig` section near the top (around line 25)
3. Replace the placeholder values with your actual config
4. Save the file

### Step 5: Deploy to GitHub Pages

1. Create a new repository on GitHub (e.g., `quest-mode`)
2. Upload these files:
   - `index.html`
   - `manifest.json`
   - `icon-192.png`
   - `icon-512.png`
3. Go to **Settings** → **Pages**
4. Set Source to **"Deploy from a branch"**
5. Select **main** branch and **/ (root)** folder
6. Click Save

Your app will be live at: `https://yourusername.github.io/quest-mode/`

### Step 6: Add to Kids' iPads

On each iPad:

1. Open Safari and go to your GitHub Pages URL
2. Tap the **Share** button (square with arrow)
3. Scroll down and tap **"Add to Home Screen"**
4. Name it "Quest Mode" and tap **Add**

The app will now appear on their home screen like a regular app!

## Default PINs

| User | PIN |
|------|-----|
| Parent Admin | 1234 |
| Ann | 1111 |
| Cat | 2222 |

**Change these immediately** in the Parent Dashboard → Settings → PINs

## Security (Important!)

The default "test mode" database rules expire after 30 days. To keep your data secure:

1. Go to Firebase Console → Realtime Database → **Rules**
2. Replace the rules with:

```json
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

For better security (requires knowing your database URL):

```json
{
  "rules": {
    "users": {
      ".read": true,
      ".write": true
    },
    "settings": {
      ".read": true,
      ".write": true
    }
  }
}
```

> Since this is a family app without authentication, security is based on obscurity (only family members know the URL). For a small family app, this is usually sufficient.

## Customization

### Changing Tasks

Edit the `taskDefinitions` object in `index.html` (around line 65). Each task has:
- `id`: Unique identifier
- `name`: Display name
- `points`: XP/points earned
- `icon`: Emoji icon
- `deadline`: 'morning', 'evening', or null

### Changing Rewards

Edit the `rewards` array in `defaultSettings` (around line 30).

### Changing Kids' Names

Search and replace 'Ann' and 'Cat' throughout the file, and update the `taskDefinitions` keys.

## Troubleshooting

**App shows "Firebase Not Configured"**
- Make sure you copied the entire firebaseConfig object
- Check that you saved index.html after editing

**Changes not syncing between devices**
- Check your internet connection
- Make sure all devices are using the same URL
- Check Firebase Console → Realtime Database to see if data is there

**Can't add to home screen**
- Must use Safari on iOS (Chrome doesn't support Add to Home Screen on iOS)
- Make sure you're on HTTPS (GitHub Pages handles this automatically)

## File Structure

```
quest-mode/
├── index.html      # Main app (all-in-one)
├── manifest.json   # PWA configuration
├── icon-192.png    # App icon (192x192)
├── icon-512.png    # App icon (512x512)
└── README.md       # This file
```

## License

MIT - Do whatever you want with it!
