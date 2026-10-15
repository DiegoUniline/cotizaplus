const SHEETS = {
  CLIENTES: { name: 'Clientes', headers: ['ID', 'Nombre', 'Empresa', 'RFC', 'Email', 'Telefono', 'Direccion', 'Notas', 'FechaAlta'] },
  PRODUCTOS: { name: 'Productos', headers: ['ID', 'SKU', 'Descripcion', 'Unidad', 'Precio', 'Activo'] },
  COTIZACIONES: {
    name: 'Cotizaciones',
    headers: ['ID', 'Folio', 'ClienteID', 'Fecha', 'Vigencia', 'Estado', 'Moneda', 'TasaIVA', 'Subtotal', 'Descuento', 'IVA', 'Total',
      'Condiciones', 'Vendedor', 'PDF', 'ProximoSeguimiento', 'ProximaAccion', 'UltimaActualizacion']
  },
  PARTIDAS: { name: 'Partidas', headers: ['ID', 'CotizacionID', 'ProductoID', 'Descripcion', 'Cantidad', 'Unidad', 'PrecioUnitario', 'DescuentoPct', 'Importe'] },
  SEGUIMIENTO: { name: 'Seguimiento', headers: ['ID', 'CotizacionID', 'FechaHora', 'Tipo', 'Nota', 'ProximaAccion', 'FechaProxima', 'Usuario'] },
  CONFIG: { name: 'Config', headers: ['Clave', 'Valor'] }
};

const CONFIG_DEFAULT = {
  EMPRESA_NOMBRE: 'Mi Empresa',
  EMPRESA_RFC: '',
  EMPRESA_DIRECCION: '',
  EMPRESA_TELEFONO: '',
  EMPRESA_EMAIL: '',
  LOGO_URL: '',
  IVA_PCT: 16,
  FOLIO_PREFIJO: 'COT-',
  FOLIO_CONSECUTIVO: 0,
  VIGENCIA_DIAS: 15,
  DIAS_SEGUIMIENTO: 3,
  CARPETA_PDF_ID: '',
  EMAIL_NOTIFICACIONES: '',
  CONDICIONES: 'Precios sujetos a cambio sin previo aviso.\nTiempo de entrega: a convenir.\nForma de pago: 50% anticipo, 50% contra entrega.'
};

const DATE_FIELDS = ['Fecha', 'Vigencia', 'ProximoSeguimiento', 'FechaProxima'];
const DATETIME_FIELDS = ['FechaAlta', 'FechaHora', 'UltimaActualizacion'];
const NUM_FIELDS = ['Precio', 'TasaIVA', 'Subtotal', 'Descuento', 'IVA', 'Total', 'Cantidad', 'PrecioUnitario', 'DescuentoPct', 'Importe'];
const TEXT_FIELDS = ['ID', 'ClienteID', 'CotizacionID', 'ProductoID', 'Folio', 'SKU', 'RFC', 'Telefono'];

let SS_ = null;

function ss_() {
  if (SS_) return SS_;
  const id = PropertiesService.getScriptProperties().getProperty('SS_ID');
  return (SS_ = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActive());
}

function sh_(def) {
  const s = ss_().getSheetByName(def.name);
  if (!s) throw new Error('Falta la hoja "' + def.name + '". Ejecuta Cotizaplus → Configurar hojas.');
  return s;
}

function tz_() { return Session.getScriptTimeZone(); }

function hoy_() { return Utilities.formatDate(new Date(), tz_(), 'yyyy-MM-dd'); }

function sumarDias_(s, n) {
  const p = String(s).split('-');
  return new Date(Date.UTC(+p[0], p[1] - 1, +p[2] + (Number(n) || 0))).toISOString().slice(0, 10);
}

function uid_() {
  const a = 'abcdfghjkmnpqrstvwxyz', b = a + '0123456789';
  let s = a[Math.floor(Math.random() * a.length)];
  for (let i = 0; i < 7; i++) s += b[Math.floor(Math.random() * b.length)];
  return s;
}

function toClient_(h, v) {
  if (v instanceof Date) return Utilities.formatDate(v, tz_(), DATETIME_FIELDS.indexOf(h) >= 0 ? 'yyyy-MM-dd HH:mm' : 'yyyy-MM-dd');
  return v;
}

function toSheet_(h, v) {
  if (v === undefined || v === null) return '';
  if (v instanceof Date) return DATE_FIELDS.indexOf(h) >= 0 ? Utilities.formatDate(v, tz_(), 'yyyy-MM-dd') : v;
  if (DATE_FIELDS.indexOf(h) >= 0) return String(v).slice(0, 10);
  if (NUM_FIELDS.indexOf(h) >= 0) return v === '' ? '' : Number(v) || 0;
  if (typeof v === 'string' && /^[=+@]/.test(v)) return "'" + v;
  return v;
}

