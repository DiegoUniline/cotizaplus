function generarPdf_(id) {
  const d = api_getCotizacion(id);
  const cfg = getConfig_();
  const t = HtmlService.createTemplateFromFile('Pdf');
  Object.assign(t, { d: d, cfg: cfg, logo: logo_(cfg.LOGO_URL), money: money_, fd: fd_, esc: esc_ });
  const nombre = d.cot.Folio + ' - ' + (d.cliente.Empresa || d.cliente.Nombre || '') + '.pdf';
  const blob = t.evaluate().getBlob().getAs(MimeType.PDF).setName(nombre);
  const file = carpeta_(cfg).createFile(blob);
  withLock_(() => update_(SHEETS.COTIZACIONES, id, { PDF: file.getUrl() }));
  return file;
}

function carpeta_(cfg) {
  if (cfg.CARPETA_PDF_ID) {
    try { return DriveApp.getFolderById(cfg.CARPETA_PDF_ID); } catch (e) { /* se crea otra */ }
  }
  const f = DriveApp.createFolder('Cotizaplus - PDFs');
  withLock_(() => setConfig_({ CARPETA_PDF_ID: f.getId() }));
  return f;
}

function logo_(src) {
  if (!src) return '';
  const cache = CacheService.getScriptCache();
  const key = 'logo_' + Utilities.base64EncodeWebSafe(Utilities.computeDigest(Utilities.DigestAlgorithm.MD5, String(src)));
  const hit = cache.get(key);
  if (hit) return hit;
  try {
    const drive = !/^https?:/i.test(src) || /(drive|docs)\.google\.com/i.test(src);
    const blob = drive ? DriveApp.getFileById(fileId_(src) || src).getBlob() : UrlFetchApp.fetch(src).getBlob();
    const uri = 'data:' + blob.getContentType() + ';base64,' + Utilities.base64Encode(blob.getBytes());
    if (uri.length < 100000) cache.put(key, uri, 21600);
    return uri;
  } catch (e) {
    return '';
  }
}
