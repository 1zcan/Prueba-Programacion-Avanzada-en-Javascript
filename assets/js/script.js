import { Leon } from "./leon.js"; //5.Dividir en modulos
import { Lobo } from "./lobo.js";
import { Oso } from "./oso.js";
import { Serpiente } from "./serpiente.js";
import { Aguila } from "./aguila.js";

const divAnimales = document.querySelector("#Animales");
const selectorAnimal = document.querySelector("#animal");
const edad = document.querySelector("#edad");
const comentarios = document.querySelector("#comentarios");
const preview = document.querySelector("#preview");
const btnRegistrar = document.querySelector("#btnRegistrar");

let arregloAnimales = [];
let nuevoAnimal;

btnRegistrar.addEventListener("click", (evento) => {
  evento.preventDefault();

  obtenerInformacion();
});

let listaAnimalesJson = (() => {
  const url = "http://127.0.0.1:5500/animales.json"; //Mismo puerto con el que se levanta live server.

  //3.Realizar consultas asíncronas
  const obtenerData = async () => {
    //Async para obtener los datos
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos;
  };

  return { obtenerData };
})();

//Async para cambiar la imagen de preview (4.IIFE)
(() => {
  selectorAnimal.addEventListener("change", async (valorAnimal) => {
    const { animales } = await listaAnimalesJson.obtenerData();
    const nombreAnimal = valorAnimal.target.value;
    const imagenAnimal = animales.find(
      (data) => data.name == nombreAnimal
    ).imagen;

    preview.innerHTML = `<img class="rounded mx-auto d-block" width="85%" height="100%" src="/assets/imgs/${imagenAnimal}" />`;
  });
})();

//Crea nueva instancia de animal
const obtenerInformacion = async () => {
  const { animales } = await listaAnimalesJson.obtenerData();

  //7.validar inputs.
  if (selectorAnimal.value === "Seleccione un animal") {
    alert("El campo no puede quedar vacío");
  } else if (edad.value === "Seleccione un rango de años") {
    alert("El campo no puede quedar vacío");
  } else if (comentarios.value == "") {
    alert("El campo no puede quedar vacío");
  } else {
    try {
      const imagenAnimal = animales.find(
        (animal) => animal.name === selectorAnimal.value
      ).imagen;
      //9. Programar la interacción del botón de audio, pasa como argumento al constructor de animal, el cual retorna el metodo correspondiente this.sonido()
      const sonidoAnimal = animales.find(
        (animal) => animal.name === selectorAnimal.value
      ).sonido;

      //2.Crear las instancias de las clases utilizando los datos del formulario.
      if (selectorAnimal.value == "Leon") {
        nuevoAnimal = new Leon(
          selectorAnimal.value,
          edad.value,
          `/assets/imgs/${imagenAnimal}`,
          comentarios.value,
          `/assets/sounds/${sonidoAnimal}`
        );
      }
      if (selectorAnimal.value == "Lobo") {
        nuevoAnimal = new Lobo(
          selectorAnimal.value,
          edad.value,
          `/assets/imgs/${imagenAnimal}`,
          comentarios.value,
          `/assets/sounds/${sonidoAnimal}`
        );
      }
      if (selectorAnimal.value == "Oso") {
        nuevoAnimal = new Oso(
          selectorAnimal.value,
          edad.value,
          `/assets/imgs/${imagenAnimal}`,
          comentarios.value,
          `/assets/sounds/${sonidoAnimal}`
        );
      }
      if (selectorAnimal.value == "Serpiente") {
        nuevoAnimal = new Serpiente(
          selectorAnimal.value,
          edad.value,
          `/assets/imgs/${imagenAnimal}`,
          comentarios.value,
          `/assets/sounds/${sonidoAnimal}`
        );
      }
      if (selectorAnimal.value == "Aguila") {
        nuevoAnimal = new Aguila(
          selectorAnimal.value,
          edad.value,
          `/assets/imgs/${imagenAnimal}`,
          comentarios.value,
          `/assets/sounds/${sonidoAnimal}`
        );
      }

      arregloAnimales.push(nuevoAnimal); //Agrega los datos de "nuevoAnimal" en el arreglo vacio.
      mostrarAnimalInvestigacion();
      limpiarFormulario();
    } catch (error) {
      console.error(error);
      console.log(
        "Error en la ejecución del programa para agregar el animal a su respectiva clase."
      );
    }
  }
};

//6.Utilizar la manipulación del DOM para mostrar en la tabla los animales registrados
const mostrarAnimalInvestigacion = () => {
  divAnimales.innerHTML = "";

  arregloAnimales.forEach((elemento, index) => {
    divAnimales.innerHTML += `<div class="${elemento.nombre} ml-3 mr-3">
                <img src="${elemento.img}" onclick="mostrarModal(${index})" width="200" height="200 "alt="">
                <br>
                <img src="assets/imgs/audio.svg" onclick="document.querySelector('.${elemento.nombre} audio').play()" 
                width="200" height="40" style="background-color: gray" class="pb-1 pt-1" />
                <audio>
                    <source src="${elemento.sonido}" type="audio/mpeg"></source>
                </audio>
            </div>`;
  });
};

//10.Mostrar el detalle de cada animal en una ventana modal al ser presionada su imagen.
window.mostrarModal = (index) => {
  let arregloModal = arregloAnimales[index];
  let modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = `
    <div class="text-center text-light  mx-auto">
        <div class="modal-body">
            <img src="${arregloModal.img}" class="rounded mx-auto d-block" width="100%" height ="100%" />           
            <p class="mt-2">${arregloModal.edad}</p>
            <p>Comentarios:</p>
            <hr></hr>
            <p>${arregloModal.comentarios}</p> 
        </div>
    </div>`;
  $("#exampleModal").modal("toggle");
};

//8.Devolver el formulario en un estado inicial luego de registrar a cada animal.
const limpiarFormulario = () => {
  selectorAnimal.selectedIndex = 0;
  edad.selectedIndex = 0;
  comentarios.value = "";
  document.querySelector("#preview").innerHTML = "";
  document.querySelector("#preview").style.backgroundImage =
    "assets/imgs/lion.svg";
};
