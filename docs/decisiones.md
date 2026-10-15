# Decisiones

### D-001 · visión · 2026-10-15
**Decisión:** Cotizaplus es un SaaS multiempresa que se renta a otras empresas. ✅
**Origen:** P-001
**Consecuencias:** toda tabla de negocio lleva `empresa_id` con RLS; hay tabla de empresas, planes y suscripciones.

### D-002 · visión · 2026-10-15
**Decisión:** mercado = cualquier PyME que cotice; meta ~50 empresas el primer año. ✅
**Origen:** P-002
**Consecuencias:** el modelo no puede depender de un giro; atributos de producto configurables (D-010).

### D-003 · visión · 2026-10-15
**Decisión:** base de datos y backend en Supabase con app web. ✅
**Origen:** P-003
**Consecuencias:** Postgres con RLS por empresa, Auth y Storage de Supabase.

### D-004 · plataforma · 2026-10-15
**Decisión:** la renta se cobra por planes (Básico, Pro, Empresa). ✅
**Origen:** P-004
**Consecuencias:** tablas de planes y suscripciones; límites validados en BD.

### D-005 · plataforma · 2026-10-15
**Decisión:** dos métodos de pago: Stripe (automático) y transferencia (el super-admin la valida a mano). ✅
**Origen:** P-004
**Consecuencias:** tabla de pagos con método y comprobante; webhooks de Stripe.
- Días de gracia si falla un cobro (ej. 5): 💡 PROPUESTO, sin aprobar.

### D-006 · plataforma · 2026-10-15
**Decisión:** precios Básico $69/mes, Pro $150/mes, Empresa a cotizar. ✅
**Origen:** P-005
**Consecuencias:** 💡 PROPUESTO sin confirmar: límites Básico 1 usuario / 30 cotizaciones al mes; Pro 5 / 300; Empresa ilimitado; recordatorios automáticos desde Pro; aprobación de descuentos solo en Empresa.

### D-007 · plataforma · 2026-10-15
**Decisión:** registro libre con prueba gratis. ✅
**Origen:** P-006
**Consecuencias:** estados de suscripción incluyen "prueba". 💡 PROPUESTO: 14 días, funciones de Pro, sin tarjeta; el dueño de la cuenta invita a sus usuarios por correo.

### D-008 · plataforma · 2026-10-15
**Decisión:** roles Dueño, Gerente, Vendedor; el vendedor solo ve sus clientes y cotizaciones. ✅
**Origen:** P-007
**Consecuencias:** clientes y cotizaciones llevan vendedor asignado; RLS filtra por empresa y, para vendedor, por usuario.

### D-009 · cotizaciones · 2026-10-15
**Decisión:** cada partida lleva imagen, descripción, tipo de cobro (pago único, mensual, por hora), número de serie y atributos como medidas y colores. ✅
**Origen:** P-008
**Consecuencias:** totales separados por tipo de cobro (💡 PROPUESTO cómo mostrarlos). Opciones A/B y retenciones: ❓ PENDIENTE.

### D-010 · catálogo · 2026-10-15
**Decisión:** cada empresa define sus propios atributos (Color, Medida, Modelo…); el número de serie se captura al cotizar. ✅
**Origen:** P-009
**Consecuencias:** tabla de atributos por empresa; valores en producto y en partida.

### D-011 · envío · 2026-10-15
**Decisión:** envío por PDF en correo, WhatsApp con liga, liga pública con Aceptar/Rechazar, firma del cliente y aviso de "visto". ✅
**Origen:** P-010
**Consecuencias:** cada cotización tiene un código público; registro de vistas, respuestas y firma.

### D-012 · seguimiento · 2026-10-15
**Decisión:** estados Borrador → Enviada → Vista → En negociación → Aceptada / Rechazada / Vencida; bitácora; resumen diario al vendedor; motivo de rechazo obligatorio; tablero Kanban; recordatorios automáticos al cliente configurables por cada empresa (cada cuántos días y máximo de mensajes por día). ✅
**Origen:** P-011
**Consecuencias:** máquina de estados en BD; tabla de configuración de recordatorios y cola de envíos.

### D-013 · seguimiento · 2026-10-15
**Decisión:** recordatorios automáticos por correo y WhatsApp con la API oficial de Meta; WhatsApp se cobra aparte en paquetes de mensajes. ✅
**Origen:** P-011
**Consecuencias:** saldo de mensajes por empresa y movimientos de consumo. Precio del paquete: ❓ PENDIENTE.

### D-014 · reportes · 2026-10-15
**Decisión:** seis reportes (cotizado vs ganado, tasa de cierre por vendedor, motivos de rechazo, productos más cotizados/vendidos, tiempo de cierre, por vencer/atrasados) con exportación a Excel. ✅
**Origen:** P-012
**Consecuencias:** índices por empresa + fecha + estado + vendedor.

