// Verificador local de la Actividad 2. Ejecuta: node verificar.mjs
// No sustituye la revisión del instructor: comprueba el contrato, no la calidad del diseño.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const aqui = dirname(fileURLToPath(import.meta.url));
const archivos = ['empleados/Empleado.js', 'empleados/Gerente.js', 'empleados/Desarrollador.js',
  'tienda/productos.js', 'tienda/carrito.js', 'tienda/app.js'];
let fallos = 0;

async function prueba(nombre, fn) {
  try { await fn(); console.log(`  ok    ${nombre}`); }
  catch (e) { fallos++; console.log(`  FALLA ${nombre}\n        ${String(e.message).split('\n')[0]}`); }
}
const lanza = (fn, tipo) => assert.throws(fn, tipo);

console.log('\nEstructura y responsabilidad');
for (const f of archivos) {
  await prueba(`${f}: primer comentario describe su responsabilidad`, () => {
    const primera = readFileSync(join(aqui, f), 'utf8').split('\n')[0];
    assert.match(primera, /^\/\/\s*Responsabilidad:/, 'la primera línea debe empezar con "// Responsabilidad:"');
    assert.ok(!/TODO/.test(primera), 'reemplaza el TODO por una descripción real');
  });
}

console.log('\nJerarquía de empleados');
let Empleado, Gerente, Desarrollador;
try {
  ({ default: Empleado } = await import('./empleados/Empleado.js'));
  ({ default: Gerente } = await import('./empleados/Gerente.js'));
  ({ default: Desarrollador } = await import('./empleados/Desarrollador.js'));
} catch (e) { fallos++; console.log(`  FALLA no se pudieron importar las clases: ${e.message}`); }

if (Empleado && Gerente && Desarrollador) {
  const mk = () => ({
    ana: new Empleado('Ana', 10000),
    luis: new Gerente('Luis', 20000, ['Ana', 'Sofía']),
    sofia: new Desarrollador('Sofía', 15000, ['JavaScript', 'Python']),
  });
  await prueba('Empleado expone salario por getter/setter y no como propiedad propia', () => {
    const { ana } = mk();
    assert.equal(ana.salario, 10000);
    assert.ok(!Object.keys(ana).includes('salario'), '#salario debe ser un campo privado');
    const d = Object.getOwnPropertyDescriptor(Empleado.prototype, 'salario');
    assert.ok(d && d.get && d.set, 'define get y set salario en la clase');
  });
  await prueba('salario negativo lanza RangeError (constructor y setter)', () => {
    lanza(() => new Empleado('X', -1), RangeError);
    const { ana } = mk();
    lanza(() => { ana.salario = -5; }, RangeError);
    assert.equal(ana.salario, 10000);
    ana.salario = 12000; assert.equal(ana.salario, 12000);
  });
  await prueba('los métodos se comparten vía prototipo (no se copian por instancia)', () => {
    const { ana } = mk();
    for (const m of ['calcularBono', 'mostrarPerfil']) {
      assert.ok(!Object.hasOwn(ana, m), `${m} no debe ser propiedad propia de la instancia`);
      assert.equal(typeof Empleado.prototype[m], 'function');
    }
  });
  await prueba('bonos: Empleado 10%, Gerente 20%, Desarrollador 15%', () => {
    const { ana, luis, sofia } = mk();
    assert.equal(ana.calcularBono(), 1000);
    assert.equal(luis.calcularBono(), 4000);
    assert.equal(sofia.calcularBono(), 2250);
  });
  await prueba('Gerente y Desarrollador heredan de Empleado', () => {
    const { luis, sofia } = mk();
    assert.ok(luis instanceof Empleado && sofia instanceof Empleado);
    assert.ok(Object.getPrototypeOf(Gerente.prototype) === Empleado.prototype);
  });
  await prueba('mostrarPerfil incluye rol y datos propios de cada clase', () => {
    const { ana, luis, sofia } = mk();
    assert.match(ana.mostrarPerfil(), /Ana/);
    assert.match(luis.mostrarPerfil(), /Gerente/); assert.match(luis.mostrarPerfil(), /Luis/);
    assert.match(luis.mostrarPerfil(), /2/, 'debe mencionar cuántas personas tiene a cargo');
    assert.match(sofia.mostrarPerfil(), /Desarrollador/); assert.match(sofia.mostrarPerfil(), /JavaScript/);
  });
  await prueba('Empleado.calcularNomina (estático) suma salario + bono de cada uno', () => {
    const { ana, luis, sofia } = mk();
    assert.equal(typeof Empleado.calcularNomina, 'function');
    assert.equal(Empleado.calcularNomina([ana, luis, sofia]), 11000 + 24000 + 17250);
    assert.equal(Empleado.calcularNomina([]), 0);
  });
}

