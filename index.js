/*Crear variables */
const Nota = 20;
let name = 'pep';
let precio = 100;
let fecha = Date();
let estado = false;

/*Funciones o metodos */
function fun1() {
    console.log("Hola mundo desde Javascript");
}

//llamar a una funcion
fun1();

const fun2 = () => {
    console.log("Hola desde  const fun2 = () => {}");
}
//llamar a una funcion
fun2();
const fun3 = () => console.log("Hola desde const fun3");
//llamar a una funcion
fun3();

const fun4 = (a, b) => {
    var result = Number(a) + Number(b);
    return result;
}
console.log("resultado: " + fun4(1, 1));

/*Selectores javascript */
let pais = document.getElementById("pais");
let capital = document.getElementById("capital");
let region = document.getElementById("region");
let idioma = document.getElementById("idioma");


/*funciones para validar */
function validarTexto() {
    var regex = /^[A-Za-z]+$/;
    let validPais = document.getElementById("validPais");
    if (!regex.test(pais.value)) {
        validPais.innerText = "Por favor, introduce solo caracteres de texto."
        validPais.className = "text-danger"
        validPais.style = "display: block;"
        /*modificar el color del borde del input con id=codigo */
        pais.className = "form-control border-input";
        return false;
    }
    validPais.style = "display: none;"
    pais.className = "form-control border-input-ok";
    return true;

}

function validarTexto2() {
    var regex = /^[A-Za-z]+$/;
    let validCapital = document.getElementById("validCapital");
    if (!regex.test(capital.value)) {
        validCapital.innerText = "Por favor, introduce solo caracteres de texto."
        validCapital.className = "text-danger"
        validCapital.style = "display: block;"
        /*modificar el color del borde del input con id=codigo */
        capital.className = "form-control border-input";
        return false;
    }
    validCapital.style = "display: none;"
    capital.className = "form-control border-input-ok";
    return true;

}

function validarTexto3() {
    var regex = /^[A-Za-z]+$/;
    let validRegion = document.getElementById("validRegion");
    if (!regex.test(region.value)) {
        validRegion.innerText = "Por favor, introduce solo caracteres de texto."
        validRegion.className = "text-danger"
        validRegion.style = "display: block;"
        /*modificar el color del borde del input con id=codigo */
        region.className = "form-control border-input";
        return false;
    }
    validRegion.style = "display: none;"
    region.className = "form-control border-input-ok";
    return true;

}

function validarTexto4() {
    var regex = /^[A-Za-z]+$/;
    let validIdioma = document.getElementById("validIdioma");
    if (!regex.test(idioma.value)) {
        validIdioma.innerText = "Por favor, introduce solo caracteres de texto."
        validIdioma.className = "text-danger"
        validIdioma.style = "display: block;"
        /*modificar el color del borde del input con id=codigo */
        idioma.className = "form-control border-input";
        return false;
    }
    validIdioma.style = "display: none;"
    idioma.className = "form-control border-input-ok";
    return true;

}


pais.addEventListener("input", validarTexto);
capital.addEventListener("input", validarTexto2);
region.addEventListener("input", validarTexto3);
idioma.addEventListener("input", validarTexto4);



let array = [];
const url = "https://restcountries.com/v3.1/lang/spanish";
function mostrarTodo() {
    fetch(url)
        .then(function (response) {
            //console.log(response.status);
            //console.log(response.statusText);
            //console.log(response);
            return response.json();
        })
        .then(function (data) {
            //console.log(data);
            array = []
            data.forEach(function (item) {
                const ob = {
                    "pais": item.name.common,
                    "capital": item.capital[0],
                    "region": item.region,
                    "idioma": item.languages.spa
                };
                array.push(ob);
            });
            actualizarTablaHtml();

            console.table(array);
        })
        .catch(function (error) {
            console.log(error);
        });
}
document.addEventListener("DOMContentLoaded", mostrarTodo);
function leerInput() {

    let valid0 = validarTexto();
    let valid1 = validarTexto2();
    let valid2 = validarTexto3();
    let valid3 = validarTexto4();
    if (valid0 && valid1 && valid2 && valid3) {
        let objeto = {
            "pais": pais.value,
            "capital": capital.value,
            "region": region.value,
            "idioma": idioma.value,
            "estado": false
        };
        array.push(objeto);
        actualizarTablaHtml();
        console.table(array);
        limpiar();
    }
    //console.log(valid0);//muestra el valor de retorno de la funcion
    //console.log(codigo); //codigo HTML: etiqueta completa
    //console.log(codigo.value); //codigo.value: datos ingresado en la caja
}
function limpiar() {
    pais.value = "";
    pais.className = "form-control";
    capital.value = "";
    capital.className = "form-control";
    region.value = "";
    region.className = "form-control";
    idioma.value = "";
    idioma.className = "form-control";
    pais.focus();
}
//llamar a una funcion desde javascript
//leerInput();