### D-015 · super-admin · 2026-10-15
**Decisión:** panel de super-administrador con empresas, validación de transferencias, activar/suspender, paquetes de WhatsApp, métricas (MRR, altas, bajas, conversión), modo "ver como" y avisos generales. ✅
**Origen:** P-013
**Consecuencias:** rol de plataforma fuera de las empresas; bitácora de accesos de soporte.

### D-016 · integraciones · 2026-10-15
**Decisión:** solo importar catálogo y clientes desde Excel, y generar pedido al aceptar. Sin CFDI, sin API, sin Sheets/AppSheet. ✅
**Origen:** P-014
**Consecuencias:** tablas de pedidos; proceso de importación.

### D-017 · plataforma · 2026-10-15
**Decisión:** varias plantillas de PDF, subdominio propio por empresa, correo desde noreply@cotizaplus.com enviado con la API de Gmail. ✅
**Origen:** P-015
**Consecuencias:** empresas guarda subdominio y plantilla; límite de Gmail de ~2,000 envíos/día por cuenta (ver investigación). Folios con prefijo propio por empresa: 💡 PROPUESTO.

### D-018 · visión · 2026-10-15
**Decisión:** web responsiva instalable (PWA) construida con Next.js + Supabase. ✅
**Origen:** P-016
**Consecuencias:** sin app nativa. Quién programa: ❓ PENDIENTE.

### D-019 · visión · 2026-10-15
**Decisión:** dos fases; Fase 1 (MVP) a fin de diciembre de 2026, Fase 2 después (ver 00-vision.md). ✅
**Origen:** P-017
**Consecuencias:** ~11 semanas para la Fase 1.

### D-020 · mapa de tablas · 2026-10-15
**Decisión:** se aprueba el mapa de 29 tablas propuesto y se agrega `contactos_cliente`. ✅
**Origen:** P-018
**Consecuencias:** un cliente puede tener varios contactos; los campos de cada tabla se definen una por una (FASE 1, Paso 2).

### D-021 · plataforma / usuarios · 2026-10-15
**Decisión:** un correo (usuario) pertenece a una sola empresa. ✅
**Origen:** P-020
**Consecuencias:** `usuarios_empresa` con `unique(user_id)`; sin selector de empresa. Las varias "empresas" del dueño se manejan como marcas (D-022).

### D-022 · plataforma / marcas · 2026-10-15
**Decisión:** una empresa puede tener varias marcas, cada una con su logo, colores y datos. Cada empresa configura si sus clientes se comparten entre marcas o cada cliente pertenece a una sola marca. ✅
**Origen:** P-020
**Consecuencias:** nueva tabla `marcas`; `empresas` guarda el ajuste `clientes_por_marca` (sí/no); `clientes.marca_id` obligatorio solo si la empresa separa por marca; `cotizaciones.marca_id` = con qué marca sale. ❓ Pendiente: qué datos son de la marca y cuáles de la empresa, folios por marca, vendedores por marca.

### D-023 · plataforma / marcas · 2026-10-15
**Decisión:** cada empresa configura si sus vendedores cotizan con todas las marcas o solo con las asignadas. ✅
**Origen:** P-021
**Consecuencias:** ajuste `vendedores_por_marca` en empresas; tabla `usuario_marcas` (N:M) usada solo si está activo; RLS filtra por marca cuando aplica.

### D-024 · relaciones · 2026-10-15
**Decisión:** 💡 PROPUESTO (el dueño pidió suponer y avanzar, P-022): folio por marca; contacto de un solo cliente; cotización a un contacto principal con copias opcionales; editar una enviada crea versión nueva; cerradas no se editan; una cotización = un pedido; un vendedor por cliente; motivos de rechazo configurables con seed.
**Origen:** P-022 a P-028 (no confirmadas)
**Consecuencias:** folios con llave (empresa, marca, tipo); prefijo de folio en `marcas`; `cotizaciones` con `version` y `cotizacion_origen_id`; `envios` con destinatarios en copia; `pedidos.cotizacion_id` único. Todo revisable al aprobar el módulo.

### D-025 · plataforma / empresas · 2026-10-15
**Decisión:** `empresas` guarda nombre, correo, telefono, clientes_por_marca, vendedores_por_marca, zona_horaria, moneda, tasa_iva, vigencia_dias y condiciones. Sin subdominio. ✅
**Origen:** P-019
**Consecuencias:** diccionario en modulos/plataforma.md. ⚠️ Choca con D-017 (subdominio propio); 💡 se propone mover subdominio a `marcas` (P-029). Reglas de campo y defaults: 💡 sin confirmar.