function headers_(s) {
  return s.getRange(1, 1, 1, s.getLastColumn()).getValues()[0];
}

function findRow_(s, id) {
  const n = s.getLastRow() - 1;
  if (n < 1 || !id) return -1;
  const ids = s.getRange(2, 1, n, 1).getValues();
  for (let i = 0; i < n; i++) if (String(ids[i][0]) === String(id)) return i + 2;
  return -1;
}

function readAll_(def) {
  const values = sh_(def).getDataRange().getValues();
  const head = values.shift() || [];
  return values.filter(r => r[0] !== '').map(r => {
    const o = {};
    head.forEach((h, i) => { if (h) o[h] = toClient_(h, r[i]); });
    return o;
  });
}

function readOne_(def, id) {
  return readAll_(def).find(r => String(r.ID) === String(id)) || null;
}

function indexBy_(rows, campo) {
  const m = {};
  rows.forEach(r => { m[r[campo || 'ID']] = r; });
  return m;
}

function insertMany_(def, objs) {
  if (!objs.length) return;
  const s = sh_(def), head = headers_(s), last = s.getLastRow();
  if (s.getMaxRows() < last + objs.length) s.insertRowsAfter(s.getMaxRows(), last + objs.length - s.getMaxRows() + 50);
  s.getRange(last + 1, 1, objs.length, head.length).setValues(objs.map(o => head.map(h => toSheet_(h, o[h]))));
}

function insert_(def, obj) {
  obj.ID = obj.ID || uid_();
  insertMany_(def, [obj]);
  return obj;
}

function update_(def, id, patch) {
  const s = sh_(def), row = findRow_(s, id);
  if (row < 0) throw new Error(def.name + ': no existe el registro ' + id);
  const head = headers_(s), rng = s.getRange(row, 1, 1, head.length), cur = rng.getValues()[0];
  rng.setValues([head.map((h, i) => h !== 'ID' && h in patch ? toSheet_(h, patch[h]) : cur[i])]);
}

function upsert_(def, o, onInsert) {
  let id = o.ID;
  if (id && findRow_(sh_(def), id) > 0) update_(def, id, o);
  else {
    id = id || uid_();
    insert_(def, Object.assign({}, onInsert || {}, o, { ID: id }));
  }
  return readOne_(def, id);
}

function deleteRows_(s, start, count) {
  if (s.getMaxRows() - s.getFrozenRows() <= count) s.insertRowsAfter(s.getMaxRows(), 1);
  s.deleteRows(start, count);
}

function remove_(def, id) {
  const s = sh_(def), row = findRow_(s, id);
  if (row > 0) deleteRows_(s, row, 1);
}

function removeWhere_(def, campo, valor) {
  const s = sh_(def), n = s.getLastRow() - 1;
  if (n < 1) return;
  const col = headers_(s).indexOf(campo) + 1;
  const vals = s.getRange(2, col, n, 1).getValues().map(r => String(r[0]));
  const v = String(valor);
  for (let i = n - 1; i >= 0; i--) {
    if (vals[i] !== v) continue;
    let j = i;
    while (j > 0 && vals[j - 1] === v) j--;
    deleteRows_(s, j + 2, i - j + 1);
    i = j;
  }
}

function withLock_(fn) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try { return fn(); } finally { lock.releaseLock(); }
}

function getConfig_() {
  const c = {};
  sh_(SHEETS.CONFIG).getDataRange().getValues().slice(1).forEach(r => { if (r[0]) c[r[0]] = toClient_('', r[1]); });
  return c;
}

function setConfig_(obj) {
  const s = sh_(SHEETS.CONFIG);
  const keys = s.getDataRange().getValues().map(r => r[0]);
  Object.keys(obj).forEach(k => {
    const i = keys.indexOf(k);
    if (i > 0) s.getRange(i + 1, 2).setValue(toSheet_('', obj[k]));
    else { s.appendRow([k, toSheet_('', obj[k])]); keys.push(k); }
  });
}

function nextFolio_() {
  const c = getConfig_();
  const n = (Number(c.FOLIO_CONSECUTIVO) || 0) + 1;
  setConfig_({ FOLIO_CONSECUTIVO: n });
  return String(c.FOLIO_PREFIJO || '') + String(n).padStart(5, '0');
}

function usuario_() {
  return Session.getActiveUser().getEmail() || Session.getEffectiveUser().getEmail();
}

function money_(n) {
  const p = (Math.round((Number(n) || 0) * 100) / 100).toFixed(2).split('.');
  return '$' + p[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + p[1];
}

function fd_(s) {
  return s ? String(s).slice(0, 10).split('-').reverse().join('/') : '';
}

function esc_(v) {
  return String(v == null ? '' : v).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]);
}

function fileId_(url) {
  return (String(url || '').match(/[-\w]{25,}/) || [])[0] || '';
}
