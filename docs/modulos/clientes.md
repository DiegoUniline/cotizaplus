# Módulo: Clientes
Conocimiento: en diseño (FASE 1, Paso 2) | Última actualización: 2026-10-15 | Fuente: diseño (prueba del flujo, sin SQL)

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

### Tabla `contactos_cliente`
❓ P-038.
