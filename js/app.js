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

    //Eliminar cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

}


//Funciones
function agregarCurso(e) {
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }

}

//Eliminar curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Eliminar del arreglo el curso por ID
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId );

        carritoHTML();//iterar sobre el carrito y mostrar HTML
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

    //revisa si un elemento existe en el carrito 
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id );

    if (existe){
    //actualizamos cantidad
    const cursos = articulosCarrito.map( curso => {
        if( curso.id === infoCurso.id ){
            curso.cantidad++;
            return curso;//objeto actualizado            
        }else{
            return curso;//objetos que no son duplicados
        }
        } );
        articulosCarrito = [...cursos];
    }else{  
    articulosCarrito = [...articulosCarrito, infoCurso];  //agregamos el curso al carrito
    }

    carritoHTML();
}


//muestra carrito de compras en html
function carritoHTML() { 
    
//lipmiar html
    limpiarHTML();

    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
            <img src="${imagen}" width ="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                 <a href="#" class="borrar-curso" data-id="${id}"> X </a>
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