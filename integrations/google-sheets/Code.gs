// Configure SPREADSHEET_ID and QUOTES_SCRIPT_TOKEN in Script Properties.
function doPost(e) {
  const reply = value => ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON);
  const properties = PropertiesService.getScriptProperties();
  let data;
  try { data = JSON.parse(e.postData.contents); } catch (_) { return reply({ ok: false }); }
  const secret = properties.getProperty('QUOTES_SCRIPT_TOKEN');
  if (!secret || data.token !== secret) return reply({ ok: false, code: 'invalid_token' });
  if (typeof data.sessionId !== 'string' || !/^[a-f0-9-]{36}$/.test(data.sessionId)) return reply({ ok: false });
  const services = { 'coffee-break': 'Coffee break', brunch: 'Brunch', almuerzo: 'Almuerzo', 'after-office': 'After office', tablas: 'Tablas y cocktail', paella: 'Paella presencial' };
  if (typeof data.requestId !== 'string' || !/^[0-9a-f-]{36}$/i.test(data.requestId) ||
      !Array.isArray(data.services) || !data.services.length || data.services.length > 6 ||
      data.services.some(id => !Object.prototype.hasOwnProperty.call(services, id)) ||
      !Number.isInteger(data.people) || data.people < 1 || data.people > 10000 ||
      !Number.isInteger(data.hours) || data.hours < 1 || data.hours > 12 ||
      typeof data.name !== 'string' || !data.name.trim() || data.name.length > 120 ||
      typeof data.email !== 'string' || data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) ||
      typeof data.phone !== 'string' || data.phone.length > 30) return reply({ ok: false });
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(10000)) return reply({ ok: false, code: 'busy' });
  try {
    const spreadsheetId = properties.getProperty('SPREADSHEET_ID');
    if (!spreadsheetId) return reply({ ok: false, code: 'missing_spreadsheet_id' });
    const sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName('Cotizaciones');
    if (!sheet) return reply({ ok: false, code: 'missing_sheet' });
    const last = sheet.getLastRow();
    if (last > 1 && sheet.getRange(2, 1, last - 1, 1).createTextFinder(data.requestId).matchEntireCell(true).findNext()) {
      return reply({ ok: true, requestId: data.requestId });
    }
    // Persistent shared limit, checked inside the lock; retries above are free.
    const now = Date.now();
    const windowMs = 15 * 60 * 1000;
    const recent = last > 1 ? sheet.getRange(2, 2, last - 1, 8).getValues()
      .filter(row => row[7] === data.sessionId)
      .map(row => new Date(row[0]).getTime())
      .filter(time => time > now - windowMs).sort((a, b) => a - b) : [];
    if (recent.length >= 3) return reply({ ok: false, code: 'rate_limited', retryAfter: Math.ceil((recent[recent.length - 3] + windowMs - now) / 1000) });
    sheet.getRange(1, 9).setValue('Sesión');
    // Prefix text to prevent user input from executing as a spreadsheet formula.
    const safeText = value => "'" + String(value);
    sheet.appendRow([
      data.requestId, new Date().toISOString(), safeText(data.name.trim()),
      safeText(data.email.trim()), safeText(data.phone.trim()),
      data.services.map(id => services[id]).join(', '), data.people, data.hours, data.sessionId
    ]);
    SpreadsheetApp.flush();
    return reply({ ok: true, requestId: data.requestId });
  } catch (_) { return reply({ ok: false, code: 'sheet_write_failed' }); }
  finally { lock.releaseLock(); }
}
