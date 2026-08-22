/**
 * Dalton Lab — backend for sign-in + quiz results.
 * Deploy: Deploy > New deployment > Web app
 *   Execute as: Me
 *   Who has access: Anyone
 * Then copy the Web app URL (ends in /exec) into GOOGLE_SCRIPT_URL in index.html
 */

function doPost(e) {
  var data = JSON.parse(e.postData.contents);
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  if (data.type === 'login') {
    return handleLogin(ss, data);
  }
  if (data.type === 'quiz') {
    return handleQuiz(ss, data);
  }
  return jsonOutput({ success: false, message: 'Unknown request type.' });
}

function handleLogin(ss, data) {
  var sheet = ss.getSheetByName('Users');
  if (!sheet) {
    return jsonOutput({ success: false, message: 'Sheet "Users" belum dibuat di spreadsheet ini.' });
  }

  var rows = sheet.getDataRange().getValues();
  // rows[0] is the header row: Username | Password | Nama | Akses
  var inputUser = String(data.username || '').trim().toLowerCase();
  var inputPass = String(data.password || '');

  for (var i = 1; i < rows.length; i++) {
    var rowUser = String(rows[i][0] || '').trim().toLowerCase();
    var rowPass = String(rows[i][1] || '');
    var rowNama = String(rows[i][2] || '');
    var rowAkses = String(rows[i][3] || '').toLowerCase();

    if (rowUser === inputUser && rowUser !== '') {
      if (rowPass === inputPass) {
        var aksesList = rowAkses.split(',').map(function (s) { return s.trim(); }).filter(Boolean);
        return jsonOutput({
          success: true,
          nama: rowNama || rows[i][0],
          akses: aksesList
        });
      } else {
        return jsonOutput({ success: false, message: 'Username atau password salah.' });
      }
    }
  }

  return jsonOutput({ success: false, message: 'Username atau password salah.' });
}

function handleQuiz(ss, data) {
  var sheetName = data.sheetName || 'Kuis - Umum';
  // Sheet tab names can't exceed 100 chars and can't contain: / \ ? * [ ]
  sheetName = sheetName.toString().substring(0, 95).replace(/[\/\\\?\*\[\]]/g, '-');

  // The 3-level exercise engine tags submissions with a topic + level (e.g.
  // "Eksponen" / "Dasar") so a future per-topic performance dashboard can
  // read them; the plain chapter quiz doesn't send these and keeps the
  // original 7-column sheet shape untouched.
  var hasTopikLevel = !!(data.topik || data.level);

  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    var header = ['Waktu', 'Username', 'Nama', 'Kelas', 'Skor', 'Total Soal', 'Persentase'];
    if (hasTopikLevel) header = header.concat(['Topik', 'Level']);
    sheet.appendRow(header);
    sheet.getRange(1, 1, 1, header.length).setFontWeight('bold');
  }

  var row = [
    data.waktu || new Date(),
    data.username || '',
    data.nama || '',
    data.kelas || '',
    data.skor,
    data.total,
    data.persentase
  ];
  if (hasTopikLevel) row = row.concat([data.topik || '', data.level || '']);

  sheet.appendRow(row);

  return jsonOutput({ success: true });
}

function jsonOutput(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
