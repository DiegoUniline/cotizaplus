# Módulo: Catálogo
Conocimiento: 54% (✅ 15 / 28 ítems del cierre, §12) | Última actualización: 2026-10-15 | Fuente: diseño (prueba del flujo, sin SQL)

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

⚠️ `orden` y `editable_al_cotizar`: se tomaron como quitados por error (D-036); en repregunta.

### Tabla `atributo_opciones`
Lleva `atributo_id uuid not null references atributos(id)`.
| Campo | Tipo | Null | Default | Qué representa | Reglas / validación | Certeza | Evidencia / origen |
|---|---|---|---|---|---|---|---|
| valor | text | no | — | Rojo, Azul, 2×3 m… | unique (atributo_id, valor) 💡 | ✅ / 💡 regla | P-035 |
| ajuste_precio | numeric(14,2) | no | 0 | Suma o resta al precio al elegir la opción | puede ser negativo 💡 | ✅ / 💡 | P-035 |

### Tabla `productos`
| Campo | Tipo | Null | Default | Qué representa | Reglas / validación | Certeza | Evidencia / origen |
|---|---|---|---|---|---|---|---|
| nombre | text | no | — | Nombre del producto | unique (empresa_id, nombre) 💡 | ✅ / 💡 regla | P-036 |
| imagen | text (Storage) | sí | null | Foto | png/jpg ≤ 2 MB 💡 | ✅ | P-036, D-035 |
| unidad | text | no | 'pza' | pza, m², hora, mes… | — | ✅ / 💡 default | D-035 |
| precio | numeric(14,2) | no | — | Precio base | ≥ 0; ❓ ¿incluye IVA? | ✅ | D-035 |
| tipo_cobro | text | no | 'unico' | único, mensual, por hora | check in ('unico','mensual','hora') | ✅ | P-036, D-009 |

### Tabla `producto_atributos` 💡 (valores de atributos del producto)
| Campo | Tipo | Null | Default | Qué representa | Reglas / validación | Certeza | Evidencia / origen |
|---|---|---|---|---|---|---|---|
| producto_id | uuid → productos | no | — | Producto | unique (producto_id, atributo_id) | 💡 | D-035 |
| atributo_id | uuid → atributos | no | — | Atributo | misma empresa | 💡 | D-035 |
| opcion_id | uuid → atributo_opciones | sí | null | Opción si el atributo es lista | — | 💡 | D-034 |
| valor | text | sí | null | Valor si es texto, medida o número | — | 💡 | D-033 |

## 11. Preguntas abiertas
P-036.

## 12. Cierre de módulo
Confirmado por el dueño: **54%** (✅ 15 / 28). Mínimo para APROBADO: 90%.

| ID | Grupo | Qué | Estado |
|---|---|---|---|
| C-01 | Campos | atributos: nombre, tipo, unidad, obligatorio | ✅ |
| C-02 | Campos | atributo_opciones: valor, ajuste_precio | ✅ |
| C-03 | Campos | productos: nombre, imagen, unidad, precio, tipo_cobro, atributos | ✅ |
| C-04 | Campos | producto_atributos: producto, atributo, opción o valor | ✅ |
| R-01 | Reglas de campos | El nombre de un atributo no se repite en la empresa | ✅ |
| R-02 | Reglas de campos | Tipo por defecto texto; unidad solo para medida o número | ✅ |
| R-03 | Reglas de campos | Una opción no se repite dentro del mismo atributo | ✅ |
| R-04 | Reglas de campos | ajuste_precio puede ser negativo; precio de la partida = precio + ajustes de las opciones elegidas | ✅ |
| R-05 | Reglas de campos | El nombre de un producto no se repite en la empresa | ✅ |
| R-06 | Reglas de campos | Precio ≥ 0 con 2 decimales | ✅ |
| R-07 | Reglas de campos | Imagen png/jpg de hasta 2 MB | ✅ |
| R-08 | Reglas de campos | Atributo obligatorio: la partida no se guarda sin ese valor | ✅ |
| R-09 | Reglas de campos | Sin campo orden: atributos en orden alfabético — DESMARCADO, se repregunta | 💡 |
| PR-01 | Procesos | Al cotizar se copian nombre, precio, unidad, imagen, tipo de cobro y atributos a la partida (congelados) — DESMARCADO, se repregunta | 💡 |
| PR-02 | Procesos | Cambiar el precio de un producto no afecta cotizaciones ya hechas | ✅ |
| PR-03 | Procesos | Producto desactivado: no aparece en cotizaciones nuevas; las existentes no cambian — DESMARCADO, se repregunta | 💡 |
| PR-04 | Procesos | Atributo u opción desactivados: productos y partidas existentes conservan su valor | ✅ |
| PE-01 | Permisos | Crear y editar productos y atributos: dueño y gerente | ✅ |
| PE-02 | Permisos | Vendedor: solo consulta el catálogo — DESMARCADO, se repregunta | 💡 |
| QS-01 | Casos borde | Dos usuarios editan el mismo producto: gana el último y queda registro de quién cambió | 💡 |
| QS-02 | Casos borde | Cambiar el tipo de un atributo que ya tiene valores: no se permite | 💡 |
| QS-03 | Casos borde | Importación de Excel con filas con error: se importan las buenas y se muestra la lista de errores | 💡 |
| QS-04 | Casos borde | Cambiar ajuste_precio de una opción no afecta partidas existentes | 💡 |
| QS-05 | Casos borde | Atributo obligatorio agregado después: solo se exige en partidas nuevas | 💡 |
| Q-01 | Pendientes | ¿El precio del producto incluye IVA? | ❓ |
| Q-02 | Pendientes | ¿Catálogo compartido entre marcas o por marca? | ❓ |
| Q-03 | Pendientes | ¿El vendedor puede cambiar precio y atributos en la partida? | ❓ |
| Q-04 | Pendientes | Importar Excel: si el producto ya existe (mismo nombre), ¿actualizar o saltar? | ❓ |