### D-026 · plataforma / marcas · 2026-10-15
**Decisión:** `marcas` guarda nombre, logo, color_marca, plantilla_pdf, razon_social, rfc, direccion, prefijo_folio, telefono, correo, sitio_web. ✅
**Origen:** P-029
**Consecuencias:** el PDF y la liga toman imagen y datos de la marca. ⚠️ El dueño quitó el subdominio también de marcas: contradice D-017; se confirma al aprobar el módulo.

### D-027 · plataforma / usuarios_empresa · 2026-10-15
**Decisión:** `usuarios_empresa` guarda nombre, nombre_completo, correo, telefono, foto, rol, puesto, fecha_alta y leyenda_contacto. ✅
**Origen:** P-030
**Consecuencias:** 💡 interpretación: nombre = nombre corto en la app y nombre_completo = firma del PDF; fecha_alta es editable y distinta de created_at; leyenda_contacto se copia al PDF de las cotizaciones del usuario (la cotización guarda copia al emitirse).

### D-028 · plataforma · 2026-10-15
**Decisión:** el dueño pidió terminar el Paso 2 y avanzar: `invitaciones`, `usuario_marcas`, `planes`, `suscripciones` y `pagos` quedan con campos 💡 PROPUESTOS; se pasa a FASE 2 con la propuesta completa del módulo. ✅ (avanzar) / 💡 (contenido)
**Origen:** P-031
**Consecuencias:** modulos/plataforma.md completo con estados, procesos, casos borde, permisos, escalabilidad y criterios de aceptación. Espera `APROBADO plataforma`.

### D-029 · plataforma · 2026-10-15
**Decisión:** sin subdominio. Todos entran a cotizaplus.com; la liga del cliente es cotizaplus.com/c/<código> con el logo de la marca. ✅ Reemplaza la parte de subdominio de D-017.
**Origen:** cierre de módulo X-01 (contradicción D-017 vs P-019/P-029)
**Consecuencias:** se quita "Subdominio propio por empresa" de la Fase 2; sin campo subdominio.

### D-030 · plataforma · 2026-10-15
**Decisión:** se confirman límites y funciones por plan (Básico 1 usuario/30 cotizaciones; Pro 5/300; Empresa ilimitado; recordatorios desde Pro; aprobación de descuentos solo Empresa), prueba de 14 días con funciones de Pro sin tarjeta y 5 días de gracia. ✅ Confirma los 💡 de D-005, D-006 y D-007.
**Origen:** cierre de módulo Plataforma, grupo 2
**Consecuencias:** valores de `planes` y `suscripciones` confirmados.

### D-031 · plataforma · 2026-10-15
**Decisión:** ✅ precios de planes con IVA incluido; al dar de baja a un usuario el dueño elige a quién pasan sus clientes y cotizaciones (si no, al dueño); 3 plantillas de PDF iniciales (clásica, moderna, minimalista); un segundo pago del mismo periodo extiende un periodo más; empresa cancelada: solo lectura 30 días para exportar y luego se borran sus datos; al activar clientes por marca, los existentes pasan a la marca principal y el dueño puede moverlos.
**Origen:** cierre de módulo Plataforma (Q-01..Q-03, QS-03, QS-09, QS-12)
**Consecuencias:** `planes.precio_mensual` con IVA; RPC de baja de usuario con reasignación; seed de 3 plantillas; job de borrado a 30 días tras cancelación (requiere aviso en términos de servicio).

### D-032 · plataforma · 2026-10-15
**Decisión:** APROBADO plataforma (100% confirmado en el cierre). ✅ Por indicación del dueño es prueba del flujo: no se genera SQL ni código.
**Origen:** cierre de módulo + aprobación del dueño
**Consecuencias:** módulo Plataforma cerrado; sigue FASE 1 del módulo Catálogo.

### D-033 · catálogo / atributos · 2026-10-15
**Decisión:** `atributos` guarda nombre, tipo (texto, lista, medida, número), unidad y obligatorio. Sin orden ni editable_al_cotizar. ✅
**Origen:** P-034
**Consecuencias:** orden de aparición = alfabético o de creación (💡, se define en Paso 3); si el vendedor puede cambiar el valor en la partida queda ❓ para el Paso 3.

### D-034 · catálogo / atributo_opciones · 2026-10-15
**Decisión:** `atributo_opciones` guarda valor y ajuste_precio. ✅
**Origen:** P-035 (con repregunta)
**Consecuencias:** al elegir una opción en la partida, el precio unitario suma o resta el ajuste (💡 cómo se calcula, Paso 3).

### D-035 · catálogo / productos · 2026-10-15
**Decisión:** `productos` guarda nombre, imagen, unidad, precio, tipo_cobro y valores de atributos (como el mapa D-020). Sin sku ni descripcion. ✅
**Origen:** P-036 (contradicción resuelta)
**Consecuencias:** al cotizar se copian a la partida; la descripción de la partida se captura en la cotización (D-009). Importar de Excel se empareja por nombre (sin SKU).