console.log('\nTienda por módulos');
let productosMod, Carrito;
try {
  productosMod = await import('./tienda/productos.js');
  ({ default: Carrito } = await import('./tienda/carrito.js'));
} catch (e) { fallos++; console.log(`  FALLA no se pudieron importar los módulos: ${e.message}`); }

if (productosMod && Carrito) {
  const { buscarProducto } = productosMod;
  const productos = productosMod.productos ?? [];
  const listos = () => assert.ok(productos.length >= 2, 'completa primero productos.js (necesita al menos 2 productos)');
  await prueba('productos.js: catálogo válido y buscarProducto(id)', () => {
    assert.ok(Array.isArray(productos) && productos.length >= 3, 'al menos 3 productos');
    for (const p of productos) assert.ok(p.id !== undefined && p.nombre && p.precio > 0, 'cada producto: id, nombre, precio > 0');
    assert.deepEqual(buscarProducto(productos[0].id), productos[0]);
    assert.equal(buscarProducto('no-existe'), undefined);
  });
  await prueba('carrito: agregar acumula cantidades y total() calcula bien', () => {
    listos();
    const c = new Carrito(); const [a, b] = productos;
    c.agregar(a); c.agregar(a, 2); c.agregar(b, 2);
    assert.equal(c.items.find((i) => i.id === a.id).cantidad, 3);
    assert.equal(c.total(), a.precio * 3 + b.precio * 2);
  });
  await prueba('carrito: cantidad inválida lanza RangeError', () => {
    listos();
    const c = new Carrito();
    for (const q of [0, -1, 1.5]) lanza(() => c.agregar(productos[0], q), RangeError);
  });
  await prueba('carrito: quitar devuelve true/false sin lanzar', () => {
    listos();
    const c = new Carrito(); c.agregar(productos[0]);
    assert.equal(c.quitar(productos[0].id), true);
    assert.equal(c.quitar('no-existe'), false);
    assert.equal(c.total(), 0);
  });
  await prueba('carrito: items devuelve una copia protegida', () => {
    listos();
    const c = new Carrito(); c.agregar(productos[0]);
    const copia = c.items; copia.push({ id: 'x', nombre: 'x', precio: 1, cantidad: 1 });
    assert.equal(c.items.length, 1, 'modificar el arreglo devuelto no debe alterar el carrito');
  });
  await prueba('app.js: se ejecuta e imprime ticket con subtotal, IVA y Total', () => {
    const salida = execFileSync('node', [join(aqui, 'tienda/app.js')], { encoding: 'utf8' });
    assert.match(salida, /IVA/); assert.match(salida, /Total/i);
    const src = readFileSync(join(aqui, 'tienda/app.js'), 'utf8');
    assert.match(src, /from\s+['"]\.\/productos\.js['"]/, 'debe importar ./productos.js');
    assert.match(src, /from\s+['"]\.\/carrito\.js['"]/, 'debe importar ./carrito.js');
  });
}

console.log('\nSugerencias (no afectan el resultado)');
const src = (f) => { try { return readFileSync(join(aqui, f), 'utf8').replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, ''); } catch { return ''; } };
const todo = archivos.map(src).join('\n');
console.log(/\.\.\./.test(src('tienda/carrito.js')) ? '  ok    usas spread en carrito.js' : '  ojo   ¿podrías usar spread en carrito.js para copiar sin alterar el original?');
console.log(/(const|let)\s*\{[^}]+\}\s*=/.test(todo) || /\(\s*\{[^}]+\}\s*\)/.test(todo) ? '  ok    usas desestructuración' : '  ojo   ¿podrías usar desestructuración (ficha 2.4)?');
console.log(/`[^`]*\$\{/.test(src('tienda/app.js')) ? '  ok    usas template literals en el ticket' : '  ojo   el ticket debería armarse con template literals');

console.log(fallos === 0 ? '\nTodo el contrato se cumple.\n' : `\n${fallos} comprobación(es) pendiente(s).\n`);
process.exit(fallos === 0 ? 0 : 1);
