// Responsabilidad: TODO — describe en una frase qué hace este archivo.
//
// Contrato (lo comprueba verificar.mjs):
//   new Empleado(nombre, salario)   -> RangeError si salario < 0
//   #salario privado, con getter y setter públicos `salario` (el setter rechaza negativos con RangeError)
//   calcularBono()                  -> 10% del salario
//   mostrarPerfil()                 -> string que incluye el nombre
//   static calcularNomina(lista)    -> suma de (salario + bono) de cada empleado de la lista
//
// Los métodos deben vivir en el prototipo (compartidos), no copiarse en cada instancia.

export default class Empleado {
  // TODO
}
