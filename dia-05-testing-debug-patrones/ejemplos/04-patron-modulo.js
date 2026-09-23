// Día 5 — Ejemplo: patrón Módulo (con closures, sin ESM)
// Ejecuta con: node 04-patron-modulo.js
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.

// El patrón Módulo encapsula estado y expone solo una API pública controlada,
// usando una IIFE (Immediately Invoked Function Expression) y closures.
const CarritoDeCompras = (function () {
  let items = []; // estado "privado": inaccesible desde fuera de esta función

  function calcularTotal() {
    return items.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  // Solo lo que se retorna aquí es la API pública
  return {
    agregar(nombre, precio, cantidad = 1) {
      items.push({ nombre, precio, cantidad });
    },
    eliminar(nombre) {
      items = items.filter((item) => item.nombre !== nombre);
    },
    total() {
      return calcularTotal();
    },
    listar() {
      return [...items]; // se devuelve una copia, no la referencia interna
    },
  };
})();

CarritoDeCompras.agregar('Teclado', 350);
CarritoDeCompras.agregar('Mouse', 150, 2);
console.log('Items:', CarritoDeCompras.listar());
console.log('Total:', CarritoDeCompras.total());

// `items` no es accesible directamente: console.log(CarritoDeCompras.items) -> undefined
console.log('¿Acceso directo a items?', CarritoDeCompras.items);

// Nota: en JS moderno, un módulo ESM (ver Día 2) logra el mismo encapsulamiento
// de forma más natural, exportando solo las funciones/valores públicos.
