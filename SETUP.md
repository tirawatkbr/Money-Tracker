# Money Tracker — Setup Guide

A self-contained personal finance tracker. Single HTML file, no build, optional Google Sheets sync.

## Quick start (works immediately, no setup)

1. Download `money-tracker.html`
2. Double-click to open in any browser, or upload to GitHub Pages
3. Start tracking — data saves to the browser's localStorage

That's it. The app fully works without any backend.

## Optional: Google Sheets cloud sync

Once you set this up, every change you make automatically syncs to a Google Sheet you own. You can also pull data back from the sheet on a new device.

### Step 1 — Create a Google Sheet

1. Go to https://sheets.google.com and create a new blank sheet
2. Rename it to anything you like (e.g. "Money Tracker Backup")

### Step 2 — Add the Apps Script

1. In your Google Sheet: **Extensions → Apps Script**
2. Delete the default `function myFunction() {}` placeholder
3. Open `apps-script-backend.js` from the downloaded files
4. Copy the entire contents and paste into the Apps Script editor
5. Click the floppy disk icon (or Ctrl+S) to save
6. Name the project (e.g. "Money Tracker Backend")

### Step 3 — Deploy as Web App

1. Click **Deploy → New deployment** (top right)
2. Click the gear icon next to "Select type" → choose **Web app**
3. Fill in:
   - **Description:** Money Tracker Sync (optional)
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone
4. Click **Deploy**
5. Authorize the app when Google prompts you (it's your own script, safe)
6. Copy the **Web app URL** at the end (it ends in `/exec`)

### Step 4 — Connect the app

1. Open `money-tracker.html`
2. Tap the **☁ Backup** button at the top
3. Paste the Web app URL into the "Apps Script Web App URL" field
4. Tap **↑ Push now** to test
5. Check your Google Sheet — a new tab called "MoneyTrackerData" will appear with a row of data
6. Tick **"Auto-sync after every change"** so it syncs automatically going forward

## Hosting on GitHub Pages (optional)

Same as your TDEE calculator workflow:

1. Create a new GitHub repo (e.g. `money-tracker`)
2. Upload `money-tracker.html` and rename it to `index.html`
3. Settings → Pages → Source: "Deploy from a branch" → main / root
4. Visit `https://your-username.github.io/money-tracker/` from any device
5. The sync URL will work the same on every device — your data follows you

## Features

- **Daily / Monthly / Yearly views** with charts and trends
- **Multi-account tracking** with drag-and-drop reordering
- **Income / Expense / Transfer** with separated sections
- **Savings Goals** (e.g. "Japan Trip 80,000") with progress bars and deadlines
- **Goal-linked transfers** — categorize a transfer as contributing to a goal
- **Filter & sort** by type, account, category, or search term
- **Pure black & white theme** with semantic color accents
- **Today's date** prominently displayed with "Jump to today" button
- **Local backup** — export/import JSON files anytime
- **Cloud sync** via Google Sheets (optional)

## Files

- `money-tracker.html` — the entire app (open in browser)
- `apps-script-backend.js` — Google Apps Script code (paste into Apps Script editor)
- `SETUP.md` — this guide

## Data ownership

Your data lives in:
1. Your browser's localStorage (always)
2. A JSON file you can export anytime
3. Your own Google Sheet (if cloud sync is enabled)

No one else has access. Anthropic doesn't see your data — this is a fully standalone app once downloaded.
