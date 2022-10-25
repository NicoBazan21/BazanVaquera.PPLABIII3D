import {anuncioss} from "./data.js";
import {crearTabla} from "./tabla.js";
import {ObtenerUltimoID, Anuncio_Mascota, modificarAnuncio, eliminarAnuncio} from "./anuncios.js";
import {cargarLocalStorage,guardarLocalStorage} from "./localStorage.js";
import {validarPrecio,validarTexto} from "./validaciones.js";

if(!cargarLocalStorage())
{
    guardarLocalStorage(anuncioss);
}

const anuncios = cargarLocalStorage();

const divTabla = document.getElementById("divTabla");

const $formAnuncios = document.querySelector("form");

const $btnEliminar = $formAnuncios.lastElementChild;

const $btnCancelar = $btnEliminar.previousElementSibling;

const spinner = document.createElement("i");
spinner.classList = `fa fa-spinner spinner`;

let bot = false;

añadirValidaciones($formAnuncios.children[0].children);
actualizarTabla();

function actualizarTabla()
{
    while(divTabla.hasChildNodes())
    {
        divTabla.removeChild(divTabla.firstChild);
    }
    
    $formAnuncios.appendChild(spinner);
    setTimeout(() =>
    {
        $formAnuncios.removeChild(spinner);
        divTabla.appendChild(crearTabla(anuncios));
        guardarLocalStorage(anuncios);

    },500);
}

function agregarAnuncio(anuncio)
{
    anuncios.push(anuncio);
}
let envio;

divTabla.addEventListener("click", (e)=>
{
    const emisor = e.target;

    if(emisor.matches("tbody tr td"))
    {
        let id = emisor.parentElement.dataset.id;
        envio = id;
        const anuncio = anuncios.find((element)=> element.id == id );

        const fieldset = $formAnuncios.children[0].children;

        for (const iterator of fieldset) 
        {
            iterator.setAttribute("data-ok","ok");
            switch(iterator.getAttribute("name"))
            {
                case "titulo":
                    iterator.value = anuncio.titulo;
                    break;
                case "animal":
                    if(anuncio.animal == "Perro" && iterator.getAttribute("id") == "radioAnimalP")
                    {
                        iterator.nextElementSibling.removeAttribute("checked");
                        iterator.setAttribute("checked", true);
                    }
                    else if(anuncio.animal == "Gato" && iterator.getAttribute("id") == "radioAnimalG")
                    {
                        iterator.previousElementSibling.removeAttribute("checked");
                        iterator.setAttribute("checked", true);
                    }
                    break;
                case "descripcion":
                    iterator.value = anuncio.descripcion;
                    break;
                case "precio":
                    iterator.value = anuncio.precio;
                    break;
                case "raza":
                    iterator.value = anuncio.raza;
                    break;
                case "nacimiento":
                    iterator.value = anuncio.nacimiento;
                    break;
                case "vacuna":
                    iterator.value = anuncio.vacuna;
                    break;
            }
        }
        bot = true;
        cambiarBotones(bot);

        console.log(anuncio);
    }
});


function cambiarBotones(bool)
{
    const botonG = $formAnuncios.children[2];
    const botonC = $formAnuncios.children[3];
    const botonE = $formAnuncios.children[4];

    if(bool)
    {
        botonG.textContent = "";
        botonG.insertAdjacentHTML("afterbegin",`<i class="fa-brands fa-modx"></i> Modificar`);
        botonE.classList.remove("invisible");
        botonC.classList.remove("invisible");
    }
    else
    {
        botonG.textContent = "";
        botonG.insertAdjacentHTML("afterbegin", `<i class="fa-solid fa-floppy-disk"></i>
        Guardar`);
        botonE.classList.add("invisible");
        botonC.classList.add("invisible");
    }
}


$formAnuncios.addEventListener("submit", (e) =>
{
    e.preventDefault();
    const {titulo,animal,descripcion,precio,raza,nacimiento,vacuna} = e.target;

    console.log(camposOk($formAnuncios.children[0].children));
    if(camposOk($formAnuncios.children[0].children))
    {
        if(bot)
        {
            const anuncio = new Anuncio_Mascota(envio,
            titulo.value,
            animal.value,
            descripcion.value,
            precio.value,
            raza.value,
            nacimiento.value,
            vacuna.value);

            modificarAnuncio(anuncio, anuncios);
        }
        else
        {
            const anuncio = new Anuncio_Mascota(ObtenerUltimoID(anuncios) + 1,
            titulo.value,
            animal.value,
            descripcion.value,
            precio.value,
            raza.value,
            nacimiento.value,
            vacuna.value);

            agregarAnuncio(anuncio);
        }
    }

        bot = false;
        cambiarBotones(bot);
        actualizarTabla();
});


$btnEliminar.addEventListener("click", (e) => 
{
    e.preventDefault();
    
    eliminarAnuncio(envio,anuncios);

    actualizarTabla();
    $btnCancelar.click();
    bot = false;
    cambiarBotones(bot);
});

$btnCancelar.addEventListener("click", (e) => 
{
    camposNoOk($formAnuncios.children[0].children);
    bot = false;
    cambiarBotones(bot);
});

function añadirValidaciones(padre)
{
    for (const iterator of padre) 
    {
        switch(iterator.getAttribute("name"))
        {
            case "precio":
                iterator.addEventListener("blur", validarPrecio);
                break;
            case "raza":
                iterator.addEventListener("blur", validarTexto);
                break;
            case "titulo":
                iterator.addEventListener("blur", validarTexto);
                break;
            case "descripcion":
                iterator.addEventListener("blur", validarTexto);
                break;
        }
    }
}

function camposOk(padre)
{
    for (const iterator of padre) 
    {
        if(iterator.matches("input") && iterator.matches("[type=text]"))
        {
            if(!iterator.hasAttribute("data-ok"))
            {
                return false;
            }
        }
    }
    return true;
}

function camposNoOk(padre)
{
    for (const iterator of padre) 
    {
        if(iterator.matches("input") && iterator.matches("[type=text]"))
        {
            iterator.removeAttribute("data-ok");
        }
    }
}