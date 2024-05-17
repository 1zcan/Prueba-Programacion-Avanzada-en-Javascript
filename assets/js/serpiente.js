import Animal from "./animal.js";

class Serpiente extends Animal {
  constructor(nombre, edad, img, comentarios, sonido) {
    super(nombre, edad, img, comentarios, sonido);
  }

  Sisear() {
    return this.sonido();
  }
}

export { Serpiente };
