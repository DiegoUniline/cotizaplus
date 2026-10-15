# Módulo: Clientes
Conocimiento: 17% (✅ 4 / 24 ítems del cierre, §12) | Última actualización: 2026-10-15 | Fuente: diseño (prueba del flujo, sin SQL)

## 1. Propósito
A quién se le cotiza y sus personas de contacto. ✅ (D-008, D-020, D-022)

## 2. Entidades y diccionario de datos
Campos técnicos (💡): `id`, `empresa_id`, `activo`, `created_at/by`, `updated_at/by`.

### Tabla `clientes` (D-041)
| Campo | Tipo | Null | Default | Qué representa | Reglas / validación | Certeza | Evidencia / origen |
|---|---|---|---|---|---|---|---|
| vendedor_id | uuid → usuarios_empresa | no | quien lo crea 💡 | Vendedor asignado | uno por cliente 💡 (D-024) | ✅ | D-008 |
| marca_id | uuid → marcas | según ajuste | null | Marca dueña del cliente | obligatorio si empresas.clientes_por_marca | ✅ | D-022 |
| nombre | text | no | — | Nombre comercial | ¿se repite? 💡 cierre | ✅ | P-037 |
| razon_social | text | sí | null | Nombre fiscal | — | ✅ | P-037 |
| rfc | text | sí | null | RFC | upper, formato SAT 💡 | ✅ | P-037 |
| tipo_persona | text | sí | null | física, moral | check | ✅ | P-037 |
| correo | text | sí | null | Correo general | formato correo 💡 | ✅ | P-037 |
| telefono | text | sí | null | Teléfono general | 10 dígitos 💡 | ✅ | P-037 |
| direccion | text | sí | null | Dirección | — | ✅ | P-037 |
| notas | text | sí | null | Comentarios internos | — | ✅ | P-037 |

### Tabla `contactos_cliente` (D-042)
| Campo | Tipo | Null | Default | Qué representa | Reglas / validación | Certeza | Evidencia / origen |
|---|---|---|---|---|---|---|---|
| cliente_id | uuid → clientes | no | — | Cliente | un solo cliente 💡 (D-024) | ✅ | D-020 |
| nombre | text | no | — | Nombre del contacto | — | ✅ | P-038 |
| puesto | text | sí | null | Compras, pagos… | — | ✅ | P-038 |
| correo | text | sí | null | Destino de cotizaciones | formato correo 💡 | ✅ | P-038 |
| telefono | text | sí | null | WhatsApp | 10 dígitos 💡 | ✅ | P-038 |
| es_principal | boolean | no | false | Destinatario por defecto | uno por cliente 💡 | ✅ | P-038 |
| notas | text | sí | null | Comentarios | — | ✅ | P-038 |

## 12. Cierre de módulo
Confirmado por el dueño: **17%** (✅ 4 / 24). Mínimo para APROBADO: 90%.

| ID | Grupo | Qué | Estado |
|---|---|---|---|
| C-01 | Campos | clientes: vendedor, marca, nombre, razón social, RFC, tipo de persona, correo, teléfono, dirección, notas | ✅ |
| C-02 | Campos | contactos_cliente: cliente, nombre, puesto, correo, teléfono, es_principal, notas | ✅ |
| R-01 | Reglas de campos | Nombre de cliente repetido: solo avisa, no bloquea | 💡 |
| R-02 | Reglas de campos | RFC no se repite en la empresa (bloquea), salvo vacío o público en general XAXX010101000 | 💡 |
| R-03 | Reglas de campos | RFC en mayúsculas formato SAT; teléfonos 10 dígitos; correos válidos | 💡 |
| R-04 | Reglas de campos | Vendedor por defecto = quien da de alta el cliente | 💡 |
| R-05 | Reglas de campos | Un solo contacto principal por cliente; el primero creado es el principal | 💡 |
| R-06 | Reglas de campos | Un contacto pertenece a un solo cliente (D-024) | 💡 |
| R-07 | Reglas de campos | Un vendedor por cliente; dueño o gerente lo reasignan (D-024) | 💡 |
| PR-01 | Procesos | Cualquier rol da de alta clientes; el vendedor queda asignado a sí mismo | 💡 |
| PR-02 | Procesos | Desactivar cliente: se permite aunque tenga cotizaciones abiertas; éstas siguen | 💡 |
| PR-03 | Procesos | Reasignar vendedor: las cotizaciones abiertas pasan al nuevo; las cerradas se quedan con quien las hizo | 💡 |
| PR-04 | Procesos | Editar datos del cliente no cambia cotizaciones ya enviadas (copian datos al emitirse) | 💡 |
| PR-05 | Procesos | Importar clientes de Excel: si existe (por RFC, si no por nombre) se actualiza | 💡 |
| PE-01 | Permisos | Vendedor ve y edita solo sus clientes (D-008) | ✅ |
| PE-02 | Permisos | Dueño y gerente ven y editan todos los clientes | 💡 |
| PE-03 | Permisos | Solo dueño y gerente reasignan vendedor y desactivan clientes | 💡 |
| QS-01 | Casos borde | Dos vendedores dan de alta el mismo RFC: se bloquea el segundo con aviso | 💡 |
| QS-02 | Casos borde | Cliente de la marca X (si se separa por marca) no recibe cotizaciones de la marca Y | 💡 |
| QS-03 | Casos borde | Desactivar el contacto principal: el sistema pide elegir otro principal | 💡 |
| QS-04 | Casos borde | Borrar cliente: solo si no tiene cotizaciones; si tiene, solo desactivar | 💡 |
| QS-05 | Casos borde | Vendedor dado de baja: sus clientes se reasignan (D-031) | ✅ |
| QS-06 | Casos borde | Cliente/contacto sin correo: no se puede enviar por correo; sí por WhatsApp o PDF | 💡 |
| Q-01 | Pendientes | ¿Un vendedor puede ver que un cliente ya existe aunque sea de otro vendedor (para no duplicar)? | ❓ |
