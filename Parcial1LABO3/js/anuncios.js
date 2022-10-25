class Anuncio
{
    constructor(id,titulo,animal,descripcion,precio)
    {
        this.id = id;
        this.titulo = titulo;
        this.animal = animal;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

export class Anuncio_Mascota extends Anuncio
{
    constructor(id,titulo,animal,descripcion,precio,raza,nacimiento,vacuna)
    {
        super(id,titulo,animal,descripcion,precio);
        this.raza = raza;
        this.nacimiento = nacimiento;
        this.vacuna = vacuna;
    }

    set Id(value)
    {
        this.id = value;
    }
    
}

export function ObtenerUltimoID(datos)
{
    if(!Array.isArray(datos))
    {
        return -1;
    }

    let ultimo = datos.length;

    return ultimo;
}

export function modificarAnuncio(datos, array)
{
    array.forEach(element => 
    {
        if(element.id == datos.id)    
        {
            element.titulo = datos.titulo;
            element.animal = datos.animal;
            element.descripcion = datos.descripcion;
            element.precio = datos.precio;
            element.raza = datos.raza;
            element.nacimiento = datos.nacimiento;
            element.vacuna = datos.vacuna;
        }
    });
}

export function eliminarAnuncio(datos, array)
{
    let it = 0;
    array.forEach(element => 
    {
        if(element.id == datos)    
        {
            array.splice(it,1);
        }
        it++;
    });
}