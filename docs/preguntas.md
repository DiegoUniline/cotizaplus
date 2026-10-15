# Preguntas

> Nota: P-001 a P-017 se hicieron el 2026-10-15 en chat antes de instalar las reglas de "una pregunta por mensaje"; algunas incluían varias subpreguntas. Las partes que el dueño no contestó quedan marcadas ❓ o 💡.

### P-001 · visión · ALTA · RESPONDIDA
**Contexto:** define si el sistema es interno o se renta.
**Pregunta:** ¿Qué vende tu empresa y qué lleva una cotización típica?
**Respuesta:** "Es una plataforma multiempresa, o sea la quiero rentar." → SaaS multiempresa. (D-001)

### P-002 · visión · ALTA · RESPONDIDA
**Pregunta:** ¿A qué tipo de empresas se lo vas a rentar y cuántas esperas el primer año?
**Opciones:** A) cualquier PyME B) un giro específico C) clientes actuales de Uniline
**Respuesta:** A cualquier PyME que cotice, unas 50 el primer año. (D-002)

### P-003 · visión · ALTA · RESPONDIDA
**Pregunta:** ¿Sobre qué tecnología se monta?
**Opciones:** A) Apps Script + Google Sheets B) AppSheet C) base de datos real (Supabase) + app web
**Respuesta:** C. (D-003)

### P-004 · plataforma · ALTA · RESPONDIDA
**Pregunta:** ¿Cómo se cobra la renta? ¿Cobro automático o manual?
**Opciones:** A) fijo por empresa B) por usuario C) por planes D) no sé · Cobro: A) Stripe B) manual C) manual y luego automático
**Respuesta:** C (por planes). Cobro: "ambos, puede ser Stripe o transferencia". (D-004, D-005)

### P-005 · plataforma · ALTA · RESPONDIDA
**Pregunta:** ¿Qué diferencia un plan de otro y cuánto cuesta cada uno?
**Propuesta mostrada:** Básico 1 usuario / 30 cotizaciones; Pro 5 usuarios / 300 cotizaciones; Empresa ilimitado; recordatorios automáticos desde Pro; aprobación de descuentos solo en Empresa.
**Respuesta:** "69 pesos el Básico, 150 el Pro y el Empresa a cotizar." No comentó los límites → quedan 💡 PROPUESTO. (D-006)

### P-006 · plataforma · ALTA · RESPONDIDA
**Pregunta:** ¿Cómo entra una empresa nueva? ¿Quién invita a los vendedores?
**Opciones:** A) registro libre B) registro libre con prueba gratis C) solo por invitación
**Respuesta:** B. Duración (14 días) y "sin tarjeta" eran ejemplo → 💡 PROPUESTO. Quién invita: sin respuesta → 💡 PROPUESTO el dueño de la cuenta por correo. (D-007)

### P-007 · plataforma · ALTA · RESPONDIDA
**Pregunta:** ¿Qué roles hay en cada empresa? ¿El vendedor ve los clientes de otros?
**Propuesta mostrada:** Dueño, Gerente, Vendedor.
**Respuesta:** "Sí así, el vendedor solo ve los suyos." (D-008)

### P-008 · cotizaciones · ALTA · RESPONDIDA
**Pregunta:** ¿Qué datos lleva una cotización? ¿Algo más (imágenes, opciones A/B, retenciones, campos personalizados)?
**Respuesta:** "Sí, necesito que lleve imagen, descripción, forma (si es pago único, mensual, por hora), si lleva algún número de serie, medidas o colores." Opciones A/B y retenciones: sin respuesta → ❓ PENDIENTE. (D-009)

### P-009 · catálogo · ALTA · RESPONDIDA
**Pregunta:** ¿Cómo se manejan los atributos (color, medida, serie)? ¿La serie se captura al cotizar?
**Opciones:** A) texto libre B) variantes en catálogo C) atributos que define cada empresa
**Respuesta:** C; la serie se captura al cotizar. (D-010)

### P-010 · envío · ALTA · RESPONDIDA
**Pregunta:** ¿Cómo se envía la cotización al cliente?
**Opciones:** A) PDF por correo B) WhatsApp con liga C) liga pública con Aceptar/Rechazar D) firma del cliente E) aviso de visto
**Respuesta:** Todas: A, B, C, D y E. (D-011)

