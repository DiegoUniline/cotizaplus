# Estado del proyecto — DOCUMENTO VIVO
> Se lee al iniciar cada sesión y se actualiza después de cada respuesta, decisión, cambio o hallazgo.

**Última actualización:** 2026-10-15 · **Agente:** arquitecto

## Dónde vamos
- **Fase:** FASE 2 — Propuesta del módulo Plataforma (modulos/plataforma.md)
- **Módulo en curso:** Plataforma — propuesta lista, NO aprobada (prueba del flujo)
- **Última pregunta:** P-032 — RESPONDIDA: no crear nada, es prueba del flujo
- **Siguiente paso exacto:** ninguno de construcción. Prueba del flujo detenida antes de FASE 3 por pedido del dueño. Si se retoma: correcciones o `APROBADO plataforma`.

## Decisiones recientes (últimas 10)
- [D-019](decisiones.md) · visión · Fase 1 a fin de diciembre 2026
- [D-020](decisiones.md) · mapa · 29 tablas aprobadas + contactos_cliente
- [D-021](decisiones.md) · usuarios · un correo = una empresa
- [D-022](decisiones.md) · marcas · varias marcas por empresa; clientes compartidos o separados (lo decide la empresa)
- [D-023](decisiones.md) · plataforma / marcas · vendedores con todas las marcas o solo asignadas: lo decide la empresa
- [D-024](decisiones.md) · relaciones · recomendaciones del Paso 1c aplicadas como 💡
- [D-025](decisiones.md) · empresas · 10 campos confirmados, sin subdominio
- [D-026](decisiones.md) · marcas · 11 campos confirmados, sin subdominio
- [D-027](decisiones.md) · usuarios_empresa · 9 campos (3 agregados por el dueño)
- [D-028](decisiones.md) · plataforma · tablas restantes 💡, pasa a FASE 2

## Propuestas pendientes de aprobación 💡
- Relaciones del Paso 1c no confirmadas (D-024): folio por marca, contacto de un cliente, contacto principal + copias, versiones, 1 cotización = 1 pedido, un vendedor por cliente, motivos configurables.
- Nota del dueño: "estamos probando, no hacemos realmente una app" — sesión de prueba del proceso.
- Campos de `empresas` — P-019.
- Límites por plan: Básico 1 usuario / 30 cotizaciones; Pro 5 / 300; Empresa ilimitado (D-006).
- Prueba de 14 días, funciones de Pro, sin tarjeta (D-007).
- El dueño de la cuenta invita a sus usuarios por correo (D-007).
- 5 días de gracia si falla un cobro de Stripe (D-005).
- Folios con prefijo y consecutivo propios por empresa (D-017).
- Plan anual con descuento para reducir comisión de Stripe (~8% en $69).

## Pendientes / bloqueos ❓
- ⚠️ Subdominio: el dueño lo quitó de empresas (P-019) y de marcas (P-029), pero D-017 lo pide. Confirmar si sale de la Fase 2.
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
| Plataforma | diseño | 2 · propuesta | 20% | P-032 + 8 ❓ |
| Catálogo | diseño | 1 · paso 1 ✅ | — | — |
| Clientes | diseño | 1 · paso 1 ✅ | — | — |
| Cotizaciones | diseño | 1 · paso 1 ✅ | — | — |
| Envío | diseño | 1 · paso 1 ✅ | — | — |
| Seguimiento | diseño | 1 · paso 1 ✅ | — | — |
| Super-admin | diseño | 1 · paso 1 ✅ | — | — |
