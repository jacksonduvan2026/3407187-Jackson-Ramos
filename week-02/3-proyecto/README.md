## 👕 Baby Clothes Store
## Gestor de Ropa Infantil — Semana 02
**Autor:** Jackson Duvan Ramos Rodriguez
**📍 Bogotá, Colombia**

---

## ¿De qué trata mi dominio?

Mi dominio es una tienda de ropa infantil llamada **Baby Clothes Store**. La aplicación funciona como un **gestor de inventario de prendas para niños**, donde se pueden registrar, consultar, actualizar y eliminar prendas del catálogo.

Este tipo de aplicaciones existen en el mundo real en tiendas físicas y e-commerce de moda infantil, donde es clave tener control del inventario por tipo de prenda, talla y disponibilidad de stock.

---

## Estructura de archivos

```
week-02/
└── starter/
    ├── index.html      → Estructura HTML de la aplicación
    ├── styles.css      → Estilos visuales (paleta azul infantil)
    └── scripts.js      → Lógica JavaScript (problema)
└── solution/
    └── scripts.js      → Lógica JavaScript (solución)
```

---

## Entidad principal: Prenda

En la plantilla genérica la entidad se llamaba "Elemento". La reemplacé por **Prenda**, que representa una pieza de ropa del catálogo infantil.

Cada prenda tiene estas propiedades:

| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `name` | String | Nombre de la prenda (ej. "Pijama Osito") |
| `description` | String | Descripción, material y características |
| `category` | String | Tipo de prenda (camisa, pantalón, zapato, etc.) |
| `priority` | String | Nivel de stock: bajo / medio / alto |
| `talla` | String | Talla de la prenda (4, 6, 8, 10, 12...) |
| `active` | Boolean | Si la prenda está disponible o agotada |

---

## Categorías del dominio (`CATEGORIES`)

Reemplacé las categorías genéricas por los tipos de prenda más comunes en una tienda infantil:

```javascript
const CATEGORIES = {
  // TODO: Define las categorías de tu dominio
     category1: { name: 'calzado', emoji: '👟' },
     category2: { name: 'accesorios', emoji: '👜' },
     category3: { name: 'bebes', emoji: '🍼' },
     category4: { name: 'niños', emoji: '🧢' },
     category5: { name: 'niñas', emoji: '🎀' },
     
};
```

---

## Nivel de stock (antes "Prioridad")

El campo `priority` de la plantilla lo usé para representar el **nivel de stock** de cada prenda:

```javascript
const PRIORITIES = {
  high:   { name: 'Alto',  color: '#82c9a0' },  // 🟢 Verde  — bastante inventario
  medium: { name: 'Medio', color: '#f59e0b' },  // 🟡 Amarillo — reabastecer pronto
  low:    { name: 'Bajo',  color: '#ef4444' },  // 🔴 Rojo  — urgente reabastecer
};
```

El color del borde izquierdo de cada tarjeta cambia según el nivel de stock, dando una señal visual inmediata a quien gestiona la tienda.

---

## Diseño visual (`styles.css`)

El diseño usa una **paleta de azules suaves y pasteles**, pensada para una tienda de ropa infantil:

- **Fondo general:** Gradiente de azul claro `#4daee8` a azul oscuro `#1a6fbf`
- **Tarjetas:** Azul suave `#e8f4fd` con borde `#b8dff5`
- **Items del inventario:** Azul highlight `#d0ecfa`
- **Botones:** Azul medio `#4daee8`
- **Textos:** Azul marino oscuro `#1a3a5c` para alta legibilidad

Esta paleta reemplazó el fondo morado/oscuro original para dar una identidad más amigable y adecuada para el público infantil.

---

## Estadísticas específicas del dominio

En `getStats()` agregué cálculos relevantes para una tienda de ropa:

```javascript
// Total de prendas registradas
const totalPrendas = items.length;

// Prendas disponibles vs agotadas
const disponibles = items.filter(item => item.active).length;
const agotadas    = items.filter(item => !item.active).length;

// Conteo por tipo de prenda
const porCategoria = items.reduce((acc, item) => {
  acc[item.category] = (acc[item.category] || 0) + 1;
  return acc;
}, {});
```

---

## Persistencia con `localStorage`

Los datos se guardan en el navegador con una clave específica del dominio:

```javascript
localStorage.getItem('babyClothesItems')
localStorage.setItem('babyClothesItems', JSON.stringify(itemsToSave))
```

---

## Características ES2023 utilizadas

| Característica | Dónde la usé |
|----------------|-------------|
| **Spread operator** `...` | `createItem()` para copiar objetos sin mutarlos |
| **Default parameters** | `getStats(items = [])`, `applyFilters(filters = {})` |
| **`Array.map()`** | `updateItem()`, `toggleItemActive()`, `renderItems()` |
| **`Array.filter()`** | `deleteItem()`, `clearInactive()`, filtros por tipo y stock |
| **`Array.reduce()`** | `getStats()` para totales por categoría y nivel de stock |
| **`Array.find()`** | `handleItemEdit()` para buscar la prenda a editar |
| **Destructuring** | `applyFilters()` y `renderItem()` para extraer propiedades |
| **Template literals** | Todo el HTML dinámico en `renderItem()` y `renderStats()` |
| **Operador `??`** | `loadItems()`, valores por defecto en `createItem()` |
| **Optional chaining `?.`** | `CATEGORIES[category]?.name`, `CATEGORIES[category]?.emoji` |

---

## Inmutabilidad del estado

Nunca muto el array `items` directamente. Siempre creo arrays nuevos:

```javascript
// ✅ Correcto — creo un array nuevo
const newItems = [...items, newItem];

// ✅ Correcto — map devuelve un array nuevo
const updated = items.map(i => i.id === id ? { ...i, ...changes } : i);

// ❌ Nunca hago esto
items.push(newItem);
items[0].name = 'otro nombre';
```

---

## Checklist de entrega

- [x] Categorías adaptadas al dominio de ropa infantil
- [x] Campos adicionales: talla, nivel de stock
- [x] CRUD completo: crear, leer, actualizar, eliminar
- [x] Toggle disponible / agotado por prenda
- [x] Filtros por disponibilidad, tipo de prenda y nivel de stock
- [x] Búsqueda en tiempo real por nombre y descripción
- [x] Estadísticas del inventario con totales por categoría
- [x] Persistencia con localStorage
- [x] Inmutabilidad del estado en todo el código
- [x] Comentarios en español, nomenclatura técnica en inglés
- [x] Paleta de colores azul suave adaptada para ropa infantil
- [x] Uso de: spread, map, filter, reduce, find, destructuring, template literals

---

*Hecho con 💙 por Jackson — Baby Clothes Store · Bogotá, Colombia*