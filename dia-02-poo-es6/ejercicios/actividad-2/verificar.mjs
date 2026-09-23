// Verificador local de la Actividad 2. Ejecuta: node verificar.mjs   (Node.js 18+, sin dependencias)
// Comprueba el contrato de los ejercicios 2.2 (jerarquía de clases) y 2.4 (carrito en módulos), no la calidad del diseño.
//
// Nota de divulgación: Este material fue elaborado con asistencia de Claude (Anthropic) y revisado por Jesús Armando Tapia Gallegos.
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const aqui = dirname(fileURLToPath(import.meta.url));
const archivos = ['empleados/Empleado.js', 'empleados/Gerente.js', 'empleados/Desarrollador.js', 'tienda/productos.js', 'tienda/carrito.js', 'tienda/app.js'];
const sinComentarios = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '').replace(/\s\/\/.*$/gm, '');
const codigo = (f) => { try { return sinComentarios(readFileSync(join(aqui, f), 'utf8')); } catch { return ''; } };
let fallos = 0;
async function prueba(nombre, fn) {
  try { await fn(); console.log(`  ok    ${nombre}`); }
  catch (e) {
    fallos++;
    const pista = e instanceof TypeError && /undefined|not a function|not a constructor|null/.test(e.message) ? ' — ¿completaste esta parte? Todavía no existe' : '';
    console.log(`  FALLA ${nombre}\n        ${String(e.message).split('\n')[0]}${pista}`);
  }
}

console.log('\nEstructura y responsabilidad');
for (const f of archivos) {
  await prueba(`${f}: la primera línea es "// Responsabilidad: ..." sin TODO`, () => {
    const primera = readFileSync(join(aqui, f), 'utf8').split('\n')[0];
    assert.match(primera, /^\/\/\s*Responsabilidad:/, 'la primera línea debe empezar con "// Responsabilidad:"');
    assert.ok(!/TODO/.test(primera), 'reemplaza el TODO por una descripción real');
  });
}

console.log('\nEjercicio 2.2 — Jerarquía de clases');
let Empleado, Gerente, Desarrollador;
try {
  ({ default: Empleado } = await import('./empleados/Empleado.js'));
  ({ default: Gerente } = await import('./empleados/Gerente.js'));
  ({ default: Desarrollador } = await import('./empleados/Desarrollador.js'));
} catch (e) { fallos++; console.log(`  FALLA no se pudieron importar las clases: ${e.message}`); }