### P-011 · seguimiento · ALTA · RESPONDIDA
**Pregunta:** ¿Cómo funciona el seguimiento? ¿Por qué canal salen los recordatorios automáticos al cliente?
**Propuesta mostrada:** estados Borrador → Enviada → Vista → En negociación → Aceptada / Rechazada / Vencida; bitácora; resumen diario al vendedor; motivo de rechazo obligatorio.
**Respuesta:** "Sí así; agrega el Kanban y recordatorios al cliente configurados por el cliente: cada cuántos [días] y cuántos mensajes por día." Canal: B (correo + WhatsApp automático con API oficial), "cobrado aparte como paquete de mensajes". (D-012, D-013)

### P-012 · reportes · MEDIA · RESPONDIDA
**Pregunta:** ¿Qué reportes necesita el dueño/gerente? ¿Exportar a Excel?
**Propuesta mostrada:** cotizado vs ganado por mes, tasa de cierre por vendedor, motivos de rechazo, productos más cotizados/vendidos, tiempo promedio de cierre, por vencer y atrasados.
**Respuesta:** "Sí así, y que se pueda exportar a Excel." (D-014)

### P-013 · super-admin · MEDIA · RESPONDIDA
**Pregunta:** ¿Qué necesitas en tu panel de super-administrador?
**Propuesta mostrada:** empresas con plan y estado, validar transferencias, activar/suspender, cargar paquetes de WhatsApp, MRR/altas/bajas/conversión, modo "ver como", avisos generales.
**Respuesta:** "Sí así." (D-015)

### P-014 · integraciones · MEDIA · RESPONDIDA
**Pregunta:** ¿Qué integraciones? A) CFDI B) importar catálogo y clientes de Excel C) pedido al aceptar D) Google Sheets/AppSheet E) API F) ninguna
**Respuesta:** "B y C nomás." (D-016)

### P-015 · plataforma · MEDIA · RESPONDIDA
**Pregunta:** ¿Cuánta personalización por empresa? (plantillas de PDF, folios, subdominio, correo)
**Respuesta:** Varias plantillas, subdominio propio, correo desde noreply. Después: "usando la API de Google Cloud Gmail para el envío". Folios con prefijo propio: sin respuesta → 💡 PROPUESTO. (D-017)

### P-016 · visión · ALTA · RESPONDIDA
**Pregunta:** ¿En qué dispositivos y quién lo construye?
**Opciones:** A) web responsiva PWA B) web + app nativa · 1) Next.js + Supabase 2) Lovable 3) externo
**Respuesta:** A, Next.js con Supabase (reconfirmó A). Quién programa: ❓ PENDIENTE. (D-018)

### P-017 · visión · ALTA · RESPONDIDA
**Pregunta:** ¿Estás de acuerdo con la división Fase 1 (MVP) / Fase 2 y cuál es la fecha meta?
**Respuesta:** "Sí de acuerdo, para fin de diciembre." (D-019)

### P-018 · mapa de tablas · ALTA · RESPONDIDA
**Contexto:** FASE 1, Paso 1. Mapa de tablas propuesto en /docs/00-mapa.md.
**Pregunta:** ¿Agrego, quito o cambio alguna tabla? (o "OK")
**Recomendación:** revisar sobre todo contactos de cliente y plantillas, que no se han decidido.
**Impacto en datos:** define todas las tablas a detallar.
**Respuesta:** "OK. Sí agrega contactos_cliente." (D-020)

