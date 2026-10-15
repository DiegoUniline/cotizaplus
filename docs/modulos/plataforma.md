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
Campos confirmados en P-029 (D-026). Lleva `empresa_id uuid not null references empresas(id)`.

| Campo | Tipo | Null | Default | Qué representa | Reglas / validación | Certeza | Evidencia / origen |
|---|---|---|---|---|---|---|---|
| nombre | text | no | — | Nombre comercial de la marca | unique (empresa_id, nombre) | ✅ / 💡 regla | P-029 |
| logo | text (ruta en Storage) | sí | null | Logo para PDF y liga | png/jpg/svg ≤ 2 MB | ✅ / 💡 | P-029 |
| color_marca | text | sí | null | Color principal | `^#[0-9A-Fa-f]{6}$` | ✅ / 💡 | P-029 |
| plantilla_pdf_id | uuid → plantillas_pdf | no | plantilla base | Plantilla por defecto | — | ✅ / 💡 default | P-029 |
| razon_social | text | sí | null | Nombre fiscal | — | ✅ | P-029 |
| rfc | text | sí | null | RFC | upper, formato SAT 12–13 | ✅ / 💡 | P-029 |
| direccion | text | sí | null | Dirección en el PDF | — | ✅ | P-029 |
| prefijo_folio | text | no | — | Inicio del folio (ACME-) | 1–10 caracteres; unique (empresa_id, prefijo_folio) 💡 | ✅ / 💡 | P-029, D-024 |
| telefono | text | sí | null | Teléfono en el PDF | `^\d{10}$` | ✅ / 💡 | P-029 |
| correo | text | sí | null | Correo en el PDF | formato correo | ✅ / 💡 | P-029 |
| sitio_web | text | sí | null | Página web | URL | ✅ / 💡 | P-029 |

Quitado por el dueño: `subdominio` (también lo quitó de empresas) → ⚠️ el subdominio propio de D-017 queda fuera hasta que el dueño lo confirme.

### Tabla `usuarios_empresa`
Campos confirmados en P-030 (D-027). Lleva `empresa_id` y `user_id uuid not null unique references auth.users(id)` (un correo = una empresa, D-021).

| Campo | Tipo | Null | Default | Qué representa | Reglas / validación | Certeza | Evidencia / origen |
|---|---|---|---|---|---|---|---|
| nombre | text | no | — | Nombre corto con el que se muestra en la app | 1–60 | ✅ / 💡 interpretación | P-030 |
| nombre_completo | text | no | — | Nombre completo (firma del PDF) | 1–150 | ✅ agregado por el dueño | P-030 |
| correo | text | no | — | Correo de acceso (copia del de auth) | unique global | ✅ | P-030, D-021 |
| telefono | text | sí | null | WhatsApp del usuario | `^\d{10}$` | ✅ | P-030 |
| foto | text (Storage) | sí | null | Foto de perfil | ≤ 2 MB | ✅ | P-030 |
| rol | text | no | 'vendedor' | Dueño, gerente o vendedor | check in ('dueno','gerente','vendedor') | ✅ / 💡 default | P-030, D-008 |
| puesto | text | sí | null | Puesto que sale en la firma del PDF | ≤ 80 | ✅ | P-030 |
| fecha_alta | date | no | current_date | Fecha en que el usuario entró a la empresa (editable; distinta de created_at) | ≤ hoy | ✅ agregado / 💡 interpretación | P-030 |
| leyenda_contacto | text | sí | null | Bloque con datos de contacto del usuario que se copia automáticamente al PDF de sus cotizaciones | ≤ 500; 💡 la cotización guarda copia al emitirse | ✅ agregado / 💡 cómo se copia | P-030 |

Nota: en "Rol y firma" el dueño marcó "Something else" sin texto → no se agregó nada.

## 10. Inconsistencias ⚠️
| # | Descripción | Dónde | Impacto | Severidad |
|---|---|---|---|---|
| 1 | Se quitó `subdominio` de empresas (P-019) y de marcas (P-029), pero D-017 decidió subdominio propio | P-019, P-029 vs D-017 | ¿se elimina el subdominio de la Fase 2? | baja |

## 11. Preguntas abiertas
P-031 (campos de `invitaciones`). Confirmar si el subdominio (D-017) se elimina.
