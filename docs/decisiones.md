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
