👕 Baby Clothes Store
Gestor de Ropa Infantil — Semana 02
Autor: Jackson Duvan Ramos Rodriguez
📍 Bogotá, Colombia

¿De qué trata mi dominio?
Mi dominio es una tienda de ropa infantil llamada Baby Clothes Store. La aplicación funciona como un gestor de inventario de prendas para niños, donde se pueden registrar, consultar, actualizar y eliminar prendas del catálogo.
Este tipo de aplicaciones existen en el mundo real en tiendas físicas y e-commerce de moda infantil, donde es clave tener control del inventario por tipo de prenda, talla y disponibilidad de stock.

Estructura de archivos
week-02/
└── starter/
    ├── index.html      → Estructura HTML de la aplicación
    ├── styles.css      → Estilos visuales (paleta azul infantil)
    └── scripts.js      → Lógica JavaScript (problema)
└── solution/
    └── scripts.js      → Lógica JavaScript (solución)

Entidad principal: Prenda
En la plantilla genérica la entidad se llamaba "Elemento". La reemplacé por Prenda, que representa una pieza de ropa del catálogo infantil.
Cada prenda tiene estas propiedades:
PropiedadTipoDescripciónnameStringNombre de la prenda (ej. "Pijama Osito")descriptionStringDescripción, material y característicascategoryStringTipo de prenda (camisa, pantalón, zapato, etc.)priorityStringNivel de stock: bajo / medio / altotallaStringTalla de la prenda (4, 6, 8, 10, 12...)activeBooleanSi la prenda está disponible o agotada

Categorías del dominio (CATEGORIES)
Reemplacé las categorías genéricas por los tipos de prenda más comunes en una tienda infantil:
javascriptconst CATEGORIES = {
  shirt:   { name: 'Camiseta',  emoji: '👕' },
  pants:   { name: 'Pantalón',  emoji: '👖' },
  shoes:   { name: 'Calzado',   emoji: '👟' },
  dress:   { name: 'Vestido',   emoji: '👗' },
  jacket:  { name: 'Chaqueta',  emoji: '🧥' },
  other:   { name: 'Otro',      emoji: '📌' },
};

Nivel de stock (antes "Prioridad")
El campo priority de la plantilla lo usé para representar el nivel de stock de cada prenda:
javascriptconst PRIORITIES = {
  high:   { name: 'Alto',  color: '#82c9a0' },  // 🟢 Verde  — bastante inventario
  medium: { name: 'Medio', color: '#f59e0b' },  // 🟡 Amarillo — reabastecer pronto
  low:    { name: 'Bajo',  color: '#ef4444' },  // 🔴 Rojo  — urgente reabastecer
};
El color del borde izquierdo de cada tarjeta cambia según el nivel de stock, dando una señal visual inmediata a quien gestiona la tienda.

Diseño visual (styles.css)
El diseño usa una paleta de azules suaves y pasteles, pensada para una tienda de ropa infantil:

Fondo general: Gradiente de azul claro #4daee8 a azul oscuro #1a6fbf
Tarjetas: Azul suave #e8f4fd con borde #b8dff5
Items del inventario: Azul highlight #d0ecfa
Botones: Azul medio #4daee8
Textos: Azul marino oscuro #1a3a5c para alta legibilidad

Esta paleta reemplazó el fondo morado/oscuro original para dar una identidad más amigable y adecuada para el público infantil.

Estadísticas específicas del dominio
En getStats() agregué cálculos relevantes para una tienda de ropa:
javascript// Total de prendas registradas
const totalPrendas = items.length;

// Prendas disponibles vs agotadas
const disponibles = items.filter(item => item.active).length;
const agotadas    = items.filter(item => !item.active).length;

// Conteo por tipo de prenda
const porCategoria = items.reduce((acc, item) => {
  acc[item.category] = (acc[item.category] || 0) + 1;
  return acc;
}, {});

Persistencia con localStorage
Los datos se guardan en el navegador con una clave específica del dominio:
javascriptlocalStorage.getItem('babyClothesItems')
localStorage.setItem('babyClothesItems', JSON.stringify(itemsToSave))

Características ES2023 utilizadas
CaracterísticaDónde la uséSpread operator ...createItem() para copiar objetos sin mutarlosDefault parametersgetStats(items = []), applyFilters(filters = {})Array.map()updateItem(), toggleItemActive(), renderItems()Array.filter()deleteItem(), clearInactive(), filtros por tipo y stockArray.reduce()getStats() para totales por categoría y nivel de stockArray.find()handleItemEdit() para buscar la prenda a editarDestructuringapplyFilters() y renderItem() para extraer propiedadesTemplate literalsTodo el HTML dinámico en renderItem() y renderStats()Operador ??loadItems(), valores por defecto en createItem()Optional chaining ?.CATEGORIES[category]?.name, CATEGORIES[category]?.emoji

Inmutabilidad del estado
Nunca muto el array items directamente. Siempre creo arrays nuevos:
javascript// ✅ Correcto — creo un array nuevo
const newItems = [...items, newItem];

// ✅ Correcto — map devuelve un array nuevo
const updated = items.map(i => i.id === id ? { ...i, ...changes } : i);

// ❌ Nunca hago esto
items.push(newItem);
items[0].name = 'otro nombre';

Checklist de entrega

 Categorías adaptadas al dominio de ropa infantil
 Campos adicionales: talla, nivel de stock
 CRUD completo: crear, leer, actualizar, eliminar
 Toggle disponible / agotado por prenda
 Filtros por disponibilidad, tipo de prenda y nivel de stock
 Búsqueda en tiempo real por nombre y descripción
 Estadísticas del inventario con totales por categoría
 Persistencia con localStorage
 Inmutabilidad del estado en todo el código
 Comentarios en español, nomenclatura técnica en inglés
 Paleta de colores azul suave adaptada para ropa infantil
 Uso de: spread, map, filter, reduce, find, destructuring, template literals


Hecho con 💙 por Jackson — Baby Clothes Store · Bogotá, Colombia