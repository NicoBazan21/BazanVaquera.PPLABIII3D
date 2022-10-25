export function cargarLocalStorage()
{
    if(localStorage.getItem("anuncios"))
    {
        const vector = JSON.parse(localStorage.getItem("anuncios"));

        return vector;
    }
    else
    {
        return null;
    }
}

export function guardarLocalStorage(array)
{
    localStorage.setItem("anuncios",JSON.stringify(array));
}
