// Día 5 — Ejemplo: patrón Singleton
// Ejecuta con: node 03-singleton.js

class ConfiguracionApp {
  static #instancia; // campo estático privado: guarda la única instancia

  #datos;

  constructor() {
    if (ConfiguracionApp.#instancia) {
      throw new Error('Usa ConfiguracionApp.obtenerInstancia() en vez de "new"');
    }
    this.#datos = { tema: 'claro', idioma: 'es' };
  }

  static obtenerInstancia() {
    if (!ConfiguracionApp.#instancia) {
      ConfiguracionApp.#instancia = new ConfiguracionApp();
    }
    return ConfiguracionApp.#instancia;
  }

  get(clave) {
    return this.#datos[clave];
  }

  set(clave, valor) {
    this.#datos[clave] = valor;
  }
}

const config1 = ConfiguracionApp.obtenerInstancia();
config1.set('tema', 'oscuro');

const config2 = ConfiguracionApp.obtenerInstancia();
console.log('¿Misma instancia?', config1 === config2); // true
console.log('Tema visto desde config2:', config2.get('tema')); // "oscuro" — comparten estado
