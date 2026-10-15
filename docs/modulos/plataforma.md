# Módulo: Plataforma
Conocimiento: 9% (✅ 6 / 65 ítems del cierre, §12) | Última actualización: 2026-10-15 | Fuente: diseño | FASE 2 — propuesta, espera `APROBADO plataforma`

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

### Tabla `usuario_marcas` 💡
Solo llaves (D-023). Se usa cuando `empresas.vendedores_por_marca = true`.
| Campo | Tipo | Null | Default | Qué representa | Reglas / validación | Certeza | Evidencia / origen |
|---|---|---|---|---|---|---|---|
| empresa_id | uuid → empresas | no | — | Empresa | igual a la del usuario y la marca (trigger) | 💡 | D-023 |
| usuario_empresa_id | uuid → usuarios_empresa | no | — | Vendedor | unique (usuario_empresa_id, marca_id) | 💡 | D-023 |
| marca_id | uuid → marcas | no | — | Marca asignada | — | 💡 | D-023 |

### Tabla `invitaciones` 💡 (el dueño pidió suponer, P-031 sin respuesta)
| Campo | Tipo | Null | Default | Qué representa | Reglas / validación | Certeza | Evidencia / origen |
|---|---|---|---|---|---|---|---|
| empresa_id | uuid → empresas | no | — | Empresa que invita | — | 💡 | D-007 |
| correo | text | no | — | A quién se invita | lower; no puede pertenecer ya a otra empresa (D-021); unique (empresa_id, correo) where estado='pendiente' | 💡 | D-007, D-021 |
| nombre_completo | text | no | — | Prellenado del usuario | — | 💡 | D-027 |
| rol | text | no | 'vendedor' | Rol que tendrá | check in ('dueno','gerente','vendedor') | 💡 | D-008 |
| marca_ids | uuid[] | sí | null | Marcas que se le asignarán | solo si vendedores_por_marca | 💡 | D-023 |
| mensaje | text | sí | null | Texto opcional del correo | ≤ 500 | 💡 | — |
| token_hash | text | no | — | Hash del enlace (el token nunca se guarda en claro) | unique | 💡 | seguridad |
| estado | text | no | 'pendiente' | pendiente, aceptada, cancelada, vencida | check | 💡 | — |
| vence_at | timestamptz | no | now() + 7 días | Caducidad del enlace | — | 💡 | — |
| invitado_por | uuid → usuarios_empresa | no | — | Quién invitó | rol dueño | 💡 | D-007 |

### Tabla `planes` 💡 (global, la administra el super-admin; sin empresa_id)
| Campo | Tipo | Null | Default | Qué representa | Reglas / validación | Certeza | Evidencia / origen |
|---|---|---|---|---|---|---|---|
| codigo | text | no | — | basico, pro, empresa | unique | ✅ planes / 💡 campo | D-004 |
| nombre | text | no | — | Básico, Pro, Empresa | — | ✅ | D-004 |
| precio_mensual | numeric(14,2) | sí | — | 69.00, 150.00; null = a cotizar | ≥ 0 | ✅ montos / ❓ ¿incluye IVA? | D-006 |
| max_usuarios | int | sí | — | 1, 5, null = ilimitado | > 0 | 💡 | D-006 |
| max_cotizaciones_mes | int | sí | — | 30, 300, null = ilimitado | > 0 | 💡 | D-006 |
| recordatorios_automaticos | boolean | no | false | Pro y Empresa | — | 💡 | D-006 |
| aprobacion_descuentos | boolean | no | false | Solo Empresa | — | 💡 | D-006 |
| stripe_price_id | text | sí | null | Precio en Stripe | null en Empresa | 💡 | D-005 |
| publico | boolean | no | true | Se muestra en la página de registro | Empresa = false | 💡 | — |

