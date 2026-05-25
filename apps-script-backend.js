// ============================================================
// MONEY TRACKER - Google Apps Script Backend
// ============================================================
// SETUP STEPS:
// 1. Open https://script.google.com and create a new project
// 2. Delete the default code and paste THIS entire file
// 3. Click "Deploy" → "New deployment"
// 4. Settings: Type = "Web app"
//              Execute as = "Me"
//              Who has access = "Anyone"
// 5. Click Deploy and authorize when prompted
// 6. Copy the "Web app URL" — paste it into Money Tracker's
//    Backup & Sync settings
// ============================================================

const SHEET_NAME = 'MoneyTrackerData';
const HISTORY_KEEP = 30; // Keep last 30 backups in sheet

// Handle POST requests (sync from app)
function doPost(e) {
  try {
    const payload = JSON.parse(e.parameter.payload);
    const sheet = getOrCreateSheet();
    const timestamp = new Date().toISOString();
    const dataStr = JSON.stringify(payload.data);

    // Append the new backup row
    sheet.appendRow([timestamp, dataStr]);

    // Trim old backups (keep last HISTORY_KEEP rows + header)
    const lastRow = sheet.getLastRow();
    const maxRows = HISTORY_KEEP + 1; // +1 for header
    if (lastRow > maxRows) {
      sheet.deleteRows(2, lastRow - maxRows);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, timestamp: timestamp }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Handle GET requests (load latest backup) - uses JSONP for cross-origin
function doGet(e) {
  const callback = e.parameter.callback || 'callback';
  const action = e.parameter.action;

  if (action === 'load') {
    try {
      const sheet = getOrCreateSheet();
      const lastRow = sheet.getLastRow();

      if (lastRow < 2) {
        return jsonp(callback, { success: false, error: 'No backups yet' });
      }

      const row = sheet.getRange(lastRow, 1, 1, 2).getValues()[0];
      const timestamp = row[0];
      const data = JSON.parse(row[1]);

      return jsonp(callback, { success: true, timestamp: timestamp, data: data });
    } catch (err) {
      return jsonp(callback, { success: false, error: err.toString() });
    }
  }

  return jsonp(callback, { success: false, error: 'Unknown action. Use ?action=load' });
}

// JSONP wrapper - allows browser to fetch despite CORS
function jsonp(callback, obj) {
  return ContentService
    .createTextOutput(callback + '(' + JSON.stringify(obj) + ')')
    .setMimeType(ContentService.MimeType.JAVASCRIPT);
}

// Get or create the data sheet
function getOrCreateSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Timestamp', 'Data (JSON)']);
    // Make the JSON column wide enough to read
    sheet.setColumnWidth(2, 800);
    // Freeze header row
    sheet.setFrozenRows(1);
  }
  return sheet;
}
