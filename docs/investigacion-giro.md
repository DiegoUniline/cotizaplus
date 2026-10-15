# Investigación del giro

# Investigación: software de cotizaciones para PyMEs (SaaS) — 2026-10-15
> ⚠️ Se hizo después de la entrevista P-001 a P-017 (fuera de orden). Todo es 🟡 hasta que el dueño lo confirme. Búsquedas limitadas; cifras de terceros que no se pudieron contrastar con la fuente oficial van marcadas.

## Resumen
- Hay competencia barata: apps de cotización desde gratis hasta ~US$5–9/mes, y herramientas de propuestas (PandaDoc, Proposify) desde ~US$19 por usuario al mes. El precio de $69–150 MXN queda en el rango bajo. 🟡
- Lo que más valoran los usuarios de PandaDoc/Proposify: saber cuándo se abrió la propuesta, firma electrónica y recordatorios. Cotizaplus ya los incluye (P-010, P-011). 🟡
- Las quejas frecuentes son fallas técnicas, soporte lento y configuración difícil: el arranque simple es oportunidad. 🟡
- Costos variables que afectan el margen: comisión de Stripe (~3.6% + $3 MXN por cobro) y mensajes de WhatsApp (marketing ~US$0.04, utilidad ~US$0.0085 por mensaje en México, según terceros). 🟡
- Regulación: nueva LFPDPPP vigente desde el 21 de marzo de 2025; Cotizaplus guarda datos personales de clientes de sus clientes → aviso de privacidad y contrato de encargado. 🟡

## Cómo opera (flujo típico) 🟡
Cotiza → envía (correo/WhatsApp) → el cliente abre → el vendedor da seguimiento → acepta/rechaza → pedido o factura. Las herramientas líderes miden la apertura y piden firma electrónica.

## Dinero
| Concepto | Dato | Certeza / fuente |
|---|---|---|
| Stripe México, tarjeta nacional | 3.6% + $3 MXN (otras fuentes: 3.4% o 3.85%) | 🟡 terceros; confirmar en stripe.com/mx/pricing |
| Stripe, tarjeta internacional | 4.4% + $3 MXN | 🟡 terceros |
| Stripe, liquidación | 2–7 días hábiles | 🟡 terceros |
| Comisión sobre $69 | ≈ $5.48 (≈ 7.9%) | cálculo con 3.6% + $3 |
| WhatsApp marketing (México) | ≈ US$0.038–0.040 por mensaje | 🟡 terceros, cifras no coinciden |
| WhatsApp utilidad/servicio (México) | ≈ US$0.0085 por mensaje | 🟡 terceros |
| WhatsApp, respuestas dentro de 24 h a un mensaje del cliente | gratis | 🟡 terceros |

Implicación: un recordatorio de cotización probablemente cuenta como "utilidad" si se ligan a una transacción iniciada; si Meta lo clasifica como marketing cuesta ~4–5 veces más. Afecta el precio del paquete. ❓ verificar en la tabla oficial de Meta.

