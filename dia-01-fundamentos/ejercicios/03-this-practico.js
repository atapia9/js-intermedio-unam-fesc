// Ejercicio 3 — Corrige el valor de `this`
//
// Enunciado:
// El siguiente código tiene un bug: `this` no apunta a lo que se espera
// dentro del setTimeout. Corrígelo SIN cambiar la estructura general
// (puedes usar arrow functions, bind, o guardar una referencia a `this`).

const cronometro = {
  segundos: 0,
  iniciar() {
    setInterval(function tick() {
      this.segundos++; // BUG: this no es `cronometro` aquí
      console.log(`Segundos transcurridos: ${this.segundos}`);
    }, 1000);
  },
};

// No ejecutes cronometro.iniciar() directamente en Node sin detenerlo,
// o el proceso quedará corriendo. Para probar, usa:
//   const id = setInterval(...) y luego clearInterval(id) tras unos segundos.

// ---------------------------------------------------------------------------
// Solución sugerida (opción 1: arrow function, hereda el `this` léxico):
//
// const cronometro = {
//   segundos: 0,
//   iniciar() {
//     const id = setInterval(() => {
//       this.segundos++;
//       console.log(`Segundos transcurridos: ${this.segundos}`);
//       if (this.segundos >= 3) clearInterval(id);
//     }, 1000);
//   },
// };
// cronometro.iniciar();
//
// Solución sugerida (opción 2: bind):
//
// const cronometro2 = {
//   segundos: 0,
//   iniciar() {
//     setInterval(
//       function tick() {
//         this.segundos++;
//         console.log(this.segundos);
//       }.bind(this),
//       1000
//     );
//   },
// };