if (Empleado && Gerente && Desarrollador) {
  await prueba('Empleado tiene nombre, puesto y un campo privado #salario con getter y setter', () => {
    const e = new Empleado('Ana', 'Analista', 10000);
    assert.equal(e.nombre, 'Ana'); assert.equal(e.puesto, 'Analista'); assert.equal(e.salario, 10000);
    assert.ok(!Object.keys(e).includes('salario'), '#salario debe ser un campo privado, no una propiedad pública');
    const d = Object.getOwnPropertyDescriptor(Empleado.prototype, 'salario');
    assert.ok(d && d.get && d.set, 'define get y set salario en la clase');
    assert.match(codigo('empleados/Empleado.js'), /#salario/, 'declara el campo privado #salario');
  });
  await prueba('un salario negativo lanza Error (en el constructor y en el setter) y no cambia el valor', () => {
    assert.throws(() => new Empleado('X', 'Y', -1), Error);
    const e = new Empleado('Ana', 'Analista', 10000);
    assert.throws(() => { e.salario = -5; }, Error);
    assert.equal(e.salario, 10000);
    e.salario = 12000; assert.equal(e.salario, 12000);
  });
  await prueba('Gerente extiende Empleado (con super) y tiene su atributo propio equipoACargo', () => {
    const g = new Gerente('Luis', 'Gerente de TI', 20000, ['Ana', 'Sofía']);
    assert.ok(g instanceof Empleado); assert.equal(g.salario, 20000); assert.equal(g.puesto, 'Gerente de TI');
    assert.deepEqual([...g.equipoACargo], ['Ana', 'Sofía']);
    assert.deepEqual([...new Gerente('Luis', 'G', 1).equipoACargo], [], 'sin equipo, equipoACargo empieza vacío');
    assert.match(codigo('empleados/Gerente.js'), /\bsuper\s*\(/, 'usa super() en el constructor');
    assert.throws(() => new Gerente('Luis', 'G', -1), Error, 'el salario negativo también se rechaza en las derivadas');
  });
  await prueba('Desarrollador extiende Empleado (con super) y tiene su atributo propio lenguajesDominados', () => {
    const d = new Desarrollador('Sofía', 'Desarrolladora', 15000, ['JavaScript', 'Python']);
    assert.ok(d instanceof Empleado); assert.equal(d.salario, 15000);
    assert.deepEqual([...d.lenguajesDominados], ['JavaScript', 'Python']);
    assert.deepEqual([...new Desarrollador('S', 'D', 1).lenguajesDominados], []);
    assert.match(codigo('empleados/Desarrollador.js'), /\bsuper\s*\(/, 'usa super() en el constructor');
  });
  await prueba('Empleado.calcularNomina (estático, con reduce) suma los salarios del arreglo', () => {
    const lista = [new Empleado('Ana', 'A', 10000), new Gerente('Luis', 'G', 20000), new Desarrollador('Sofía', 'D', 15000)];
    assert.equal(typeof Empleado.calcularNomina, 'function');
    assert.equal(Empleado.calcularNomina(lista), 45000);
    assert.equal(Empleado.calcularNomina([]), 0);
    assert.match(codigo('empleados/Empleado.js'), /\.reduce\s*\(/, 'calcula la nómina con reduce');
  });
}

console.log('\nEjercicio 2.4 — Carrito de compras en módulos');
let productosMod, carritoMod;
try { productosMod = await import('./tienda/productos.js'); carritoMod = await import('./tienda/carrito.js'); }
catch (e) { fallos++; console.log(`  FALLA no se pudieron importar los módulos: ${e.message}`); }

if (productosMod && carritoMod) {
  const productos = productosMod.productos ?? [];
  const { agregarProducto, eliminarProducto, calcularTotal } = carritoMod;
  const listos = () => assert.ok(productos.length >= 2, 'completa primero productos.js (necesita al menos 2 productos)');
  await prueba('productos.js exporta (export nombrado) un arreglo de al menos 3 productos { id, nombre, precio }', () => {
    assert.ok(Array.isArray(productosMod.productos) && productos.length >= 3, 'exporta `productos` con al menos 3 elementos');
    for (const p of productos) assert.ok(p.id !== undefined && p.nombre && typeof p.precio === 'number' && p.precio > 0, 'cada producto: id, nombre y precio numérico mayor que 0');
  });
  await prueba('agregarProducto devuelve un carrito nuevo con { ...producto, cantidad } y no modifica el original', () => {
    listos(); const [a] = productos; const vacio = [];
    const c1 = agregarProducto(vacio, a, 2);
    assert.deepEqual(vacio, [], 'no modifiques el carrito que recibes');
    assert.equal(c1.length, 1); assert.equal(c1[0].cantidad, 2); assert.equal(c1[0].id, a.id); assert.equal(c1[0].precio, a.precio);
    assert.equal(agregarProducto([], a)[0].cantidad, 1, 'la cantidad por defecto es 1');
  });
  await prueba('agregar el mismo producto dos veces suma las cantidades', () => {
    listos(); const [a, b] = productos;
    let c = agregarProducto([], a, 1); c = agregarProducto(c, b, 2); c = agregarProducto(c, a, 3);
    assert.equal(c.length, 2); assert.equal(c.find((i) => i.id === a.id).cantidad, 4);
  });
  await prueba('cantidades inválidas (0, negativas, decimales, NaN) lanzan RangeError', () => {
    listos(); for (const q of [0, -1, 1.5, NaN]) assert.throws(() => agregarProducto([], productos[0], q), RangeError);
  });
  await prueba('eliminarProducto quita el producto sin modificar el original; uno inexistente no falla', () => {
    listos(); const [a, b] = productos;
    const c = agregarProducto(agregarProducto([], a, 1), b, 1); const copia = JSON.parse(JSON.stringify(c));
    const sin = eliminarProducto(c, a.id);
    assert.deepEqual(c, copia, 'no modifiques el carrito que recibes'); assert.equal(sin.length, 1); assert.equal(sin[0].id, b.id);
    assert.deepEqual(eliminarProducto(c, 'no-existe'), c);
  });
  await prueba('calcularTotal suma precio * cantidad (0 con el carrito vacío)', () => {
    listos(); const [a, b] = productos;
    assert.equal(calcularTotal([]), 0);
    assert.equal(calcularTotal(agregarProducto(agregarProducto([], a, 2), b, 3)), a.precio * 2 + b.precio * 3);
  });
  await prueba('app.js importa ambos módulos y muestra una demostración con el total en consola', () => {
    const src = readFileSync(join(aqui, 'tienda/app.js'), 'utf8');
    assert.match(src, /from\s+['"]\.\/productos\.js['"]/, 'debe importar ./productos.js'); assert.match(src, /from\s+['"]\.\/carrito\.js['"]/, 'debe importar ./carrito.js');
    const salida = execFileSync('node', [join(aqui, 'tienda/app.js')], { encoding: 'utf8' });
    assert.match(salida, /total/i, 'la demostración debe mostrar el total');
  });
}

console.log('\nSugerencias (no afectan el resultado)');
const todo = archivos.map(codigo).join('\n');
console.log(/\.\.\./.test(codigo('tienda/carrito.js')) ? '  ok    usas spread en carrito.js' : '  ojo   ¿podrías usar spread en carrito.js para copiar sin modificar el original?');
console.log(/(const|let)\s*\{[^}]+\}\s*=/.test(todo) || /\(\s*\{[^}]+\}\s*[,)]/.test(todo) ? '  ok    usas desestructuración' : '  ojo   ¿podrías usar desestructuración (ficha 2.4)?');
console.log(/`[^`]*\$\{/.test(codigo('tienda/app.js')) ? '  ok    usas template literals en la demostración' : '  ojo   la demostración podría armarse con template literals');

console.log(fallos === 0 ? '\nTodo el contrato se cumple.\n' : `\n${fallos} comprobación(es) pendiente(s).\n`);
process.exit(fallos === 0 ? 0 : 1);