### Tabla `suscripciones` 💡
| Campo | Tipo | Null | Default | Qué representa | Reglas / validación | Certeza | Evidencia / origen |
|---|---|---|---|---|---|---|---|
| empresa_id | uuid → empresas | no | — | Empresa | una sola vigente: unique (empresa_id) where estado <> 'cancelada' | 💡 | D-004 |
| plan_id | uuid → planes | no | — | Plan contratado | — | ✅ | D-004 |
| estado | text | no | 'prueba' | prueba, activa, vencida, suspendida, cancelada | máquina de estados §5 | 💡 | D-007 |
| metodo_pago | text | sí | null | stripe, transferencia | check | ✅ | D-005 |
| precio_acordado | numeric(14,2) | sí | null | Precio del plan Empresa (a cotizar) | obligatorio si plan = empresa | 💡 | D-006 |
| prueba_hasta | date | sí | alta + 14 días | Fin de la prueba | — | 💡 14 días | D-007 |
| periodo_inicio | date | sí | null | Inicio del periodo pagado | — | 💡 | — |
| periodo_fin | date | sí | null | Fin del periodo pagado | > periodo_inicio | 💡 | — |
| gracia_hasta | date | sí | null | Fin de días de gracia tras fallo de cobro | periodo_fin + 5 días | 💡 5 días | D-005 |
| stripe_customer_id | text | sí | null | Cliente en Stripe | unique | 💡 | D-005 |
| stripe_subscription_id | text | sí | null | Suscripción en Stripe | unique | 💡 | D-005 |
| cancelada_at | timestamptz | sí | null | Cuándo se pidió la cancelación | — | 💡 | — |

### Tabla `pagos` 💡
| Campo | Tipo | Null | Default | Qué representa | Reglas / validación | Certeza | Evidencia / origen |
|---|---|---|---|---|---|---|---|
| empresa_id | uuid → empresas | no | — | Empresa | — | 💡 | D-005 |
| suscripcion_id | uuid → suscripciones | no | — | Suscripción que paga | — | 💡 | D-005 |
| metodo | text | no | — | stripe, transferencia | check | ✅ | D-005 |
| monto | numeric(14,2) | no | — | Monto pagado | > 0 | 💡 | — |
| moneda | text | no | 'MXN' | Moneda | check in ('MXN') | 💡 | — |
| periodo_desde / periodo_hasta | date | no | — | Periodo que cubre | hasta > desde | 💡 | — |
| estado | text | no | — | por_validar, aprobado, rechazado, fallido, reembolsado | §5 | 💡 | D-005 |
| comprobante | text (Storage) | sí | null | Archivo de la transferencia | obligatorio si metodo = transferencia | ✅ | D-005 |
| referencia | text | sí | null | Referencia bancaria | — | 💡 | — |
| stripe_invoice_id | text | sí | null | Factura de Stripe | unique (idempotencia de webhooks) | 💡 | D-005 |
| validado_por / validado_at | uuid / timestamptz | sí | null | Super-admin que validó | solo super-admin | ✅ | D-005, D-015 |
| motivo_rechazo | text | sí | null | Por qué se rechazó | obligatorio si estado = rechazado | 💡 | — |
| registrado_por | uuid | sí | null | Quién subió el comprobante (dueño) | — | 💡 | — |

**Super-admin** 💡: no es una tabla; se marca en Supabase Auth (`app_metadata.rol = 'super_admin'`) y lo lee una función `es_super_admin()`.

## 3. Catálogos
| Catálogo | FIJO / CONFIGURABLE | Valores iniciales (seed) | ¿El cliente puede borrar seed? | Certeza |
|---|---|---|---|---|
| Roles | FIJO | dueno, gerente, vendedor | no | ✅ D-008 |
| Planes | Tabla global (super-admin) | basico $69, pro $150, empresa a cotizar | solo super-admin; no se borra si tiene suscripciones | ✅ D-006 / 💡 límites |
| Estado suscripción | FIJO | prueba, activa, vencida, suspendida, cancelada | no | 💡 |
| Estado pago | FIJO | por_validar, aprobado, rechazado, fallido, reembolsado | no | 💡 |
| Estado invitación | FIJO | pendiente, aceptada, cancelada, vencida | no | 💡 |
| Moneda | FIJO | MXN, USD | no | ✅ P-019 |
| Tasa IVA | FIJO | 16%, 8%, 0%, exento | no | ✅ P-019 |
| Zona horaria | FIJO | zonas IANA de México | no | ✅ P-019 |
| Plantillas PDF | Tabla global de Cotizaplus | ❓ cuáles | no | 💡 (módulo Cotizaciones) |

