// Ejecuta con: node main.js
// (requiere el package.json de esta carpeta con "type": "module")

import { sumar, restar, PI } from './matematicas.js'; // export nombrado, entre llaves
import Curso from './Curso.js'; // export default, sin llaves

console.log('Suma:', sumar(2, 3));
console.log('Resta:', restar(5, 2));
console.log('PI:', PI);

const curso = new Curso('JavaScript Intermedio', 20);
console.log(curso.describir());

// En el navegador, el equivalente es:
// <script type="module" src="main.js"></script>
