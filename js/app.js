//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners(){
    //cuando se agrega un curso presionando agregar al carrito
    listaCursos.addEventListener('click', agregarCurso);

}


//Funciones
function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

}

function leerDatosCurso(curso){

    const infoCurso= {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1 
    }

    articulosCarrito = [...articulosCarrito, infoCurso];

    carritoHTML();
}

//muestra carrito de compras en html
function carritoHTML() { 
    
//lipmiar html
    limpiarHTML();

    articulosCarrito.forEach( curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                ${curso.titulo}
            </td>
        `;

        //aagrega el html en el tbody
        contenedorCarrito.appendChild(row);

    })
}

//elimina cursos del tbody
function limpiarHTML() {

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}