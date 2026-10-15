# Estado del proyecto — DOCUMENTO VIVO
> Se lee al iniciar cada sesión y se actualiza después de cada respuesta, decisión, cambio o hallazgo.

**Última actualización:** 2026-10-15 · **Agente:** arquitecto

## Dónde vamos
- **Fase:** FASE 1 — Diseño de datos, Paso 2 (campos por tabla)
- **Módulo en curso:** Plataforma · tabla `empresas`
- **Última pregunta:** P-019 (campos de `empresas`: ¿agrego, quito o cambio alguno?) — ABIERTA
- **Siguiente paso exacto:** esperar P-019; luego Paso 3 (comportamiento de campos de `empresas` que lo requieran, uno por mensaje), Paso 4 procesos, Paso 5 resumen y siguiente tabla (`usuarios_empresa`).

## Decisiones recientes (últimas 10)
- [D-011](decisiones.md) · envío · correo, WhatsApp, liga pública, firma, visto
- [D-012](decisiones.md) · seguimiento · estados, bitácora, Kanban, recordatorios configurables
- [D-013](decisiones.md) · seguimiento · WhatsApp automático con API oficial, paquetes aparte
- [D-014](decisiones.md) · reportes · seis reportes + Excel
- [D-015](decisiones.md) · super-admin · panel de plataforma
- [D-016](decisiones.md) · integraciones · importar Excel y pedidos
- [D-017](decisiones.md) · plataforma · plantillas, subdominio, correo noreply con Gmail API
- [D-018](decisiones.md) · visión · PWA con Next.js + Supabase
- [D-019](decisiones.md) · visión · Fase 1 a fin de diciembre 2026
- [D-020](decisiones.md) · mapa · 29 tablas aprobadas + contactos_cliente

## Propuestas pendientes de aprobación 💡
- Campos de `empresas` — P-019.
- Límites por plan: Básico 1 usuario / 30 cotizaciones; Pro 5 / 300; Empresa ilimitado (D-006).
- Prueba de 14 días, funciones de Pro, sin tarjeta (D-007).
- El dueño de la cuenta invita a sus usuarios por correo (D-007).
- 5 días de gracia si falla un cobro de Stripe (D-005).
- Folios con prefijo y consecutivo propios por empresa (D-017).
- Plan anual con descuento para reducir comisión de Stripe (~8% en $69).

## Pendientes / bloqueos ❓
- Precio de los paquetes de WhatsApp (D-013).
- ¿Los precios de planes incluyen IVA? ¿Se factura la renta?
- Opciones A/B en una cotización y retenciones (D-009).
- Qué pasa con los datos de una empresa que cancela.
- Dominio cotizaplus.com: ¿disponible o ya es del dueño?
- Aviso de privacidad y términos de servicio (nueva LFPDPPP).
- Quién programa la Fase 1 y empresas piloto (D-018).
- Hosting de Next.js.
- Meta de empresas a 3 años.

## Notas
- La rama `claude/nifty-carson-mjb4zu` tiene un prototipo en Apps Script hecho ANTES de la entrevista; no corresponde al diseño actual. No borrar sin `CONFIRMO borrar rama` del dueño.
- Existe un documento compartido "Cotizaplus — Documentación funcional" (claude.ai artifact). Es una copia de lectura; la fuente de verdad es /docs.
- Reglas rotas en la sesión inicial (registradas): se escribió código antes de entrevistar y se hicieron varias preguntas por mensaje; la investigación del giro se hizo al final.

## Módulos
| módulo | fuente | fase | % conocimiento | ❓ abiertas |
|---|---|---|---|---|
| Plataforma | diseño | 1 · paso 2 (empresas) | — | P-019 |
| Catálogo | diseño | 1 · paso 1 ✅ | — | — |
| Clientes | diseño | 1 · paso 1 ✅ | — | — |
| Cotizaciones | diseño | 1 · paso 1 ✅ | — | — |
| Envío | diseño | 1 · paso 1 ✅ | — | — |
| Seguimiento | diseño | 1 · paso 1 ✅ | — | — |
| Super-admin | diseño | 1 · paso 1 ✅ | — | — |