## 4. Relaciones
| Campo | Apunta a | Cardinalidad | ON DELETE | Qué pasa si se da de baja el padre | Certeza |
|---|---|---|---|---|---|
| marcas.empresa_id | empresas | N:1 | restrict | empresa cancelada → ver §7 #9 | 💡 |
| usuarios_empresa.empresa_id | empresas | N:1 | restrict | — | 💡 |
| usuarios_empresa.user_id | auth.users | 1:1 | restrict | — | ✅ D-021 |
| usuario_marcas.* | usuarios_empresa, marcas | N:M | cascade | al desactivar marca o usuario la asignación deja de aplicar | 💡 |
| invitaciones.empresa_id | empresas | N:1 | cascade | — | 💡 |
| suscripciones.plan_id | planes | N:1 | restrict | un plan con suscripciones no se borra, se oculta (publico=false) | 💡 |
| suscripciones.empresa_id | empresas | N:1 | restrict | historial de suscripciones se conserva | 💡 |
| pagos.suscripcion_id | suscripciones | N:1 | restrict | pagos nunca se borran | 💡 |
| marcas.plantilla_pdf_id | plantillas_pdf | N:1 | restrict | — | 💡 |

## 5. Estados
### Suscripción 💡
| Estado | Significado | Pasa a | Quién lo cambia | Condición | Certeza |
|---|---|---|---|---|---|
| prueba | 14 días con funciones de Pro | activa / vencida / cancelada | sistema / dueño | pago aprobado → activa; fin de prueba sin pago → vencida | 💡 |
| activa | pagada y al corriente | vencida / cancelada | sistema (webhook o cron) / dueño | periodo_fin + gracia sin pago → vencida | 💡 |
| vencida | sin pago; **solo lectura** | activa / suspendida / cancelada | sistema / super-admin | pago aprobado → activa | 💡 |
| suspendida | bloqueada por el super-admin; sin acceso salvo dueño a facturación | activa | super-admin | — | ✅ D-015 / 💡 alcance |
| cancelada | el dueño canceló; acceso hasta periodo_fin | — (final) | dueño / super-admin | datos ❓ (§7 #9) | 💡 |

### Pago 💡
| Estado | Significado | Pasa a | Quién lo cambia | Condición | Certeza |
|---|---|---|---|---|---|
| por_validar | transferencia con comprobante subido | aprobado / rechazado | super-admin | — | ✅ D-005 |
| aprobado | cuenta para el periodo | reembolsado | sistema (Stripe) / super-admin | — | 💡 |
| fallido | cargo de Stripe rechazado | — | sistema | activa gracia | 💡 |
| rechazado | comprobante inválido | — | super-admin | motivo obligatorio | 💡 |
| reembolsado | devuelto | — | super-admin | — | 💡 |

### Invitación 💡: pendiente → aceptada (el invitado crea su acceso) · cancelada (dueño) · vencida (7 días, cron).

## 6. Procesos 💡 (todos en RPC transaccional)
### 6.1 Alta de empresa (registro libre, D-007)
Disparador: alguien se registra. Pasos en `registrar_empresa()`: crea auth user → `empresas` con defaults → primera `marcas` (con el nombre de la empresa y prefijo derivado) → `usuarios_empresa` rol dueño → `suscripciones` estado prueba, plan Pro, prueba_hasta = hoy + 14 → seeds (motivos de rechazo, etc.). Si algo falla, no queda nada.
### 6.2 Invitar usuario
Dueño → `invitar_usuario()`: valida límite de usuarios del plan (contando activos + invitaciones pendientes), que el correo no esté en otra empresa, crea invitación, envía correo (Gmail API). Aceptar → `aceptar_invitacion(token)`: crea usuarios_empresa (+ usuario_marcas), marca aceptada.
### 6.3 Edición
Empresa y marcas: dueño y gerente. Cambiar `prefijo_folio` solo afecta folios futuros. Cambiar `leyenda_contacto` no altera cotizaciones ya emitidas (guardan copia).
### 6.4 Baja
Usuarios: baja lógica (`activo=false`); sus clientes y cotizaciones deben reasignarse (❓ a quién por defecto). Marcas: baja lógica; no se usan en cotizaciones nuevas. Empresas: no se borran; se cancelan.
### 6.5 Reactivación
Usuario o marca: `activo=true` si el plan lo permite (límite de usuarios).
### 6.6 Pago con Stripe
Checkout → webhook `invoice.paid` → `registrar_pago_stripe()` idempotente por `stripe_invoice_id` → pago aprobado → suscripción activa con nuevo periodo. `invoice.payment_failed` → pago fallido → gracia 5 días.
### 6.7 Pago por transferencia
Dueño sube comprobante → pago por_validar → super-admin aprueba (`validar_pago()`: pago aprobado + periodo + suscripción activa) o rechaza con motivo.
### 6.8 Cambio de plan
Subir: inmediato (Stripe prorratea). Bajar: al fin del periodo y solo si los usuarios activos caben en el nuevo límite.
### 6.9 Revisión diaria (cron)
Vence pruebas y periodos, aplica gracia, vence invitaciones.

## 7. Qué pasa si… (casos borde) 💡
| # | Escenario | Comportamiento esperado | Certeza |
|---|---|---|---|
| 1 | Stripe manda el mismo webhook dos veces | `stripe_invoice_id` único: el segundo no hace nada | 💡 |
| 2 | Webhooks de Stripe llegan fuera de orden | se procesa por fecha del evento y se consulta el estado en Stripe antes de cambiar la suscripción | 💡 |
| 3 | Paga por transferencia y también con tarjeta el mismo periodo | se aprueban ambos y el segundo extiende un periodo | ❓ |
| 4 | Baja de Pro (5 usuarios) a Básico (1) | no se permite hasta dejar 1 usuario activo | 💡 |
| 5 | Desactivar o cambiar de rol al único dueño | bloqueado: siempre al menos un dueño activo | 💡 |
| 6 | Invitar un correo que ya es de otra empresa | rechazado con mensaje (D-021) | ✅ D-021 |
| 7 | Abrir una invitación vencida | no entra; el dueño reenvía (nueva invitación) | 💡 |
| 8 | Termina la prueba sin pago | suscripción vencida; todo queda en solo lectura | 💡 |
| 9 | La empresa cancela | acceso hasta fin de periodo; luego ❓ (propuesta: solo lectura 30 días y borrado) | ❓ |
| 10 | Se desactiva una marca con cotizaciones abiertas | las existentes siguen; no aparece para nuevas | 💡 |
| 11 | Se cambia el prefijo de folio con cotizaciones emitidas | solo cambia folios nuevos; consecutivo no se reinicia | 💡 |
| 12 | Se activa `clientes_por_marca` con clientes ya existentes | ❓ pedir asignar marca a cada cliente antes de activar | ❓ |
| 13 | Dos personas aceptan la misma invitación al mismo tiempo | lock en la fila: solo una gana | 💡 |
| 14 | Se llega al límite de usuarios del plan | no se puede invitar; se ofrece subir de plan | 💡 |

## 8. Permisos 💡
| Acción | Roles | Validado en UI | Validado en BD (RLS/función) | Certeza |
|---|---|---|---|---|
| Ver/editar datos de la empresa y marcas | dueño, gerente | sí | RLS empresa_id = mi_empresa_id() + mi_rol() in (dueno, gerente) | ✅ D-008 / 💡 gerente edita |
| Invitar / desactivar usuarios | dueño | sí | `invitar_usuario()` valida rol | 💡 D-007 |
| Ver plan, pagos, subir comprobante | dueño | sí | RLS + rol | ✅ D-008 |
| Cambiar de plan / cancelar | dueño | sí | RPC | 💡 |
| Validar transferencias, suspender, cargar planes | super-admin | sí | `es_super_admin()` | ✅ D-015 |
| Ver lista de marcas | todos | sí | RLS; vendedor solo asignadas si vendedores_por_marca | ✅ D-023 |

## 8b. Consultas y escalabilidad 💡
| Consulta / pantalla | Filtros y orden | Índice que la soporta | Volumen 1 año | Volumen 3 años | Estrategia |
|---|---|---|---|---|---|
| Resolver empresa y rol del usuario (cada petición) | user_id | unique(user_id) en usuarios_empresa | ~250 | ❓ meta 3 años | función `security definer stable` cacheable |
| Marcas de la empresa / del vendedor | empresa_id, activo | (empresa_id, activo); (usuario_empresa_id) en usuario_marcas | ~100 | — | — |
| Panel super-admin: empresas por estado | estado, periodo_fin | (estado, periodo_fin) en suscripciones | 50 | — | — |
| Pagos por validar | estado = por_validar | parcial where estado='por_validar' | ~600/año | — | — |
| Cron diario de vencimientos | estado, prueba_hasta, gracia_hasta | (estado, prueba_hasta) | 50 | — | una corrida diaria |
Volumen muy bajo; no requiere particionamiento ni archivado.

## 9. Criterios de aceptación
- Dado un registro nuevo, cuando termina, entonces existen empresa, una marca, un usuario dueño y una suscripción en prueba con fin a 14 días.
- Dado un usuario de la empresa A, cuando consulta marcas, entonces nunca ve marcas de la empresa B.
- Dado `vendedores_por_marca = true`, cuando un vendedor lista marcas, entonces solo ve las asignadas.
- Dado el plan Básico con 1 usuario activo, cuando el dueño invita a otro, entonces se rechaza por límite.
- Dado un webhook `invoice.paid` repetido, cuando llega dos veces, entonces existe un solo pago.
- Dada una transferencia por validar, cuando el super-admin la aprueba, entonces la suscripción queda activa con el periodo del pago.
- Dada una suscripción vencida, cuando un usuario intenta crear una cotización, entonces se bloquea (solo lectura).
- Dado el único dueño, cuando se intenta desactivarlo, entonces se rechaza.

## 10. Inconsistencias ⚠️
| # | Descripción | Dónde | Impacto | Severidad |
|---|---|---|---|---|
| 1 | ~~Subdominio~~ resuelto: sin subdominio (D-029) | — | — | — |

## 11. Preguntas abiertas
- P-031 invitaciones: no contestada; campos 💡.
- ¿Precios incluyen IVA? ¿Se factura la renta?
- Qué pasa con datos de una empresa que cancela (§7 #9).
- Doble pago en el mismo periodo (§7 #3).
- Activar clientes_por_marca con clientes existentes (§7 #12).
- A quién se reasignan clientes y cotizaciones de un usuario dado de baja.
- Plantillas PDF iniciales.

## 12. Cierre de módulo
Confirmado por el dueño: **9%** (✅ 6 / 65). Mínimo para APROBADO: 90%.

| ID | Grupo | Qué | Estado |
|---|---|---|---|
| X-01 | Contradicción | Subdominio: sin subdominio (D-029) | ✅ |
| C-01 | Campos | empresas: 10 campos | ✅ |
| C-02 | Campos | marcas: 11 campos | ✅ |
| C-03 | Campos | usuarios_empresa: 9 campos | ✅ |
| C-04 | Campos | usuario_marcas: vendedor ↔ marca (solo llaves) | 💡 |
| C-05 | Campos | invitaciones: correo, nombre_completo, rol, marcas, mensaje, estado, vence_at, invitado_por | 💡 |
| C-06 | Campos | planes: código, nombre, precio_mensual, max_usuarios, max_cotizaciones_mes, recordatorios, aprobación descuentos, stripe_price_id, público | 💡 |
| C-07 | Campos | suscripciones: plan, estado, método, precio_acordado, prueba_hasta, periodo, gracia, ids de Stripe, cancelada_at | 💡 |
| C-08 | Campos | pagos: método, monto, periodo, estado, comprobante, referencia, stripe_invoice_id, validado_por, motivo_rechazo | 💡 |
| C-09 | Campos | Super-admin sin tabla: marca en el login de Supabase | 💡 |
| R-01 | Reglas de campos | El nombre de una marca no se repite dentro de la empresa | 💡 |
| R-02 | Reglas de campos | El prefijo de folio no se repite en la empresa; cambiarlo solo afecta folios nuevos | 💡 |
| R-03 | Reglas de campos | Teléfonos de 10 dígitos | 💡 |
| R-04 | Reglas de campos | RFC en mayúsculas con formato SAT | 💡 |
| R-05 | Reglas de campos | Logo y foto: png/jpg/svg de hasta 2 MB | 💡 |
| R-06 | Reglas de campos | Valores por defecto de empresa: MXN, IVA 16%, vigencia 15 días, zona CDMX, clientes y vendedores por marca = no | 💡 |
| R-07 | Reglas de campos | nombre = nombre corto en la app; nombre_completo = firma del PDF | 💡 |
| R-08 | Reglas de campos | fecha_alta editable; por defecto el día del alta | 💡 |
| R-09 | Reglas de campos | leyenda_contacto se copia al PDF y la cotización guarda la copia al emitirse | 💡 |
| R-10 | Reglas de campos | Rol por defecto al invitar: vendedor | 💡 |
| R-11 | Reglas de campos | Una invitación vence en 7 días | 💡 |
| R-12 | Reglas de campos | Límites: Básico 1 usuario/30 cotizaciones; Pro 5/300; Empresa ilimitado | 💡 |
| R-13 | Reglas de campos | Recordatorios automáticos desde Pro; aprobación de descuentos solo en Empresa | 💡 |
| R-14 | Reglas de campos | Prueba de 14 días con funciones de Pro, sin tarjeta | 💡 |
| R-15 | Reglas de campos | 5 días de gracia si falla un cobro | 💡 |
| R-16 | Reglas de campos | Plan Empresa requiere precio acordado | 💡 |
| E-01 | Estados | Suscripción: prueba → activa / vencida / cancelada | 💡 |
| E-02 | Estados | Vencida = todo en solo lectura | 💡 |
| E-03 | Estados | Suspendida solo por super-admin; el dueño solo ve facturación | 💡 |
| E-04 | Estados | Cancelada: acceso hasta el fin del periodo pagado | 💡 |
| E-05 | Estados | Pago por transferencia: por validar → aprobado / rechazado (motivo obligatorio) | 💡 |
| E-06 | Estados | Pago fallido activa la gracia; reembolso lo hace el super-admin | 💡 |
| E-07 | Estados | Invitación: pendiente → aceptada / cancelada / vencida | 💡 |
| PR-01 | Procesos | Registro crea empresa + primera marca + dueño + suscripción en prueba, todo o nada | 💡 |
| PR-02 | Procesos | Invitar valida el límite del plan y que el correo no sea de otra empresa | 💡 |
| PR-03 | Procesos | Dueño y gerente editan datos de empresa y marcas | 💡 |
| PR-04 | Procesos | Usuarios y marcas: baja lógica; empresas no se borran, se cancelan | 💡 |
| PR-05 | Procesos | Reactivar usuario o marca solo si cabe en el plan | 💡 |
| PR-06 | Procesos | Stripe: cada cobro se registra una sola vez y activa/extiende el periodo | 💡 |
| PR-07 | Procesos | Transferencia: el dueño sube comprobante y el super-admin aprueba o rechaza | 💡 |
| PR-08 | Procesos | Subir de plan inmediato (prorrateo); bajar al fin del periodo si caben los usuarios | 💡 |
| PR-09 | Procesos | Revisión diaria: vence pruebas, periodos, gracia e invitaciones | 💡 |
| PE-01 | Permisos | Ver y editar empresa y marcas: dueño y gerente | 💡 |
| PE-02 | Permisos | Invitar y desactivar usuarios: solo dueño | 💡 |
| PE-03 | Permisos | Plan, pagos y comprobantes: solo dueño | 💡 |
| PE-04 | Permisos | Cambiar de plan o cancelar: solo dueño | 💡 |
| PE-05 | Permisos | Validar pagos, suspender y editar planes: super-admin | 💡 |
| PE-06 | Permisos | Vendedor solo ve sus marcas cuando la empresa lo activa | ✅ |
| QS-01 | Casos borde | Cobro de Stripe duplicado: se registra una vez | 💡 |
| QS-02 | Casos borde | Avisos de Stripe fuera de orden: se verifica en Stripe antes de cambiar | 💡 |
| QS-03 | Casos borde | Pago doble del mismo periodo (transferencia + tarjeta) | ❓ |
| QS-04 | Casos borde | Bajar de Pro a Básico con 5 usuarios: no se permite hasta dejar 1 | 💡 |
| QS-05 | Casos borde | Siempre al menos un dueño activo | 💡 |
| QS-06 | Casos borde | Invitar un correo de otra empresa: rechazado | ✅ |
| QS-07 | Casos borde | Invitación vencida: no entra, se reenvía | 💡 |
| QS-08 | Casos borde | Fin de prueba sin pago: solo lectura | 💡 |
| QS-09 | Casos borde | Qué pasa con los datos cuando una empresa cancela | ❓ |
| QS-10 | Casos borde | Marca desactivada con cotizaciones abiertas: siguen; no aparece en nuevas | 💡 |
| QS-11 | Casos borde | Cambio de prefijo de folio: consecutivo no se reinicia | 💡 |
| QS-12 | Casos borde | Activar clientes por marca con clientes existentes | ❓ |
| QS-13 | Casos borde | Dos aceptan la misma invitación a la vez: solo una gana | 💡 |
| QS-14 | Casos borde | Límite de usuarios alcanzado: no deja invitar, ofrece subir de plan | 💡 |
| Q-01 | Pendientes | ¿Los precios de los planes incluyen IVA? | ❓ |
| Q-02 | Pendientes | A quién se reasignan clientes y cotizaciones de un usuario dado de baja | ❓ |
| Q-03 | Pendientes | Plantillas de PDF iniciales | ❓ |
