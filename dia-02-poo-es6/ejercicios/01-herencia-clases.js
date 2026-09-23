// Ejercicio 1 — Herencia con clases ES6
//
// Videos de apoyo (ficha 2.2 y 2.3 del README del día):
//   - Herencia prototípica en JavaScript (POO): https://www.youtube.com/watch?v=S_bDXnLnDs8
//   - Las clases y sus métodos: constructor, getters y setters – JS desde cero #12: https://www.youtube.com/watch?v=M0FfjG4mhZg
//   - Herencia de clases: extends y super – JS desde cero #13: https://www.youtube.com/watch?v=-0p9MIqChK0
//
// Enunciado:
// Crea una clase `Vehiculo` con constructor(marca, modelo) y un método
// `describir()` que devuelva "marca modelo".
// Crea `Auto extends Vehiculo` que agregue `numPuertas` y sobrescriba
// `describir()` para incluir el número de puertas, reutilizando `super.describir()`.
// Crea `Motocicleta extends Vehiculo` que agregue `cilindrada` de forma similar.

class Vehiculo {
  // TODO
}

// class Auto extends Vehiculo { ... }
// class Motocicleta extends Vehiculo { ... }

// ---- Pruebas manuales ----
// const auto = new Auto('Toyota', 'Corolla', 4);
// console.log(auto.describir()); // "Toyota Corolla (4 puertas)"
// const moto = new Motocicleta('Honda', 'CBR', 600);
// console.log(moto.describir()); // "Honda CBR (600cc)"

// ---------------------------------------------------------------------------
// Solución sugerida:
//
// class Vehiculo {
//   constructor(marca, modelo) {
//     this.marca = marca;
//     this.modelo = modelo;
//   }
//   describir() {
//     return `${this.marca} ${this.modelo}`;
//   }
// }
//
// class Auto extends Vehiculo {
//   constructor(marca, modelo, numPuertas) {
//     super(marca, modelo);
//     this.numPuertas = numPuertas;
//   }
//   describir() {
//     return `${super.describir()} (${this.numPuertas} puertas)`;
//   }
// }
//
// class Motocicleta extends Vehiculo {
//   constructor(marca, modelo, cilindrada) {
//     super(marca, modelo);
//     this.cilindrada = cilindrada;
//   }
//   describir() {
//     return `${super.describir()} (${this.cilindrada}cc)`;
//   }
// }