## Regulación aplicable
| Norma | Qué exige | Impacto en datos | Fuente |
|---|---|---|---|
| LFPDPPP (nueva, DOF 20-mar-2025, vigente 21-mar-2025) | Aviso de privacidad desde que se recaban datos; las funciones del INAI pasaron a la Secretaría Anticorrupción y Buen Gobierno | Aviso de privacidad para empresas y clientes finales; registrar consentimiento; Cotizaplus actúa como encargado de los datos de los clientes de cada empresa | 🟡 [Garrigues](https://www.garrigues.com/es_ES/noticia/mexico-nueva-ley-federal-proteccion-datos-personales-posesion-particulares-introduce), [Littler](https://www.littler.com/es/news-analysis/asap/mexico-tiene-nueva-ley-en-materia-de-proteccion-de-datos-personales) |
| CFDI | No aplica a la cotización (no es comprobante fiscal). Sí aplica si se factura la renta de Cotizaplus | ❓ si el dueño factura la renta | 🟡 |
| Firma en liga pública | Firma simple (nombre + trazo + IP + fecha); no es firma electrónica avanzada (e.firma SAT) | Guardar evidencia: nombre, imagen de firma, IP, fecha/hora, versión de la cotización | 🟡 conocimiento general, sin verificar |

## Límites técnicos de proveedores
| Proveedor | Límite | Fuente |
|---|---|---|
| Gmail (Google Workspace) | ~2,000 mensajes por usuario por día en ventana de 24 h; 500 destinatarios por mensaje vía API; cuentas de prueba 500/día; al exceder se suspende el envío hasta 24 h | [Google Workspace](https://knowledge.workspace.google.com/admin/gmail/gmail-sending-limits-in-google-workspace) |

Implicación: 50 empresas × (envíos + resumen diario + recordatorios) cabe en 2,000/día al inicio; con más empresas hará falta repartir entre cuentas o usar un servicio de envío masivo. 🟡

## Software líder
| Sistema | Fuerte en | Quejas frecuentes | Precio aprox | Fuente |
|---|---|---|---|---|
| PandaDoc | Interfaz, arranque rápido, firma | Fallas, soporte en declive | desde ~US$19/usuario/mes | 🟡 [G2](https://www.g2.com/compare/pandadoc-vs-proposify), [Capterra](https://capterra.com/p/131735/PandaDoc/reviews/) |
| Proposify | Automatización, firma, analítica de apertura | Configuración difícil, menos amigable | desde ~US$19/usuario/mes | 🟡 [G2](https://www.g2.com/compare/pandadoc-vs-proposify) |
| ApModulus (México) | Cotizaciones/presupuestos; plan PyME 2 usuarios, 100 artículos, 50 cotizaciones/mes, logo | sin datos | no visible | 🟡 [Comparasoftware](https://www.comparasoftware.com/apmoduluscom-es) |
| Zoho Billing | Cotizaciones convertibles en factura | sin datos | no visible | 🟡 [Zoho](https://www.zoho.com/es-mx/billing/features/quotes/) |
| Cotiza Pro (iOS) | Gratis con cotizaciones ilimitadas, catálogo, PDF; Pro quita marca de agua | sin datos | freemium | 🟡 [App Store](https://apps.apple.com/mx/app/cotiza-pro/id6747967324) |
| Quotient | Cotizaciones; 4.8/5 en Capterra MX | sin datos | no visible | 🟡 [Capterra MX](https://www.capterra.mx/software/131897/quotient) |

## Dolores frecuentes → oportunidad 🟡
- Herramientas en inglés y en dólares → Cotizaplus en español y pesos.
- Configuración difícil → arranque con importación de Excel y plantillas listas.
- Cobro por usuario caro → planes por empresa.
- Pocas soluciones con WhatsApp nativo en México → diferenciador.

## Volúmenes típicos (para escalabilidad) 🟡 sin verificar
- Una PyME: 20–300 cotizaciones al mes, 5–30 partidas cada una.
- 50 empresas × 150 cotizaciones × 12 meses ≈ 90,000 cotizaciones y ~1 millón de partidas el primer año. Volumen bajo para Postgres con índices por empresa.

## Integraciones típicas
Stripe, WhatsApp Business API, correo, Excel, firma electrónica, CRM/ERP. Elegidas por el dueño: Stripe, WhatsApp API, Gmail API, Excel (P-004, P-011, P-014, P-015).

## Preguntas que esto me genera (internas, se hacen una por una)
- ¿Los precios de los planes incluyen IVA? ¿Se factura la renta?
- Precio del paquete de WhatsApp considerando categoría utilidad vs marketing.
- ¿Las plantillas de WhatsApp las aprueba cada empresa con su número, o usan un número de Cotizaplus?
- Aviso de privacidad y términos de servicio.
- ¿Qué pasa con los datos si una empresa cancela?

## Fuentes
- [Google Workspace — Gmail sending limits](https://knowledge.workspace.google.com/admin/gmail/gmail-sending-limits-in-google-workspace)
- [Meta — WhatsApp pricing](https://developers.facebook.com/docs/whatsapp/pricing) (no se pudo abrir; cifras de terceros: [Message Central](https://www.messagecentral.com/blog/whatsapp-business-api-pricing-2026), [Teramont](https://teramont.net/blog/whatsapp-business-platform-service-message-pricing-2026))
- [Guía de software — pasarelas en México](https://www.guiadesoftware.com/blog/mejor-pasarela-pago-mexico), [Global66](https://www.global66.com/blog/?p=18577)
- [G2 — PandaDoc vs Proposify](https://www.g2.com/compare/pandadoc-vs-proposify), [Capterra — PandaDoc](https://capterra.com/p/131735/PandaDoc/reviews/)
- [Garrigues — nueva LFPDPPP](https://www.garrigues.com/es_ES/noticia/mexico-nueva-ley-federal-proteccion-datos-personales-posesion-particulares-introduce), [Littler](https://www.littler.com/es/news-analysis/asap/mexico-tiene-nueva-ley-en-materia-de-proteccion-de-datos-personales)
- [Comparasoftware — ApModulus](https://www.comparasoftware.com/apmoduluscom-es), [Zoho Billing](https://www.zoho.com/es-mx/billing/features/quotes/), [Cotiza Pro](https://apps.apple.com/mx/app/cotiza-pro/id6747967324), [Capterra MX — Quotient](https://www.capterra.mx/software/131897/quotient)
