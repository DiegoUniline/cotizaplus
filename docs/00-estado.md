# Estado del proyecto — DOCUMENTO VIVO
> Se lee al iniciar cada sesión y se actualiza después de cada respuesta, decisión, cambio o hallazgo.

**Última actualización:** 2026-10-15 · **Agente:** arquitecto

## Dónde vamos
- **Fase:** FASE 1 — módulo Catálogo, Paso 2 (campos por tabla)
- **Módulo en curso:** Catálogo · tabla `productos` (atributos D-033, atributo_opciones D-034 ✅)
- **Última pregunta:** P-036 (marcar campos de `productos`) — ABIERTA
- **Siguiente paso exacto:** registrar P-034; luego `atributo_opciones` y `productos` (Paso 2), pasos 3–4 con propuestas para marcar, y cierre de módulo Catálogo (≥ 90%).

## Decisiones recientes (últimas 10)
- [D-025](decisiones.md) · empresas · 10 campos confirmados, sin subdominio
- [D-026](decisiones.md) · marcas · 11 campos confirmados, sin subdominio
- [D-027](decisiones.md) · usuarios_empresa · 9 campos (3 agregados por el dueño)
- [D-028](decisiones.md) · plataforma · tablas restantes 💡, pasa a FASE 2
- [D-029](decisiones.md) · plataforma · sin subdominio
- [D-030](decisiones.md) · plataforma · límites, prueba y gracia confirmados
- [D-031](decisiones.md) · plataforma · IVA incluido, reasignación, plantillas, casos borde
- [D-032](decisiones.md) · plataforma · APROBADO (sin SQL, prueba)
- [D-033](decisiones.md) · atributos · nombre, tipo, unidad, obligatorio
- [D-034](decisiones.md) · atributo_opciones · valor + ajuste_precio

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
| Catálogo | diseño | 1 · paso 2 (productos) | — | P-036 |
| Clientes | diseño | 1 · paso 1 ✅ | — | — |
| Cotizaciones | diseño | 1 · paso 1 ✅ | — | — |
| Envío | diseño | 1 · paso 1 ✅ | — | — |
| Seguimiento | diseño | 1 · paso 1 ✅ | — | — |
| Super-admin | diseño | 1 · paso 1 ✅ | — | — |
