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
    const menu = document.querySelector(".menu-links")
    const icon = document.querySelector(".hamburger-icon")
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}

document.addEventListener("DOMContentLoaded", function() {
    const icon = document.querySelector(".hamburger-icon");
    if (icon) {
        icon.addEventListener("click", abrirMenu);
    }
});

export function writeProductHTML(data) {
    const main = document.querySelector("main");

    data.forEach(articulos => {
        const articulo = document.createRange().createContextualFragment(
            `
            <article id="${articulos.id}" class="product">
                <div class="product__img">
                <img src="${articulos.image}">
                </div>
                <div class="product__text">
                    <p class="product__text__title">${articulos.title}</p>
                    <p class="product__text__price"><i class="fa-solid fa-dollar-sign"></i>${articulos.price}</p>
                </div>
                <div class="product__button">
                <button class="btn btn-color-1">Comprar</button>
                <button class="add-to-cart btn btn-color-2 proyecto-btn" data-productId="${articulos.id}">Agregar al Carrito</button>
                </div>
            </article>
            `
        );
        main.append(articulo);
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
