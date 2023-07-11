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
let codigo = document.getElementById("codigo");
let correo = document.getElementById("correo");
let descripcion = document.getElementById("descripcion");
let pais = document.getElementById("pais");

/*funciones para validar */
function validarTexto() {
    var regex = /^[A-Za-z]+$/;
    let validCodigo = document.getElementById("validCodigo");
    if (!regex.test(codigo.value)) {
        validCodigo.innerText = "Por favor, introduce solo caracteres de texto."
        validCodigo.className = "text-danger"
        validCodigo.style = "display: block;"
        /*modificar el color del borde del input con id=codigo */
        codigo.className = "form-control border-input";
        return false;
    }
    validCodigo.style = "display: none;"
    codigo.className = "form-control border-input-ok";
    return true;

}
function validarCorreo() {
    let validCorreo = document.getElementById("validCorreo");
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regex.test(correo.value)) {

        validCorreo.innerText = "ingrese un correo válido";
        validCorreo.className = "text-danger";
        validCorreo.style = "display:block;";

        correo.className = "form-control border-input";
        return false;
    }
    validCorreo.style = "display:none;";
    correo.className = "form-control border-input-ok";
    return true;
}
function validarDescripcion() {
    let validDescripcion = document.getElementById("validDescripcion");
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regex.test(descripcion.value)) {

        validDescripcion.innerText = "ingrese una descripción";
        validDescripcion.className = "text-danger";
        validDescripcion.style = "display:block;";

        descripcion.className = "form-control border-input";
        return false;
    }
    validDescripcion.style = "display:none;";
    descripcion.className = "form-control border-input-ok";
    return true;
}

codigo.addEventListener("input", validarTexto);
correo.addEventListener("input", validarCorreo);
descripcion.addEventListener("input", validarDescripcion);
//pais.addEventListener("input", validarPais);



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
    let valid1 = validarCorreo();
    let valid2 = validarDescripcion();
    let valid3 = validarPais();
    if (valid0 && valid1 && valid2 && valid3) {
        let objeto = {
            "codigo": codigo.value,
            "descripcion": descripcion.value,
            "correo": correo.value,
            "pais": pais.value,
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
    descripcion.value = "";
    descripcion.className = "form-control";
    codigo.value = "";
    codigo.className = "form-control";
    correo.value = "";
    correo.className = "form-control";
    pais.value = "";
    pais.className = "form-control";
    codigo.focus();
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
        let columnCodigo = document.createElement("td");
        columnCodigo.textContent = array[index].pais;
        fila.appendChild(columnCodigo);

        //td es la columna para el correo
        let columnCorreo = document.createElement("td");
        columnCorreo.textContent = array[index].correo;
        fila.appendChild(columnCorreo);

        //td es la columna para la description
        let columnDescripcion = document.createElement("td");
        columnDescripcion.textContent = array[index].descripcion;
        fila.appendChild(columnDescripcion);

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

        //inicia el codigo del boton marcar.
        let btnMarcar = document.createElement("button");
        btnMarcar.textContent = "Marcar";
        btnMarcar.className = "btn btn-primary";
        btnMarcar.addEventListener("click", function () {
            // llamar una funcion
            cambiarEstado(index);
        });
        columnOpciones.appendChild(btnMarcar);
        //fin del codigo del boton marcar

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