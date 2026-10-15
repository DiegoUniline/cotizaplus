# Visión
Última actualización: 2026-10-15 · Fuente: entrevista P-001 a P-017

## Qué es
Cotizaplus es una plataforma SaaS **multiempresa** para hacer cotizaciones a clientes, enviarlas, darles seguimiento y convertirlas en pedidos. El dueño la **renta** a otras empresas. ✅ (P-001)

## Para quién
- Cualquier PyME que cotice. ✅ (P-002)
- Meta: ~50 empresas el primer año. ✅ (P-002)
- Usuarios estimados: 150–250 el primer año (50 empresas × 3–5 usuarios). 🟡 INFERIDO
- Meta a 3 años: ❓ PENDIENTE

## Usuarios y roles
| Rol | Quién | Qué hace | Certeza |
|---|---|---|---|
| Super-admin | Dueño de la plataforma | Empresas, pagos, paquetes de WhatsApp, métricas, soporte, avisos | ✅ (P-013) |
| Dueño | Dueño de cada empresa cliente | Todo en su empresa: plan, pago, usuarios, configuración | ✅ (P-007) |
| Gerente | Supervisor de la empresa | Ve y edita todo, autoriza descuentos, reportes | ✅ (P-007) |
| Vendedor | Vendedores de la empresa | Solo ve y edita **sus** clientes y cotizaciones | ✅ (P-007) |
| Cliente final | A quien se le cotiza | Abre la liga pública, acepta con firma o rechaza; sin cuenta | ✅ (P-010) |

## Canales
- Web responsiva instalable (PWA). Sin app nativa. ✅ (P-016)
- Correo con la API de Gmail desde noreply@cotizaplus.com. ✅ (P-015)
- WhatsApp: manual (liga) y automático con la API oficial de Meta, cobrado en paquetes. ✅ (P-010, P-011)

## Tecnología
- Base de datos y backend: Supabase. ✅ (P-003)
- Frontend: Next.js. ✅ (P-016)
- Pagos: Stripe + transferencia validada a mano. ✅ (P-004)
- Correo: API de Gmail (Google Cloud). ✅ (P-015)
- WhatsApp: API oficial de WhatsApp Business (Meta). ✅ (P-011)
- Hosting de Next.js: ❓ PENDIENTE

## Modelo de negocio
| Plan | Precio (MXN/mes) | Certeza |
|---|---|---|
| Básico | $69 | ✅ (P-005) |
| Pro | $150 | ✅ (P-005) |
| Empresa | A cotizar | ✅ (P-005) |

- Límites por plan (usuarios, cotizaciones/mes, funciones): 💡 PROPUESTO, ver D-006.
- Registro libre con prueba gratis. ✅ (P-006) · Duración 14 días y sin tarjeta: 💡 PROPUESTO.
- WhatsApp automático cobrado aparte en paquetes de mensajes. ✅ (P-011) · Precio del paquete: ❓ PENDIENTE.
- Precios con o sin IVA y facturación de la renta: ❓ PENDIENTE.

## Problema que resuelve (por qué pagan)
Hacer cotizaciones profesionales rápido, saber si el cliente las vio y no perder el seguimiento. 🟡 INFERIDO de P-008 a P-012; ❓ confirmar con el dueño.

## Alcance
### Fase 1 — MVP, meta fin de diciembre 2026 ✅ (P-017)
- Registro, prueba, planes, Stripe y transferencia
- Empresas, usuarios, roles e invitaciones
- Catálogo con atributos e imágenes; importar catálogo y clientes desde Excel
- Cotizaciones con partidas, totales por tipo de cobro y plantillas de PDF
- Envío por correo (Gmail API) y WhatsApp manual
- Liga pública con Aceptar/Rechazar y aviso de "visto"
- Bitácora de seguimiento, Kanban y resumen diario al vendedor
- Panel de super-administrador

### Fase 2 — después ✅ (P-017)
- WhatsApp automático (API de Meta) y paquetes de mensajes
- Recordatorios automáticos al cliente final
- Firma del cliente al aceptar
- Pedidos con folio propio
- Seis reportes con exportación a Excel
- ~~Subdominio propio por empresa~~ → eliminado (D-029)
- Aprobación de descuentos (plan Empresa)

### Fuera de alcance
- Facturación CFDI. ✅ (P-014: no se eligió)
- API para terceros y conexión con Google Sheets/AppSheet. ✅ (P-014: no se eligió)
- App nativa en tiendas. ✅ (P-016)

## Módulos y orden recomendado 💡 PROPUESTO
1. Plataforma: empresas, usuarios, roles, planes, suscripciones, pagos
2. Catálogo: atributos y productos
3. Clientes
4. Cotizaciones: partidas, totales, folios, plantillas
5. Envío y liga pública
6. Seguimiento: bitácora, Kanban, resumen diario
7. Super-administrador
8. Fase 2: pedidos, recordatorios, WhatsApp, reportes, descuentos
