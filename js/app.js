let articulosCarrito = []; 

const listaProductos = document.querySelector('#lista-productos');
const carrito = document.querySelector('#carrito');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')

document.addEventListener('DOMContentLoaded', ()=>{
    if(JSON.parse(localStorage.getItem('carrito')) == null){
        articulosCarrito = []
        
    }else {
        articulosCarrito = JSON.parse(localStorage.getItem('carrito'))
        
    }
    carritoHTML();
    finalizarCompra.addEventListener('click', (evt) => {
        evt.preventDefault();
        const carritoJSON = JSON.stringify(articulosCarrito);
        localStorage.setItem('carrito', carritoJSON);
        location.href = './pages/compra.html';
    });
})

listaProductos.addEventListener('click', agregarProducto);
vaciarCarritoBtn.addEventListener('click', vaciarCarrito)
;
carrito.addEventListener('click', eliminarProducto)

function agregarProducto(evt){
    evt.preventDefault();
    if(evt.target.classList.contains('agregar-carrito')){
        const producto = evt.target.parentElement.parentElement;
       
        leerDatosProducto(producto)
        
    }
}

function eliminarProducto(evt){
    evt.preventDefault();
    
    if(evt.target.classList.contains('borrar-producto')){
        const producto = evt.target.parentElement.parentElement;
        const productoId = producto.querySelector('a').getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(producto => producto.id !== productoId);

        carritoHTML();
    }
}

function leerDatosProducto(item){
    const infoProducto = {
        imagen: item.querySelector('img').src,
        titulo: item.querySelector('h4').textContent,
        precio: item.querySelector('.precio span').textContent,
        id: item.querySelector('a').getAttribute('data-id'),
        cantidad: 1
        
    }
    Swal.fire({
    position: 'top-end',
    icon: 'success',
    title: 'Tu 0Km ha sido agregado',
    showConfirmButton: false,
    timer: 2000
    })
    
    if(articulosCarrito.some( item => item.id === infoProducto.id)){ 
        // sumar la cantidad
        const productos = articulosCarrito.map( producto => {
            if(producto.id === infoProducto.id){
                let cantidad = parseInt(producto.cantidad);
                cantidad +=1;
                producto.cantidad = cantidad;
                return producto;
            }else {
                return producto
            }
        })
        articulosCarrito = productos.slice();
    }else {
        articulosCarrito.push(infoProducto)
    }


    carritoHTML()
}

function carritoHTML(){
    limpiarCarrito();
    articulosCarrito.forEach(producto => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td><img src="${producto.imagen}"  width="100"/></td>
            <td>${producto.titulo}</td>
             <td>${producto.precio}</td>
             <td>${producto.cantidad}</td>
            <td>
                <a href="#" class="borrar-producto" data-id="${producto.id}"> ❌ </a>
            </td>
        `;
        contenedorCarrito.appendChild(fila)
    })
    

    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito))
}

function limpiarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

function vaciarCarrito(){
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
    articulosCarrito = [];
    sincronizarStorage();
}


function captura() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const correo = document.getElementById("correo").value;
    let telefono = document.getElementById("telefono").value; 
    const comentario = document.getElementById("comentario").value;

// Remover cualquier caracter no numérico de la variable telefono
    telefono = telefono.replace(/\D/g, '');

    const inputs = [
        { campo: "nombre", valor: nombre },
        { campo: "apellido", valor: apellido },
        { campo: "correo", valor: correo },
        { campo: "telefono", valor: telefono },
    ];

    const campoVacio = inputs.find(input => input.valor === "");

    if (campoVacio) {
        document.getElementById(campoVacio.campo).focus();
    } else {

        inputs.forEach(input => {
            document.getElementById(input.campo).value = "";
        });

        document.getElementById("nombre").focus();

        Swal.fire({
            title: '¡Mensaje enviado!',
            text: `${nombre}, ¡Gracias por tu preferencia! En breve serás contactado por un ejecutivo comercial.`,
            icon: 'success',
            width: 650,
            color: '#033d3d',            
        });
    }
    console.log(inputs);
}
