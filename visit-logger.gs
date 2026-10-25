/**
 * Visit logger for nasibasgar.github.io
 *
 * This file does not run on the website. It runs in Google Apps Script,
 * attached to your "Portfolio visits" spreadsheet, and receives one small
 * message per page view from analytics.js on the site.
 *
 * To set it up, see the "Visitor tracking" section of README.md.
 */

var SHEET_ID = '1B56i5wHTxaU9dPrCj92o3ym3OVXzaqEF3xrYA5VJhC8';
var TAB = 'visits';

function doPost(e) {
  var lock = LockService.getScriptLock();
  try { lock.waitLock(25000); } catch (err) { return ok(); }
  try {
    var d = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName(TAB);
    if (d.t === 'end') updateRow(sheet, d);
    else addRow(sheet, d);
  } catch (err) {
    // A failed log must never reach the visitor, so errors stop here.
  } finally {
    lock.releaseLock();
  }
  return ok();
}

/* The arrival. Seconds and scroll start at zero and are filled in later. */
function addRow(sheet, d) {
  sheet.appendRow([
    new Date(), d.network || '', d.asn || '', d.city || '', d.region || '',
    d.country || '', d.page || '', 0, 0, d.referrer || '', d.device || '',
    d.language || '', d.id || ''
  ]);
}

/* The departure, matched back to its arrival by visit ID. */
function updateRow(sheet, d) {
  var last = sheet.getLastRow();
  if (last < 2) return;
  var start = Math.max(2, last - 300);
  var ids = sheet.getRange(start, 13, last - start + 1, 1).getValues();
  for (var i = ids.length - 1; i >= 0; i--) {
    if (ids[i][0] === d.id) {
      sheet.getRange(start + i, 8, 1, 2).setValues([[d.seconds || 0, d.scrolled || 0]]);
      return;
    }
  }
}

function ok() {
  return ContentService.createTextOutput('ok').setMimeType(ContentService.MimeType.TEXT);
}

function doGet() { return ok(); }
