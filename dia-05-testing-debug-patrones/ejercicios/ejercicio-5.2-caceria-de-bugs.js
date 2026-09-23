// Ejercicio 5.2 — Cacería de bugs guiada
//
// Videos de apoyo (ficha 5.3 del README del día):
//   - Debugging como un profesional en JavaScript con DevTools del navegador – Programación en español: https://www.youtube.com/watch?v=ps1WhgelV_E
//   - Curso de JavaScript #10: Debug y DevTools: https://www.youtube.com/watch?v=Oz3InVBI_K4
//   - Depurar JavaScript con el navegador y con Visual Studio Code: https://www.youtube.com/watch?v=CRXMli2ZkS8
//
// Enunciado (manual del curso):
//   1. Se entrega un pequeño script con un bug intencional relacionado con asincronía (un valor que se usa antes de que la promesa se resuelva).
//   2. Usando breakpoints y el panel Scope de las DevTools (no console.log), localiza la línea exacta donde el valor es incorrecto.
//   3. Documenta en tres líneas el proceso de depuración que seguiste y la corrección aplicada.
//
// Cómo depurar: abre este código en las DevTools del navegador (pestaña Sources, o pégalo en un fragmento/Snippet)
// o ejecútalo con `node --inspect-brk ejercicio-5.2-caceria-de-bugs.js` y abre chrome://inspect.
// Coloca un breakpoint en la línea del cálculo del total y revisa el panel Scope. No uses console.log para encontrar el bug.
//
// Nota de divulgación: Esta plantilla fue elaborada con asistencia de Claude (Anthropic) y revisada por Jesús Armando Tapia Gallegos. Tu código es de tu autoría.

function obtenerPrecio() {
  return new Promise((resolve) => setTimeout(() => resolve(100), 50));
}

let precio; // se llena cuando la promesa se resuelve
obtenerPrecio().then((valor) => {
  precio = valor;
});

const total = precio * 1.16; // <- ¿cuánto vale `precio` en este momento?
console.log('Total con IVA:', total);

// Documenta en tres líneas el proceso de depuración que seguiste y la corrección aplicada:
// 1.
// 2.
// 3.

// ---------------------------------------------------------------------------
// Solución sugerida (inténtalo antes de leerla):
//
// El valor se usa antes de que la promesa se resuelva: la línea del total se ejecuta de forma síncrona, cuando `precio` sigue
// siendo undefined (se ve en el panel Scope), por eso el resultado es NaN. La corrección es esperar la promesa:
//
// async function main() {
//   const precio = await obtenerPrecio();
//   console.log('Total con IVA:', (precio * 1.16).toFixed(2)); // 116.00 (toFixed evita el ruido de la coma flotante)
// }
// main();