### P-019 · plataforma / empresas · ALTA · RESPONDIDA
**Contexto:** FASE 1, Paso 2. Primera tabla del orden: `empresas`. Campos propuestos (sin técnicos):
| campo | qué guarda | tipo | ¿obligatorio? | certeza |
|---|---|---|---|---|
| nombre_comercial | nombre que ven sus clientes | texto | sí | 💡 |
| razon_social | nombre fiscal | texto | no | 💡 |
| rfc | RFC de la empresa | texto 12–13 | no | 💡 |
| logo | logo para PDF, liga y app | archivo/foto | no | 💡 (D-017) |
| color_marca | color principal en PDF y liga | texto (#RRGGBB) | no | 💡 (D-017) |
| subdominio | acme.cotizaplus.com | texto | sí | 💡 (D-017, Fase 2) |
| correo | correo de contacto de la empresa | correo | sí | 💡 |
| telefono | teléfono o WhatsApp de la empresa | texto 10 dígitos | no | 💡 |
| direccion | dirección que sale en el PDF | texto | no | 💡 |
| sitio_web | página web | texto | no | 💡 |
| prefijo_folio | inicio del folio (ACME-) | texto | sí | 💡 (D-017) |
| plantilla_pdf | plantilla por defecto | relación con plantillas_pdf | sí | 💡 (D-017) |
| moneda | moneda por defecto | lista fija: MXN, USD | sí | 💡 |
| tasa_iva | IVA por defecto | lista fija: 16%, 8%, 0%, exento | sí | 💡 |
| vigencia_dias | días de vigencia por defecto | número | sí | 💡 |
| condiciones | texto por defecto del pie de la cotización | texto largo | no | 💡 |
| zona_horaria | para resumen diario y recordatorios | lista fija | sí | 💡 |
**Pregunta:** ¿Agrego, quito o cambio algún campo? (o "OK")
**Recomendación:** OK — cubre lo decidido en D-017 y lo que sale en el PDF.
**Impacto en datos:** estructura de `empresas`.
**Respuesta:** EN PAUSA — el dueño pidió primero diagrama ER y preguntas de relaciones (Paso 1b/1c). Reanudada con lista ajustada: datos de imagen, fiscales y folio pasan a `marcas` (D-022, D-024).
**Respuesta final (selección):** se quedan nombre, correo, telefono, clientes_por_marca, vendedores_por_marca, zona_horaria, moneda, tasa_iva, vigencia_dias, condiciones. Quitó: subdominio ⚠️ (choca con D-017). (D-025)

### P-020 · plataforma / usuarios · ALTA · RESPONDIDA
**Contexto:** usuarios_empresa une un login con una empresa; define si el login es por empresa o compartido.
**Pregunta:** ¿Un mismo usuario (mismo correo) puede trabajar en varias empresas de Cotizaplus?
**Opciones:** A) Sí, con un selector de empresa al entrar  B) No, un correo = una sola empresa
**Recomendación:** A — ya está modelado así, permite contadores, consultores o un vendedor que trabaja para dos negocios; costo: un selector de empresa.
**Impacto en datos:** usuarios_empresa (N:M usuario↔empresa) o empresa_id directo en el perfil.
**Respuesta:** ⚠️ AMBIGUA — eligió "No, un correo = una empresa" y enseguida aclaró: "yo Diego León tengo muchas empresas y cada una su logotipo, colores, etc." Se repregunta.
**Repregunta:** ¿varias empresas separadas con el mismo correo, una cuenta con varias marcas, o las dos?
**Respuesta final:** "Una empresa puede tener muchas marcas, y [la empresa] debe decidir si se separa el cliente por [marca] o cada cliente para una sola [marca]." → un correo = una empresa; varias marcas dentro de la empresa; la empresa configura si los clientes se comparten o se separan por marca. (D-021, D-022)

### P-021 · plataforma / marcas · ALTA · RESPONDIDA
**Contexto:** Con varias marcas por empresa (D-022) hay que definir qué ve y usa cada vendedor.
**Pregunta:** ¿Un vendedor puede cotizar con todas las marcas de la empresa, o solo con las que el dueño le asigne?
**Opciones:** A) Solo con las marcas asignadas  B) Con todas las marcas  C) Lo decide cada empresa
**Recomendación:** A — si un vendedor trabaja solo para una de tus marcas no debe ver ni cotizar con las otras; asignarle todas sigue siendo posible.
**Impacto en datos:** tabla usuario_marcas (N:M) y RLS por marca.
**Respuesta:** C) Lo decide cada empresa. (D-023)

### P-022 · plataforma / folios · ALTA · RESPONDIDA
**Contexto:** Con varias marcas (D-022) hay que definir cómo se numeran las cotizaciones.
**Pregunta:** ¿El folio de las cotizaciones es por marca o uno solo para toda la empresa?
**Opciones:** A) Por marca (ACME-00001, BETA-00001)  B) Uno solo por empresa  C) Lo decide cada empresa
**Recomendación:** A — si cada marca se presenta como un negocio distinto, sus folios no deben brincar números de la otra.
**Impacto en datos:** folios con llave (empresa, marca, tipo) o (empresa, tipo); prefijo en marcas o en empresas.
**Respuesta:** El dueño: "ya supón que tienes todos los datos, pasa al siguiente punto; estamos probando, no hacemos realmente una app" → se aplica la recomendación como 💡 PROPUESTO: folio por marca. (D-024)

