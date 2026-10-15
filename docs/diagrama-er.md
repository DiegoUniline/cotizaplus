# Diagrama entidad-relación
Última actualización: 2026-10-15 · Fuente: mapa aprobado en P-018 (D-020) + marcas (D-022) · Las relaciones marcadas ❓ se definen en el Paso 1c.

Notación: `||--o{` = uno a muchos (0 o más) · `||--||` = uno a uno · `|o--o{` = opcional (0 o 1) a muchos.
`auth_users` = usuarios de Supabase Auth (login). Solo se muestran llaves; los campos se definen tabla por tabla.

```mermaid
erDiagram
    %% ===== Plataforma =====
    planes ||--o{ suscripciones : "se contrata en"
    empresas ||--o{ suscripciones : "tiene historial de"
    suscripciones ||--o{ pagos : "se paga con"
    empresas ||--o{ usuarios_empresa : "tiene"
    auth_users ||--|| usuarios_empresa : "pertenece a una sola"
    empresas ||--o{ marcas : "tiene"
    %% ❓ ¿qué datos son de la marca y cuáles de la empresa? ¿folios por marca? ¿vendedores por marca?
    empresas ||--o{ invitaciones : "envía"
    plantillas_pdf |o--o{ empresas : "por defecto de"
    empresas ||--o{ folios : "lleva consecutivos en"

    %% ===== Catálogo =====
    empresas ||--o{ atributos : "define"
    atributos ||--o{ atributo_opciones : "tiene opciones"
    empresas ||--o{ productos : "vende"
    %% ❓ valores de atributos del producto: ¿tabla aparte o dentro del producto?

    %% ===== Clientes =====
    empresas ||--o{ clientes : "atiende a"
    marcas |o--o{ clientes : "dueña del cliente (si la empresa separa por marca)"
    usuarios_empresa |o--o{ clientes : "vendedor asignado de"
    %% ❓ ¿un cliente puede tener más de un vendedor?
    clientes ||--o{ contactos_cliente : "tiene"
    %% ❓ ¿un contacto puede pertenecer a dos clientes?

    %% ===== Cotizaciones =====
    clientes ||--o{ cotizaciones : "recibe"
    marcas ||--o{ cotizaciones : "sale con la marca"
    contactos_cliente |o--o{ cotizaciones : "dirigida a"
    %% ❓ ¿a un contacto, a uno con copia, o a varios?
    usuarios_empresa ||--o{ cotizaciones : "elabora"
    plantillas_pdf ||--o{ cotizaciones : "se imprime con"
    cotizaciones ||--o{ cotizacion_partidas : "contiene"
    productos |o--o{ cotizacion_partidas : "se copia en"
    %% ❓ ¿editar una enviada crea versión nueva (v2) o sobrescribe?

    %% ===== Envío y respuesta del cliente =====
    cotizaciones ||--o{ envios : "se envía en"
    contactos_cliente |o--o{ envios : "destinatario de"
    cotizaciones ||--o{ vistas_cotizacion : "se abre en"
    cotizaciones ||--o{ respuestas_cliente : "recibe"
    motivos_rechazo |o--o{ respuestas_cliente : "explica"

    %% ===== Seguimiento =====
    cotizaciones ||--o{ seguimientos : "tiene bitácora"
    usuarios_empresa ||--o{ seguimientos : "registra"
    empresas ||--o{ motivos_rechazo : "configura"
    %% ❓ motivos de rechazo fijos o configurables por empresa

    %% ===== Importación y super-admin =====
    empresas ||--o{ importaciones : "importa"
    usuarios_empresa ||--o{ importaciones : "ejecuta"
    empresas ||--o{ accesos_soporte : "recibe soporte"
    auth_users ||--o{ accesos_soporte : "super-admin entra"
    avisos_plataforma }o--o{ empresas : "se muestra a todas"

    %% ===== Fase 2 =====
    cotizaciones ||--o{ pedidos : "genera"
    %% ❓ ¿una cotización = un pedido, o varios?
    pedidos ||--o{ pedido_partidas : "contiene"
    cotizacion_partidas |o--o{ pedido_partidas : "se copia en"
    empresas ||--|| recordatorios_config : "configura"
    cotizaciones ||--o{ recordatorios_programados : "tiene en cola"
    empresas ||--o{ whatsapp_paquetes : "compra"
    whatsapp_paquetes ||--o{ whatsapp_movimientos : "se consume en"
    recordatorios_programados |o--o| whatsapp_movimientos : "consume"
    cotizaciones ||--o{ aprobaciones_descuento : "solicita"
    usuarios_empresa ||--o{ aprobaciones_descuento : "autoriza"
```

## Relaciones por confirmar (Paso 1c)
| Relación | Pregunta | Estado |
|---|---|---|
| auth_users ↔ empresas | ¿Un usuario en varias empresas? | ✅ No (D-021) |
| empresas ↔ marcas | ¿Varias marcas por empresa? | ✅ Sí (D-022) |
| marcas ↔ vendedores | ¿Un vendedor cotiza para todas las marcas o solo las asignadas? | ❓ |
| marcas ↔ folios | ¿Folio por marca o uno por empresa? | ❓ |
| contactos_cliente ↔ clientes | ¿Un contacto en dos clientes? | ❓ |
| cotizaciones ↔ contactos_cliente | ¿A quién le llega la cotización? | ❓ |
| cotizaciones (versiones) | ¿Editar una enviada crea v2 o sobrescribe? | ❓ |
| cotizaciones ↔ pedidos | ¿Una cotización = un pedido? | ❓ |
| clientes ↔ vendedor | ¿Uno o varios vendedores por cliente? | ❓ |
| motivos_rechazo | ¿Fijos o configurables? | ❓ |
