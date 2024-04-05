import { getApiProductList } from "./api.js"
import { traducirNombresCategoria } from "../index.js";

const boton = document.getElementById('btn-Buscador');
const input = document.getElementById('barra-Busqueda');

let productosList = [];

// Una vez se ha obtenido los productos de la api ejecutara los eventos posteriores, esto a fan de evitar algunos errores
getApiProductList().then(products => {
    productosList = products;
    
    // evento que espera a que el usuario escriba para luego filtrarlo en mostrarProductoBuscado()
    input.addEventListener('input', function(event) {
        const textoIngresado = event.target.value;
        mostrarProductoBuscado(textoIngresado)
    })

    // Evento de escucha que verifica que el input de la barra de busqueda devuelva un valo del tipo lenght mayor a 0
    input.addEventListener('input', function(event) {
        const valorInput = event.target.value;
        if(valorInput.trim().length > 0)
        {
            mostrarOverlay()
        } else {
            ocultarOverlay()
        }
    }) 

})

// muestra los productos filtrados en la barra de busqueda segun lo que escribio el usuario
function mostrarProductoBuscado(textoBuscado) {

    const productsContainer = document.getElementById('contenedor-Resultado-Buscador');
    const largoMaxNombreProducto = 36; // la cantidad maxima de caracteres que puede tener el nombre del producto buscado

    if (textoBuscado.length === 0) {
        productsContainer.innerHTML = ""; 
        return; 
    } 

    const productosFiltrados = productosList.filter(producto =>
         producto.title.toUpperCase().includes(textoBuscado.toUpperCase()));
    
    const productosHTML = productosFiltrados.map(producto => {
        const nombreCategoriaTraducida = traducirNombresCategoria(producto.category);
        return `
            <article>
                <button id="btn-Resultado-Producto-Buscado" class="btn-Resultado-Producto-Buscado">
                    <div class="producto-Buscado">
                        <img src="${producto.image}" alt="${producto.title}">
                        <div class="contenedor-Texto-Producto-Buscado">
                            <p class="nombre-Producto-Buscado">${truncarTexto(producto.title, largoMaxNombreProducto)}</p>
                            <p class="categoria-Producto-Buscado">${nombreCategoriaTraducida}</p>
                            <p class="precio-Producto-Buscado">$ ${producto.price}</p>
                        </div>                
                    </div>
                </button>           
            </article>
        `;
    }).join('');
    
    productsContainer.innerHTML = productosHTML;
}

// Animacion que muestra la barra de busqueda poniendo el foco en el inpuct text del buscador
export function mostrarBarraBusqueda() {
    boton.classList.remove('btn-Buscador')
    boton.classList.add('btn-Buscador-inpuctText-Dezplegado')
    input.classList.remove('barra-Busqueda-Oculta')
    input.classList.add('barra-Busqueda')
    input.style.animation = 'expandirBarraBusqueda 0.5s forwards';
    boton.style.animation = 'DesplazarBtnBusquedaIzquierda 0.5s forwards';
    input.focus();
}

// Overlay de los resultados del buscador  al escribir en el
function mostrarOverlay() {
    const overlay = document.getElementById('overlay-Buscador');
    overlay.style.display = 'flex'; 
}

// Evento de llamada al evento ocultar cuando se deja de hacer el foco en el buscador
input.addEventListener('blur', ocultarBarraBusqueda); 

// Animacion que oculta la barra de busqueda al no hacer foco en la misma por 5 segundos
function ocultarBarraBusqueda() {
    setTimeout(() => {        
        if (document.activeElement !== input) {
            ocultarOverlay() // Se oculta el overlay segun se cierre la barra de busqueda
            boton.classList.remove('btn-Buscador-inpuctText-Dezplegado')
            boton.classList.add('btn-Buscador')
            input.classList.remove('barra-Busqueda')
            input.classList.add('barra-Busqueda-Oculta')
            boton.style.animation = 'DesplazarBtnBusquedaDerecha 0.5s forwards'
            input.value = ""; // Se resetea el valor de input a 0 de largo
        }
    }, 5000);
}

function ocultarOverlay() {
    const overlay = document.getElementById('overlay-Buscador');
    overlay.style.display = 'none'; 
}

function truncarTexto(texto, limite) {
    if (texto.length > limite) {
        return texto.substring(0, limite - 3) + '...';
    } else {
        return texto;
    }
}



