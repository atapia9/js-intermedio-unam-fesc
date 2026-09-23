// Responsabilidad: TODO — describe en una frase qué hace este archivo.
//
// Contrato (export default):
//   class Carrito
//     agregar(producto, cantidad = 1)  -> RangeError si cantidad no es entero > 0;
//                                         si el producto ya estaba, suma las cantidades
//     quitar(id)                       -> true si lo quitó, false si no existía (sin lanzar error)
//     total()                          -> suma de precio * cantidad
//     get items()                      -> COPIA del contenido: [{ id, nombre, precio, cantidad }, ...]
//                                         (modificar el arreglo devuelto no debe alterar el carrito)

export default class Carrito {
  // TODO
}
