function instalarTriggers() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'tareaDiaria')
    .forEach(t => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('tareaDiaria').timeBased().everyDays(1).atHour(8).create();
}

function tareaDiaria() {
  const hoy = hoy_(), en3 = sumarDias_(hoy, 3);
  const cfg = getConfig_();
  const cli = indexBy_(readAll_(SHEETS.CLIENTES));
  const cots = readAll_(SHEETS.COTIZACIONES);
  const abierta = c => ABIERTOS.indexOf(c.Estado) >= 0;

  const vencidas = cots.filter(c => abierta(c) && c.Vigencia && c.Vigencia < hoy);
  if (vencidas.length) withLock_(() => vencidas.forEach(c => {
    update_(SHEETS.COTIZACIONES, c.ID, { Estado: 'Vencida', ProximoSeguimiento: '', ProximaAccion: '', UltimaActualizacion: new Date() });
    log_(c.ID, 'Cambio de estado', 'Vencida automáticamente (vigencia ' + fd_(c.Vigencia) + ')');
    c.Estado = 'Vencida';
  }));

  const pend = cots.filter(c => abierta(c) && c.ProximoSeguimiento && c.ProximoSeguimiento <= hoy)
    .sort((a, b) => String(a.ProximoSeguimiento).localeCompare(String(b.ProximoSeguimiento)));
  const porVencer = cots.filter(c => abierta(c) && c.Vigencia && c.Vigencia <= en3);

  const fallback = cfg.EMAIL_NOTIFICACIONES || Session.getEffectiveUser().getEmail();
  const grupos = {};
  const add = (c, k) => {
    const to = c.Vendedor || fallback;
    (grupos[to] = grupos[to] || { pend: [], venc: [], prox: [] })[k].push(c);
  };
  pend.forEach(c => add(c, 'pend'));
  vencidas.forEach(c => add(c, 'venc'));
  porVencer.forEach(c => add(c, 'prox'));

  const url = ScriptApp.getService().getUrl();
  Object.keys(grupos).forEach(to => {
    const g = grupos[to];
    MailApp.sendEmail({
      to: to,
      cc: cfg.EMAIL_NOTIFICACIONES && cfg.EMAIL_NOTIFICACIONES !== to ? cfg.EMAIL_NOTIFICACIONES : '',
      subject: 'Cotizaplus: ' + g.pend.length + ' seguimientos pendientes · ' + fd_(hoy),
      htmlBody:
        tablaCorreo_('Seguimientos para hoy o atrasados', g.pend, cli) +
        tablaCorreo_('Por vencer en 3 días', g.prox, cli) +
        tablaCorreo_('Vencidas hoy', g.venc, cli) +
        (url ? '<p style="font-family:Arial"><a href="' + url + '">Abrir Cotizaplus</a></p>' : '')
    });
  });
}

function tablaCorreo_(titulo, rows, cli) {
  if (!rows.length) return '';
  const th = 'style="text-align:left;padding:6px 8px"';
  const td = 'style="padding:6px 8px;border-bottom:1px solid #e3e8ee"';
  return '<h3 style="font-family:Arial;color:#13233a">' + titulo + ' (' + rows.length + ')</h3>' +
    '<table style="border-collapse:collapse;font-family:Arial;font-size:13px">' +
    '<tr style="background:#13233a;color:#fff"><th ' + th + '>Folio</th><th ' + th + '>Cliente</th><th ' + th + '>Total</th>' +
    '<th ' + th + '>Estado</th><th ' + th + '>Seguimiento</th><th ' + th + '>Acción</th><th ' + th + '>Vigencia</th></tr>' +
    rows.map(c => '<tr><td ' + td + '>' + esc_(c.Folio) + '</td><td ' + td + '>' + esc_((cli[c.ClienteID] || {}).Nombre) +
      '</td><td ' + td + ' align="right">' + money_(c.Total) + ' ' + esc_(c.Moneda) + '</td><td ' + td + '>' + esc_(c.Estado) +
      '</td><td ' + td + '>' + fd_(c.ProximoSeguimiento) + '</td><td ' + td + '>' + esc_(c.ProximaAccion) +
      '</td><td ' + td + '>' + fd_(c.Vigencia) + '</td></tr>').join('') +
    '</table>';
}
