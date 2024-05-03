import { searchLogic } from "./searcher.js";
import { createCategoryFilter } from "./categoryFilter.js";
import { mainCartControler } from "./carrito.js";

function getProducts(done) {
    const results = fetch('https://fakestoreapi.com/products');
    results
        .then(response => response.json())
        .then(data => {   
            done(data);
        });
}

getProducts(data => {
    writeProductHTML(data)
});

function abrirMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

function cerrarMenu(event) {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    const isClickInsideMenu = menu.contains(event.target);
    const isClickInsideIcon = icon.contains(event.target);
    
    if (!isClickInsideMenu && !isClickInsideIcon) {
        menu.classList.remove("open");
        icon.classList.remove("open");
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const icon = document.querySelector(".hamburger-icon");
    if (icon) {
        icon.addEventListener("click", abrirMenu);
    }

    const links = document.querySelectorAll(".menu-links a");
    links.forEach(link => {
        link.addEventListener("click", () => {
            const menu = document.querySelector(".menu-links");
            const icon = document.querySelector(".hamburger-icon");
            menu.classList.remove("open");
            icon.classList.remove("open");
        });
    });

    document.body.addEventListener("click", cerrarMenu);

});

export function writeProductHTML(data) {
    const main = document.querySelector("main");

    data.forEach(articulos => {
        localStorage.setItem(`producto-${articulos.id}`, JSON.stringify(articulos));
        const articulo = document.createRange().createContextualFragment(
            `
            <article id="${articulos.id}" class="product">
                <div class="product__img">
                    <img src="${articulos.image}" alt="${articulos.title}">
                </div>
                <div class="product__text">
                    <p class="product__text__title">${articulos.title}</p>
                    <p class="product__text__price"><i class="fa-solid fa-dollar-sign"></i>${articulos.price}</p>
                </div>
                <div class="product__button">
                    <button class="ver-detalles-btn btn btn-color-2 proyecto-btn" data-productId="${articulos.id}">Ver Detalles</button>
                    <button class="add-to-cart btn btn-color-2 proyecto-btn" data-productId="${articulos.id}">Agregar al Carrito</button>
                </div>
            </article>
            `
        );
        main.append(articulo);
    });

        // Agregar event listeners después de crear los elementos
        const verDetallesButtons = main.querySelectorAll('.ver-detalles-btn');
        verDetallesButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.getAttribute('data-productId');
                const producto = JSON.parse(localStorage.getItem(`producto-${productId}`));
                mostrarDetallesProducto(producto);
            });
        });
}


/* resuelvo la promesa de getProducts para usarlo en una lista*/

function solveGetProductsPromise() {
    return new Promise((resolve, reject) => {
        getProducts(data => {       
            resolve(data);
        });
    });
}

async function getGlobalProductsList() {
    let productList = await solveGetProductsPromise()
    return productList;
}

/* acorta el text para que no supere el limite maximo asignado*/

export function truncarTexto(texto, limite) {
    if (texto.length > limite) {
        return texto.substring(0, limite - 3) + '...';
    } else {
        return texto;
    }
}

/* Logica buscador */

searchLogic(await getGlobalProductsList())

/* Logica categorias */

createCategoryFilter(await getGlobalProductsList())
   
/* Logica carrito*/

mainCartControler()

/* Función para mostrar los detalles del producto */

let tarjetaDetalleAbierta = null;

export function mostrarDetallesProducto(producto) {
    // Cerrar la tarjeta de detalles actualmente abierta, si existe
    if (tarjetaDetalleAbierta) {
        document.body.removeChild(tarjetaDetalleAbierta);
        tarjetaDetalleAbierta = null;
    }
    
    const detalleProducto = document.createElement('div');
    detalleProducto.classList.add('producto-detalle-custom');
    
    const descripcionCompleta = producto.description;
    const descripcionCorta = truncarTexto(producto.description, 200);
    let descripcionExpandida = false;
    
    detalleProducto.innerHTML = `
        <div class="detalle-producto__imagen-custom">
            <img src="${producto.image}" alt="${producto.title}">
        </div>
        <div class="detalle-producto__info-custom">
                <h2 class="detalle-producto__titulo-custom">${producto.title}</h2>
                <div class="detalle-producto__descripcion-container">
                <p class="detalle-producto__descripcion-custom">${descripcionCorta}</p>
                <p class="detalle-producto__descripcion-custom"><button class="detalle-producto__leer-mas-btn-custom btn btn-color-2 proyecto-btn">Leer más</button><p/>
            </div>
            <p class="detalle-producto__precio-custom">$${producto.price}</p>
            <div class= "product__button">
                <button class="detalle-producto__cerrar-btn-custom btn btn-color-2 proyecto-btn">Cerrar</button>
            </div>
        </div>

    `;

    document.body.appendChild(detalleProducto);
    
    const cerrarBtn = detalleProducto.querySelector('.detalle-producto__cerrar-btn-custom');
    cerrarBtn.addEventListener('click', () => {
        document.body.removeChild(detalleProducto);
        tarjetaDetalleAbierta = null;
    });

    const leerMasBtn = detalleProducto.querySelector('.detalle-producto__leer-mas-btn-custom');
    leerMasBtn.addEventListener('click', () => {
        descripcionExpandida = !descripcionExpandida;
        const descripcion = descripcionExpandida ? descripcionCompleta : descripcionCorta;
        descripcionContainer.textContent = descripcion;
        leerMasBtn.textContent = descripcionExpandida ? 'Leer menos' : 'Leer más';
    });
    
    const descripcionContainer = detalleProducto.querySelector('.detalle-producto__descripcion-custom');
    
    tarjetaDetalleAbierta = detalleProducto;
}