### P-023 a P-028 · relaciones · Paso 1c · NO SE PREGUNTARON
**Contexto:** el dueño pidió saltar al siguiente punto ("supón que tienes todos los datos"). Se aplican las recomendaciones como 💡 PROPUESTO (D-024), sin confirmar:
- P-023 · ¿Un contacto puede pertenecer a dos clientes? → 💡 No, cada contacto es de un cliente.
- P-024 · ¿A quién le llega la cotización? → 💡 A un contacto principal, con copia opcional a otros contactos del cliente.
- P-025 · ¿Editar una cotización enviada? → 💡 Crea una versión nueva (v2) y la anterior queda guardada; aceptada/rechazada/vencida no se editan (se duplica).
- P-026 · ¿Cotización ↔ pedido? → 💡 Una cotización aceptada genera un solo pedido.
- P-027 · ¿Vendedores por cliente? → 💡 Uno solo; dueño o gerente lo reasignan.
- P-028 · ¿Motivos de rechazo? → 💡 Lista configurable por empresa con valores iniciales (precio, tiempo de entrega, eligió a la competencia, otro).

### P-029 · plataforma / marcas · ALTA · RESPONDIDA
**Contexto:** FASE 1 Paso 2, tabla `marcas` (D-022). Campos propuestos: nombre, logo, color_marca, razon_social, rfc, direccion, telefono, correo, sitio_web, prefijo_folio, plantilla_pdf, subdominio (💡 movido desde empresas por la inconsistencia con D-017).
**Pregunta:** ¿Cuáles campos de `marcas` se quedan?
**Recomendación:** todos.
**Impacto en datos:** estructura de `marcas`.
**Respuesta:** se quedan nombre, logo, color_marca, plantilla_pdf, razon_social, rfc, direccion, prefijo_folio, telefono, correo, sitio_web. Quitó: subdominio. (D-026)

### P-030 · plataforma / usuarios_empresa · ALTA · RESPONDIDA
**Contexto:** FASE 1 Paso 2. Campos propuestos: nombre, correo (login), telefono, foto, rol (dueño/gerente/vendedor), puesto (sale en la firma del PDF).
**Pregunta:** ¿Cuáles campos de `usuarios_empresa` se quedan?
**Recomendación:** todos.
**Impacto en datos:** estructura de `usuarios_empresa`.
**Respuesta:** se quedan nombre, correo, telefono, foto, rol, puesto. Agregó: "Fecha de Alta", "Nombre Completo", "Leyenda donde podamos poner sus datos de contacto y se jalen". Marcó "Something else" sin texto (ignorado). (D-027)

### P-031 · plataforma / invitaciones · MEDIA · RESPONDIDA
**Contexto:** FASE 1 Paso 2. Campos propuestos: correo, nombre_completo, rol, marcas (si vendedores_por_marca), mensaje. Automáticos: estado, vence_el, invitado_por.
**Pregunta:** ¿Cuáles campos de `invitaciones` se quedan?
**Recomendación:** todos.
**Impacto en datos:** estructura de `invitaciones`.
**Respuesta:** El dueño: "ya termina y avanza siguiente paso" → campos 💡 como se propusieron; tablas restantes de Plataforma (planes, suscripciones, pagos, usuario_marcas) propuestas 💡 y se pasa a FASE 2. (D-028)

### P-032 · plataforma · ALTA · RESPONDIDA
**Contexto:** FASE 2. Propuesta completa en modulos/plataforma.md.
**Pregunta:** ¿Apruebas el módulo Plataforma?
**Opciones:** A) APROBADO plataforma  B) Tengo correcciones
**Recomendación:** B si alguno de los 💡 de §5–§7 no te convence; los ❓ pueden quedar abiertos y no bloquean el SQL.
**Impacto en datos:** con APROBADO se genera la migración SQL (FASE 3).
**Respuesta:** "No crees nada, recuerda que no haremos la app, estamos probando el flujo." → sin APROBADO; no se genera SQL ni rama.

### P-033 · plataforma · cierre X-01 · RESPONDIDA
**Pregunta:** Antes "subdominio propio" (D-017), luego lo quitaste de empresas y marcas. ¿Cuál queda?
**Opciones:** A) Sin subdominio  B) Por empresa  C) Por marca
**Recomendación:** A
**Respuesta:** A) Sin subdominio. (D-029)
