# Mapa del sistema
Última actualización: 2026-10-15 · Estado: ✅ tablas aprobadas en P-018 (D-020); campos por definir tabla por tabla · diagrama: [diagrama-er.md](diagrama-er.md)

Todas las tablas de negocio llevan `id`, `empresa_id`, `activo`, `created_at/by`, `updated_at/by` y RLS por empresa (D-001).

| # | Módulo | Tabla | Para qué | Fase | Origen | Certeza |
|---|---|---|---|---|---|---|
| 1 | Plataforma | empresas | Cada negocio que renta Cotizaplus: logo, colores, subdominio, prefijo de folio, plantilla por defecto | 1 | D-001, D-017 | ✅ |
| 2 | Plataforma | usuarios_empresa | Qué usuario pertenece a qué empresa y con qué rol (el login lo guarda Supabase Auth) | 1 | D-008 | ✅ |
| 3 | Plataforma | invitaciones | Invitaciones por correo pendientes de aceptar | 1 | D-007 | ✅ |
| 4 | Plataforma | planes | Básico, Pro, Empresa con precio y límites | 1 | D-004, D-006 | ✅ |
| 5 | Plataforma | suscripciones | Plan vigente de cada empresa, periodo y estado (prueba, activa, vencida, suspendida) | 1 | D-004, D-007 | ✅ |
| 6 | Plataforma | pagos | Cobros de Stripe y transferencias con comprobante | 1 | D-005 | ✅ |
| 7 | Catálogo | atributos | Campos que crea cada empresa (Color, Medida, Modelo) y su tipo | 1 | D-010 | ✅ |
| 8 | Catálogo | atributo_opciones | Valores de un atributo tipo lista (Rojo, Azul) | 1 | D-010 | ✅ |
| 9 | Catálogo | productos | Catálogo con imagen, precio, unidad, tipo de cobro y valores de atributos | 1 | D-009, D-010 | ✅ |
| 10 | Clientes | clientes | A quién se le cotiza; con vendedor asignado | 1 | D-008 | ✅ |
| 10b | Clientes | contactos_cliente | Personas de contacto de un cliente (compras, pagos…) | 1 | D-020 | ✅ |
| 11 | Cotizaciones | cotizaciones | Encabezado, estado, totales por tipo de cobro, código de liga pública | 1 | D-009, D-012 | ✅ |
| 12 | Cotizaciones | cotizacion_partidas | Renglones: imagen, descripción, atributos, serie, tipo de cobro, cantidad, precio, descuento | 1 | D-009 | ✅ |
| 13 | Cotizaciones | folios | Último consecutivo por empresa y tipo de documento (cotización, pedido) | 1 | D-017 | ✅ |
| 14 | Cotizaciones | plantillas_pdf | Diseños de PDF disponibles | 1 | D-017 | ✅ |
| 15 | Envío | envios | Cada envío: canal, destinatario, fecha, resultado | 1 | D-011 | ✅ |
| 16 | Envío | vistas_cotizacion | Cada apertura de la liga pública | 1 | D-011 | ✅ |
| 17 | Envío | respuestas_cliente | Aceptación o rechazo desde la liga: nombre, motivo, IP, firma (firma en Fase 2) | 1 | D-011 | ✅ |
| 18 | Seguimiento | seguimientos | Bitácora de contactos y siguiente paso | 1 | D-012 | ✅ |
| 19 | Seguimiento | motivos_rechazo | Lista de motivos de rechazo | 1 | D-012 | ✅ |
| 20 | Catálogo/Clientes | importaciones | Registro de cada importación desde Excel con filas y errores | 1 | D-016 | ✅ |
| 21 | Super-admin | avisos_plataforma | Avisos para todas las empresas | 1 | D-015 | ✅ |
| 22 | Super-admin | accesos_soporte | Registro de cada entrada en modo "ver como" | 1 | D-015 | ✅ |
| 23 | Pedidos | pedidos | Pedido con folio propio generado al aceptar | 2 | D-016 | ✅ |
| 24 | Pedidos | pedido_partidas | Renglones copiados de la cotización | 2 | D-016 | ✅ |
| 25 | Recordatorios | recordatorios_config | Configuración por empresa: canal, cada cuántos días, máximo por día, horario | 2 | D-012 | ✅ |
| 26 | Recordatorios | recordatorios_programados | Cola de recordatorios por enviar | 2 | D-012 | ✅ |
| 27 | WhatsApp | whatsapp_paquetes | Paquetes de mensajes comprados por empresa | 2 | D-013 | ✅ |
| 28 | WhatsApp | whatsapp_movimientos | Cada mensaje consumido y saldo | 2 | D-013 | ✅ |
| 29 | Cotizaciones | aprobaciones_descuento | Solicitudes de descuento y quién autoriza (plan Empresa) | 2 | D-006 | ✅ |

## % conocimiento por módulo
| módulo | fase | % conocimiento | ❓ abiertas |
|---|---|---|---|
| (se llena al detallar cada tabla) | | | |
