function doGet() {
  return app_();
}

function app_() {
  return HtmlService.createTemplateFromFile('Index').evaluate()
    .setTitle('Cotizaplus')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(nombre) {
  return HtmlService.createHtmlOutputFromFile(nombre).getContent();
}

function onOpen() {
  SpreadsheetApp.getUi().createMenu('Cotizaplus')
    .addItem('Abrir app', 'abrirApp')
    .addSeparator()
    .addItem('Configurar hojas', 'setup')
    .addItem('Activar recordatorios diarios', 'instalarTriggers')
    .addItem('Ejecutar revisión diaria ahora', 'tareaDiaria')
    .addToUi();
}

function abrirApp() {
  SpreadsheetApp.getUi().showModalDialog(app_().setWidth(1300).setHeight(820), 'Cotizaplus');
}
