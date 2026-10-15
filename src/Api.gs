const ESTADOS = ['Borrador', 'Enviada', 'En seguimiento', 'Aceptada', 'Rechazada', 'Vencida'];
const ABIERTOS = ['Borrador', 'Enviada', 'En seguimiento'];
const TIPOS_SEG = ['Llamada', 'Correo', 'WhatsApp', 'Reunión', 'Nota', 'Envío', 'Cambio de estado'];

function api_bootstrap() {
  const clientes = readAll_(SHEETS.CLIENTES);
  const cli = indexBy_(clientes);
  return {
    config: getConfig_(),
    estados: ESTADOS,
    clientes: clientes,
    productos: readAll_(SHEETS.PRODUCTOS),
    cotizaciones: readAll_(SHEETS.COTIZACIONES).map(c => Object.assign(c, { ClienteNombre: (cli[c.ClienteID] || {}).Nombre || '' })),
    usuario: usuario_(),
    hoy: hoy_()
  };
}

/* ---------- Clientes ---------- */

function api_saveCliente(o) {
  if (!String(o.Nombre || '').trim()) throw new Error('El nombre es obligatorio');
  return withLock_(() => upsert_(SHEETS.CLIENTES, o, { FechaAlta: new Date() }));
}

function api_deleteCliente(id) {
  if (readAll_(SHEETS.COTIZACIONES).some(c => c.ClienteID === id)) throw new Error('El cliente tiene cotizaciones, no se puede eliminar');
  return withLock_(() => { remove_(SHEETS.CLIENTES, id); return true; });
}

/* ---------- Productos ---------- */

function api_saveProducto(o) {
  if (!String(o.Descripcion || '').trim()) throw new Error('La descripción es obligatoria');
  o.Activo = o.Activo === true || o.Activo === 'on' || o.Activo === 'true';
  o.Precio = Number(o.Precio) || 0;
  return withLock_(() => upsert_(SHEETS.PRODUCTOS, o));
}

function api_deleteProducto(id) {
  return withLock_(() => { remove_(SHEETS.PRODUCTOS, id); return true; });
}

/* ---------- Cotizaciones ---------- */

function api_getCotizacion(id) {
  const cot = readOne_(SHEETS.COTIZACIONES, id);
  if (!cot) throw new Error('Cotización no encontrada');
  return {
    cot: cot,
    cliente: readOne_(SHEETS.CLIENTES, cot.ClienteID) || {},
    partidas: readAll_(SHEETS.PARTIDAS).filter(p => p.CotizacionID === id),
    seguimiento: readAll_(SHEETS.SEGUIMIENTO).filter(s => s.CotizacionID === id)
      .sort((a, b) => String(b.FechaHora).localeCompare(String(a.FechaHora)))
  };
}

function calcular_(partidas, tasa) {
  let bruto = 0, desc = 0;
  const out = partidas.map(p => {
    const cant = Number(p.Cantidad) || 0, pu = Number(p.PrecioUnitario) || 0;
    const d = Math.min(Math.max(Number(p.DescuentoPct) || 0, 0), 100);
    const b = cant * pu, dm = b * d / 100;
    bruto += b; desc += dm;
    return {
      ProductoID: p.ProductoID || '', Descripcion: String(p.Descripcion).trim(), Cantidad: cant, Unidad: p.Unidad || '',
      PrecioUnitario: pu, DescuentoPct: d, Importe: r2_(b - dm)
    };
  });
  const iva = r2_((bruto - desc) * tasa / 100);
  return { partidas: out, totales: { Subtotal: r2_(bruto), Descuento: r2_(desc), IVA: iva, Total: r2_(bruto - desc + iva) } };
}

function r2_(n) { return Math.round(n * 100) / 100; }

function api_saveCotizacion(data) {
  const c = data.cot || {};
  if (!c.ClienteID) throw new Error('Selecciona un cliente');
  const cfg = getConfig_();
  const tasa = c.TasaIVA === '' || c.TasaIVA == null ? Number(cfg.IVA_PCT) || 0 : Number(c.TasaIVA) || 0;
  const t = calcular_((data.partidas || []).filter(p => String(p.Descripcion || '').trim() && Number(p.Cantidad) > 0), tasa);
  if (!t.partidas.length) throw new Error('Agrega al menos una partida con descripción y cantidad');

  return withLock_(() => {
    const base = Object.assign({
      ClienteID: c.ClienteID,
      Fecha: c.Fecha || hoy_(),
      Vigencia: c.Vigencia || sumarDias_(hoy_(), cfg.VIGENCIA_DIAS || 15),
      Moneda: c.Moneda || 'MXN',
      TasaIVA: tasa,
      Condiciones: c.Condiciones || '',
      PDF: '',
      UltimaActualizacion: new Date()
    }, t.totales);

    let id = c.ID;
    if (id && findRow_(sh_(SHEETS.COTIZACIONES), id) > 0) {
      update_(SHEETS.COTIZACIONES, id, base);
      removeWhere_(SHEETS.PARTIDAS, 'CotizacionID', id);
    } else {
      id = uid_();
      insert_(SHEETS.COTIZACIONES, Object.assign(base, { ID: id, Folio: nextFolio_(), Estado: 'Borrador', Vendedor: usuario_() }));
    }
    insertMany_(SHEETS.PARTIDAS, t.partidas.map(p => Object.assign(p, { ID: uid_(), CotizacionID: id })));
    return id;
  });
}

