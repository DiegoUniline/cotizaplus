# Módulo: Plataforma
Conocimiento: en diseño (FASE 1, Paso 2) | Última actualización: 2026-10-15 | Fuente: diseño

## 1. Propósito
Cuentas que rentan Cotizaplus (empresas), sus marcas, usuarios, planes, suscripciones y pagos. ✅ (D-001, D-004, D-022)

## 2. Entidades y diccionario de datos
Campos técnicos en todas las tablas (💡): `id uuid pk default gen_random_uuid()`, `activo boolean not null default true`, `created_at timestamptz not null default now()`, `created_by uuid`, `updated_at timestamptz`, `updated_by uuid`. `empresas` no lleva `empresa_id` (es la raíz).

### Tabla `empresas`
Campos de negocio confirmados en P-019 (D-025). Comportamiento de cada campo (Paso 3) y procesos (Paso 4): 💡 sin preguntar, el dueño pidió suponer y avanzar.

| Campo | Tipo | Null | Default | Qué representa | Reglas / validación | Certeza | Evidencia / origen |
|---|---|---|---|---|---|---|---|
| nombre | text | no | — | Nombre de la cuenta | 1–120 caracteres | ✅ campo / 💡 regla | P-019 |
| correo | text | no | — | Correo de contacto de la cuenta | formato correo, minúsculas | ✅ / 💡 | P-019 |
| telefono | text | sí | null | Teléfono de contacto | `^\d{10}$` | ✅ / 💡 | P-019 |
| clientes_por_marca | boolean | no | false | Si los clientes se separan por marca | si cambia con clientes existentes → ❓ | ✅ / 💡 default | P-019, D-022 |
| vendedores_por_marca | boolean | no | false | Si los vendedores solo usan sus marcas asignadas | usa `usuario_marcas` | ✅ / 💡 default | P-019, D-023 |
| zona_horaria | text | no | 'America/Mexico_City' | Hora local para resumen diario y recordatorios | lista fija de zonas IANA de México | ✅ / 💡 | P-019 |
| moneda | text | no | 'MXN' | Moneda por defecto de cotizaciones nuevas | check in ('MXN','USD') | ✅ / 💡 | P-019 |
| tasa_iva | numeric(7,4) | sí | 0.1600 | IVA por defecto (null = exento) | in (0.16, 0.08, 0) o null | ✅ / 💡 | P-019 |
| vigencia_dias | int | no | 15 | Días de vigencia por defecto | 1–365 | ✅ / 💡 default | P-019 |
| condiciones | text | sí | null | Pie de cotización por defecto | ≤ 4,000 caracteres | ✅ | P-019 |

Quitado por el dueño: `subdominio` ⚠️ (contradice D-017 "subdominio propio por empresa"; 💡 propuesta: pasa a `marcas`, ver P-029).
Movidos a `marcas` (D-022): logo, color de marca, razón social, RFC, dirección, sitio web, prefijo de folio, plantilla PDF.

### Tabla `marcas`
❓ Campos por confirmar (P-029).

## 10. Inconsistencias ⚠️
| # | Descripción | Dónde | Impacto | Severidad |
|---|---|---|---|---|
| 1 | Se quitó `subdominio` de empresas, pero D-017 decidió subdominio propio | P-019 vs D-017 | dónde vive el subdominio (Fase 2) | baja |

## 11. Preguntas abiertas
P-029 (campos de `marcas`).
