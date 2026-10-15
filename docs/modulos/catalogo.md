# Módulo: Catálogo
Conocimiento: en diseño (FASE 1, Paso 2) | Última actualización: 2026-10-15 | Fuente: diseño (prueba del flujo, sin SQL)

## 1. Propósito
Atributos que define cada empresa y su catálogo de productos con imagen, precio, unidad y tipo de cobro. ✅ (D-009, D-010)

## 2. Entidades y diccionario de datos
Campos técnicos (💡): `id`, `empresa_id`, `activo`, `created_at/by`, `updated_at/by`.

### Tabla `atributos`
| Campo | Tipo | Null | Default | Qué representa | Reglas / validación | Certeza | Evidencia / origen |
|---|---|---|---|---|---|---|---|
| nombre | text | no | — | Color, Medida, Modelo… | unique (empresa_id, nombre) 💡 | ✅ / 💡 regla | P-034 |
| tipo | text | no | 'texto' | texto, lista, medida, número | check in (...) | ✅ / 💡 default | P-034 |
| unidad | text | sí | null | m, cm, kg… | solo para medida o número 💡 | ✅ | P-034 |
| obligatorio | boolean | no | false | Si hay que llenarlo al cotizar | — | ✅ / 💡 default | P-034 |

Quitados por el dueño: orden, editable_al_cotizar (❓ Paso 3: ¿el vendedor puede cambiar el valor en la partida?).

### Tabla `atributo_opciones`
❓ P-035.

## 11. Preguntas abiertas
P-035.
