// Día 3 — Ejemplo: callbacks y "callback hell"
// Ejecuta con: node 01-callbacks.js

function obtenerUsuario(id, callback) {
  setTimeout(() => {
    callback(null, { id, nombre: 'Ana' });
  }, 300);
}

function obtenerPedidos(usuarioId, callback) {
  setTimeout(() => {
    callback(null, ['Pedido 1', 'Pedido 2']);
  }, 300);
}

function obtenerDetallePedido(pedido, callback) {
  setTimeout(() => {
    callback(null, `${pedido} - Detalle completo`);
  }, 300);
}

// "Pyramid of doom": cada paso depende del anterior, anidando callbacks
obtenerUsuario(1, (errUsuario, usuario) => {
  if (errUsuario) return console.error(errUsuario);
  console.log('Usuario:', usuario);

  obtenerPedidos(usuario.id, (errPedidos, pedidos) => {
    if (errPedidos) return console.error(errPedidos);
    console.log('Pedidos:', pedidos);

    obtenerDetallePedido(pedidos[0], (errDetalle, detalle) => {
      if (errDetalle) return console.error(errDetalle);
      console.log('Detalle:', detalle);
      // Cada nivel de anidamiento hace el código más difícil de leer
      // y de manejar errores. Esto motivó la creación de las promesas.
    });
  });
});