function api_duplicarCotizacion(id) {
  const d = api_getCotizacion(id);
  return api_saveCotizacion({
    cot: { ClienteID: d.cot.ClienteID, Moneda: d.cot.Moneda, TasaIVA: d.cot.TasaIVA, Condiciones: d.cot.Condiciones },
    partidas: d.partidas
  });
}

function api_deleteCotizacion(id) {
  const cot = readOne_(SHEETS.COTIZACIONES, id);
  if (!cot) return true;
  if (cot.Estado !== 'Borrador') throw new Error('Solo se pueden eliminar cotizaciones en Borrador');
  return withLock_(() => {
    removeWhere_(SHEETS.PARTIDAS, 'CotizacionID', id);
    removeWhere_(SHEETS.SEGUIMIENTO, 'CotizacionID', id);
    remove_(SHEETS.COTIZACIONES, id);
    return true;
  });
}

/* ---------- Seguimiento ---------- */

function log_(cotId, tipo, nota, accion, fecha) {
  insert_(SHEETS.SEGUIMIENTO, {
    CotizacionID: cotId, FechaHora: new Date(), Tipo: tipo, Nota: nota || '',
    ProximaAccion: accion || '', FechaProxima: fecha || '', Usuario: usuario_()
  });
}

function api_setEstado(id, estado, nota) {
  if (ESTADOS.indexOf(estado) < 0) throw new Error('Estado inválido');
  return withLock_(() => {
    const patch = { Estado: estado, UltimaActualizacion: new Date() };
    if (ABIERTOS.indexOf(estado) < 0) Object.assign(patch, { ProximoSeguimiento: '', ProximaAccion: '' });
    update_(SHEETS.COTIZACIONES, id, patch);
    log_(id, 'Cambio de estado', estado + (nota ? ': ' + nota : ''));
    return true;
  });
}

function api_addSeguimiento(o) {
  if (!o.CotizacionID || !String(o.Nota || '').trim()) throw new Error('Escribe una nota');
  return withLock_(() => {
    const cot = readOne_(SHEETS.COTIZACIONES, o.CotizacionID);
    if (!cot) throw new Error('Cotización no encontrada');
    log_(cot.ID, o.Tipo || 'Nota', o.Nota, o.ProximaAccion, o.FechaProxima);
    const patch = { ProximoSeguimiento: o.FechaProxima || '', ProximaAccion: o.ProximaAccion || '', UltimaActualizacion: new Date() };
    if (cot.Estado === 'Enviada') patch.Estado = 'En seguimiento';
    update_(SHEETS.COTIZACIONES, cot.ID, patch);
    return true;
  });
}

function registrarEnvio_(id, medio, detalle) {
  const cfg = getConfig_();
  const cot = readOne_(SHEETS.COTIZACIONES, id);
  const fecha = sumarDias_(hoy_(), cfg.DIAS_SEGUIMIENTO || 3);
  const accion = 'Confirmar recepción y dar seguimiento';
  log_(id, medio, detalle, accion, fecha);
  const patch = { ProximoSeguimiento: fecha, ProximaAccion: accion, UltimaActualizacion: new Date() };
  if (cot.Estado === 'Borrador') patch.Estado = 'Enviada';
  update_(SHEETS.COTIZACIONES, id, patch);
}

/* ---------- Envío ---------- */

function api_generarPdf(id) {
  return generarPdf_(id).getUrl();
}

function api_enviarCotizacion(id, m) {
  m = m || {};
  const cfg = getConfig_();
  const d = api_getCotizacion(id);
  const para = m.para || d.cliente.Email;
  if (!para) throw new Error('Indica un correo destino');
  const file = generarPdf_(id);
  const mensaje = m.mensaje || '';
  MailApp.sendEmail({
    to: para,
    cc: m.cc || '',
    subject: m.asunto || ('Cotización ' + d.cot.Folio),
    body: mensaje,
    htmlBody: esc_(mensaje).replace(/\n/g, '<br>'),
    attachments: [file.getBlob()],
    name: cfg.EMPRESA_NOMBRE || 'Cotizaplus',
    replyTo: usuario_()
  });
  withLock_(() => registrarEnvio_(id, 'Correo', 'Cotización enviada a ' + para + (m.cc ? ' (cc ' + m.cc + ')' : '')));
  return true;
}

function api_whatsapp(id) {
  const cot = readOne_(SHEETS.COTIZACIONES, id);
  let file = null;
  if (cot.PDF) try { file = DriveApp.getFileById(fileId_(cot.PDF)); } catch (e) { file = null; }
  file = file || generarPdf_(id);
  try { file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW); } catch (e) { /* dominio restringido */ }
  withLock_(() => registrarEnvio_(id, 'WhatsApp', 'Cotización enviada por WhatsApp'));
  return file.getUrl();
}

/* ---------- Config ---------- */

function api_saveConfig(o) {
  const num = ['IVA_PCT', 'FOLIO_CONSECUTIVO', 'VIGENCIA_DIAS', 'DIAS_SEGUIMIENTO'];
  const limpio = {};
  Object.keys(CONFIG_DEFAULT).forEach(k => {
    if (k in o) limpio[k] = num.indexOf(k) >= 0 ? Number(o[k]) || 0 : o[k];
  });
  return withLock_(() => { setConfig_(limpio); return getConfig_(); });
}
