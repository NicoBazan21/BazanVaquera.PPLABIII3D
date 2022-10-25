import {cargarLocalStorage} from "./localStorage.js";

if(cargarLocalStorage)
{
    const anuncios = cargarLocalStorage();
    const articulo = document.getElementById("mostrarAnuncios");

        anuncios.forEach(anuncio => 
        {
            articulo.appendChild(crearArticulo(anuncio));
        });
}

function crearArticulo(anuncio)
{
    const bloque = document.createElement("div");
    const titulo = document.createElement("h2");
    const descripcion = document.createElement("p");
    const precio = document.createElement("p");
    const raza = document.createElement("p");
    const animal = document.createElement("p");
    const vacunado = document.createElement("p");
    const razaIm = document.createElement("img");
    const nacimiento = document.createElement("img");
    const vacunadoIm = document.createElement("img");

    bloque.classList.add("bloque");
    descripcion.classList.add("subtitulo");
    precio.classList.add("precio");
    raza.classList.add("caracteristicas");
    animal.classList.add("caracteristicas");
    vacunado.classList.add("caracteristicas");
    razaIm.setAttribute("src", "./imagenes/raza.png");
    nacimiento.setAttribute("src", "./imagenes/nacimiento.png");
    vacunadoIm.setAttribute("src", "./imagenes/vacuna.png");

    titulo.textContent = anuncio.titulo;
    descripcion.textContent = anuncio.descripcion;
    precio.textContent = "$" + anuncio.precio;
    raza.textContent =" " + anuncio.raza + " ";
    animal.textContent = " "+ anuncio.animal + " ";
    vacunado.textContent = " " + anuncio.vacuna;

    const array = [titulo,descripcion,precio,razaIm,raza,nacimiento,animal,vacunadoIm,vacunado];


    for (const iterator of array) 
    {
        bloque.appendChild(iterator);
    }
    return bloque;
}