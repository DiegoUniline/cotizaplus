# Estado del proyecto — DOCUMENTO VIVO
> Se lee al iniciar cada sesión y se actualiza después de cada respuesta, decisión, cambio o hallazgo.

**Última actualización:** 2026-10-15 · **Agente:** arquitecto

## Dónde vamos
- **Fase:** FASE 1 — módulo Cotizaciones, Paso 2 (campos por tabla)
- **Módulo en curso:** Cotizaciones · tabla `cotizaciones` (Clientes ✅ APROBADO D-043, sin SQL)
- **Última pregunta:** P-039 (¿qué campos de `cotizaciones` quitas?) — ABIERTA
- **Siguiente paso exacto:** registrar P-039; luego `cotizacion_partidas`, `folios`, `plantillas_pdf`; cierre de módulo Cotizaciones (≥ 90%).

## Decisiones recientes (últimas 10)
- [D-034](decisiones.md) · atributo_opciones · valor + ajuste_precio
- [D-035](decisiones.md) · productos · como el mapa, sin sku ni descripción
- [D-036](decisiones.md) · catálogo · corrección: no marcado ≠ quitar
- [D-037](decisiones.md) · catálogo · atributos sin orden/editable; productos con sku y descripción
- [D-038](decisiones.md) · catálogo · compartido, producto limitable a marcas
- [D-039](decisiones.md) · catálogo · alfabético, sin IVA, partida editable, importar actualiza
- [D-040](decisiones.md) · catálogo · APROBADO (sin SQL)
- [D-041](decisiones.md) · clientes · 10 campos
- [D-042](decisiones.md) · contactos · 7 campos
- [D-043](decisiones.md) · clientes · APROBADO (96%, Q-01 💡)

## Propuestas pendientes de aprobación 💡
- Relaciones del Paso 1c fuera de Plataforma (D-024): folio por marca, contacto de un cliente, contacto principal + copias, versiones, 1 cotización = 1 pedido, un vendedor por cliente, motivos configurables → se confirman en el cierre de cada módulo.
- Nota del dueño: sesión de prueba del flujo; no generar SQL ni app.

## Pendientes / bloqueos ❓
- Precio de los paquetes de WhatsApp (D-013).
- ¿Se factura (CFDI) la renta de Cotizaplus?
- Opciones A/B en una cotización y retenciones (D-009).
- Dominio cotizaplus.com: ¿disponible o ya es del dueño?
- Aviso de privacidad y términos de servicio (nueva LFPDPPP; necesarios para el borrado a 30 días, D-031).
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
| Plataforma | diseño | ✅ APROBADO (sin SQL) | 100% | — |
| Catálogo | diseño | ✅ APROBADO (sin SQL) | 100% | — |
| Clientes | diseño | ✅ APROBADO (sin SQL) | 96% | Q-01 💡 |
| Cotizaciones | diseño | 1 · paso 2 (cotizaciones) | — | P-039 |
| Envío | diseño | 1 · paso 1 ✅ | — | — |
| Seguimiento | diseño | 1 · paso 1 ✅ | — | — |
| Super-admin | diseño | 1 · paso 1 ✅ | — | — |