function actualizarTablaHtml() {
    let tbody = document.getElementById("datosBody");
    tbody.innerHTML = "";
    for (let index = 0; index < array.length; index++) {
        //const element = array[index];
        //tr es una fila
        let fila = document.createElement("tr");

        //td es la columna para el codigo.
        let columnPais = document.createElement("td");
        columnPais.textContent = array[index].pais;
        fila.appendChild(columnPais);

        //td es la columna para el correo
        let columnCapital = document.createElement("td");
        columnCapital.textContent = array[index].capital;
        fila.appendChild(columnCapital);

        //td es la columna para la description
        let columnRegion = document.createElement("td");
        columnRegion.textContent = array[index].region;
        fila.appendChild(columnRegion);

        //td es la columna para la description
        let columnIdioma = document.createElement("td");
        columnIdioma.textContent = array[index].idioma;
        fila.appendChild(columnIdioma);

        //td es la columna para las opciones
        let columnOpciones = document.createElement("td");
        //inicia el codigo del boton de eliminar.
        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.className = "btn btn-danger me-2";
        btnEliminar.addEventListener("click", function () {
            // llamar una funcion..
            //EliminarElemento(index);
            abrirModal(index);
        });
        columnOpciones.appendChild(btnEliminar);
        //fin del codigo del boton de eliminar


        /*Comento el codigo para marcar texto, con el fin de quitar el boton de la interfaz,
        ya que no es necesario ahora, pero lo comento en caso de necesitarlo en otra situacion.
        Con esto realizo el primer commit de la nueva rama*/

        //inicia el codigo del boton marcar.
        /*let btnMarcar = document.createElement("button");
        btnMarcar.textContent = "Marcar";
        btnMarcar.className = "btn btn-primary";
        btnMarcar.addEventListener("click", function () {
            // llamar una funcion
            cambiarEstado(index);
        });
        columnOpciones.appendChild(btnMarcar);
        //fin del codigo del boton marcar*/

        //agrega columnOpciones a la fila
        fila.appendChild(columnOpciones);

        if (array[index].estado) {
            fila.classList.add("marcar-fila");
        }

        //agrega fila con el contenido al tbody de la tabla html
        tbody.appendChild(fila);
    }
}
//se ejecuta cuando al página se cargar por completa.
document.addEventListener("DOMContentLoaded", actualizarTablaHtml);

function EliminarElemento(index) {
    array.splice(index, 1); //quitar el elemento de la posicion index
    actualizarTablaHtml();
}

function cambiarEstado(index) {
    array[index].estado = !array[index].estado;
    //array[index].estado = !(false);    //! = not, ademas existe and, or
    //array[index].estado = true;
    actualizarTablaHtml();
}


//modal de confirmacion de bootstrap 5.3.0
// Obtener referencia al modal
// Función para abrir el modal
function abrirModal(index) {


    var modal = document.getElementById('myModal');
    var index = document.getElementById('index').value = index;
    modal.style.display = 'block';
    //modal.classList.add('show');

}

// Función para cerrar el modal
function cerrarModal() {
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

function EliminarUsoModal() {
    //leer dato de span con 
    var index = document.getElementById('index').value;
    EliminarElemento(index);
    var modal = document.getElementById('myModal');
    modal.style.display = 'none';
}