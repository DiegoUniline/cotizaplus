function setup() {
  const ss = SpreadsheetApp.getActive();
  if (!ss) throw new Error('Ejecuta setup() desde el script vinculado a la hoja de cálculo.');
  PropertiesService.getScriptProperties().setProperty('SS_ID', ss.getId());
  SS_ = ss;
  ss.setSpreadsheetTimeZone(Session.getScriptTimeZone());

  Object.keys(SHEETS).forEach(k => {
    const def = SHEETS[k];
    const s = ss.getSheetByName(def.name) || ss.insertSheet(def.name);
    const cur = s.getLastColumn() ? headers_(s) : [];
    const faltan = def.headers.filter(h => cur.indexOf(h) < 0);
    if (faltan.length) s.getRange(1, cur.length + 1, 1, faltan.length).setValues([faltan]);
    s.setFrozenRows(1);
    const head = headers_(s);
    s.getRange(1, 1, 1, head.length).setFontWeight('bold').setBackground('#13233a').setFontColor('#ffffff');
    head.forEach((h, i) => {
      if (TEXT_FIELDS.indexOf(h) >= 0) s.getRange(2, i + 1, s.getMaxRows() - 1, 1).setNumberFormat('@');
    });
  });

  validacion_(ss, SHEETS.COTIZACIONES, 'Estado', ESTADOS);
  validacion_(ss, SHEETS.SEGUIMIENTO, 'Tipo', TIPOS_SEG);

  const cfg = getConfig_(), faltan = {};
  Object.keys(CONFIG_DEFAULT).forEach(k => { if (!(k in cfg)) faltan[k] = CONFIG_DEFAULT[k]; });
  if (Object.keys(faltan).length) setConfig_(faltan);

  ['Hoja 1', 'Sheet1'].forEach(n => {
    const s = ss.getSheetByName(n);
    if (s && s.getLastRow() === 0 && ss.getSheets().length > 1) ss.deleteSheet(s);
  });
}

function validacion_(ss, def, campo, lista) {
  const s = ss.getSheetByName(def.name), col = headers_(s).indexOf(campo) + 1;
  if (!col) return;
  s.getRange(2, col, s.getMaxRows() - 1, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(lista, true).setAllowInvalid(true).build());
}
