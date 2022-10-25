export function validarPrecio(e)
{
    const input = e.target;
    const value = devolverCadena(e);

    if(!value)
    {
        infoError(input,"Campo vacio");
    }
    else
    {
        if(parseInt(value) < 0)
        {
            infoError(input, "Valor minimo 0.");
        }
        else if(parseInt(value) > 50000)
        {
            infoError(input, "Valor maximo 50000.");
        }
        else
        {
            clearError(input);
            input.setAttribute("data-ok","ok");
            console.log(input);
            return true;
        }
    }
    console.log("mal");
    input.removeAttribute("data-ok");
    return false;

}

export function validarTexto(e)
{
    const input = e.target;
    const value = e.target.value.trim() + "";

    if(!value)
    {
        console.log("Dejaste el campo vacio");

        infoError(input, "Campo vacio");
    }
    else
    {
        if(value.length > 25)
        {
            infoError(input, "Maximo 25 caracteres");
        }
        else
        {   
            clearError(input);
            input.setAttribute("data-ok", "ok");
            console.log(input);
            return true;
        }
    }
    console.log("maal");
    input.removeAttribute("data-ok");
    console.log(input);
    return false;
}

function infoError(input, mensaje)
{
    const $small = input.nextElementSibling;
    
    $small.textContent = mensaje || `${input.name} requerido`;
}

function clearError(input)
{
    const $small = input.nextElementSibling;

    $small.textContent = "";
}

function devolverCadena(e)
{
    return e.target.value.trim();
}