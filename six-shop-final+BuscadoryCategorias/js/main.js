import { searchLogic } from "./searcher.js";

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

function writeProductHTML(data) {
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
                <button class="btn btn-color-2 proyecto-btn">Agregar al Carrito</button>
                </div>
            </article>
            `
        );
        main.append(articulo);
    });
}

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

const navContenedor = document.querySelector("#hamburger-nav")

function returnMenu() {
    navContenedor.innerHTML = `
    
    <div class="logo"><p>Six Shop</p></div>
        <div id="searchMediumWidth" class="search">
            <input id="search-input" type="text" placeholder="Buscar" class="search-input">
        </div>
    <div class="hamburger-menu">
        <div class="hamburger-icon" onclick="abrirMenu()">
            <span></span>
            <span></span>
            <span></span>
        </div>
        <div class="menu-links">
            <li><a href="#carrito" onclick="abrirMenu()">Carrito</a></li>
            <li><a href="#productos" onclick="abrirMenu()">Productos</a></li>
            <li><a href="#contacto" onclick="abrirMenu()">Contacto</a></li>
        </div>
    </div>`
}

function abrirMenu() {
    const menu = document.querySelector(".menu-links")
    const icon = document.querySelector(".hamburger-icon")
    menu.classList.toggle("open")
    icon.classList.toggle("open")
}

returnMenu()

/* Logica buscador */

searchLogic(await getGlobalProductsList())

export function truncarTexto(texto, limite) {
    if (texto.length > limite) {
        return texto.substring(0, limite - 3) + '...';
    } else {
        return texto;
    }
}

/* Logica overlay productos */

export function generateProductsOverlay(productId, productsList) {

    const getProductById = productsList.filter( product => product.id === productId)
    const product = getProductById[0]
    
    const maxLenghtDescription =  400;
    const productDescription = truncarTexto(product.description, maxLenghtDescription)
    
    const productCardOverlay = `
    <section id="products-overlay" class="products-overlay">        
        <article class="products-card product">
            <div class="product-card-container">    
                <button id="btn-products-overlay-close" class="btn-products-overlay-close">
                    <i class="fa-regular fa-circle-xmark"></i>
                </button>
                <div class=" product-card-img">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <section class="product-card-information" >
                    <div class="product-card-text">
                        <strong class="product__text__title">${product.title}</strong>
                        <p class="product-card-category">${product.category}</p>
                        <p title="${product.description}" class="products-card-description">${productDescription}</p>
                        <p id="products-card-price" class="products-card-price">$${product.price}</p>
                    </div>
                    <div class="products-card-btns product__button ">
                        <button class="btn btn-color-1">Comprar</button>
                        <button class="btn btn-color-2">Agregar al Carrito</button>
                    </div>
                </section>
            </div>         
        </article>
    </section>
    `;

    const $productCardOverlay = document.querySelector('#products-overlay')

    if($productCardOverlay !== null)
    {
        $productCardOverlay.remove()
    }

    document.body.insertAdjacentHTML("afterbegin", productCardOverlay);

    animatedPageMovementToProduct(product.id)

    const $newProductCardOverlay = document.querySelector('#products-overlay');

    if ($newProductCardOverlay !== null) {
        $newProductCardOverlay.style.display = 'flex';
    
        const $buttonClose = document.querySelector('#btn-products-overlay-close')

        $buttonClose.addEventListener('click', event => {
            $newProductCardOverlay.style.display = 'none';
        });
    }

}

function animatedPageMovementToProduct(productId) {
    const linkProductos = document.querySelector(`article[id="${productId}"]`);
    if (linkProductos) {
        linkProductos.scrollIntoView({ behavior: 'smooth' ,block: 'start', inline: 'nearest'});
    }
}

/* Logica categorias */

let categoryImages = [
    {
        id: 1,
        title: "electronics",
        image: "IMG/CATEGORIES/electronics.png"
    },
    {
        id: 2,
        title: "jewelery",
        image: "IMG/CATEGORIES/jewelery.png"
    },
    {
        id: 3,
        title: "women's clothing",
        image: "IMG/CATEGORIES/women's clothing.png"
    },
    {
        id: 4,
        title: "men's clothing",
        image: "IMG/CATEGORIES/men's clothing.png"
    }
]

const categoryContainer = document.querySelector('#category-container')
const btnRemoveCategory = document.querySelector('#btn-remove-category')

function generateCategoryCard() {

    const divCategoryCardContent = document.createElement('div')
    divCategoryCardContent.classList.add('category-card-content')

    categoryImages.forEach( category => {
        divCategoryCardContent.innerHTML += `
        <button class="btn-category-card" id="btn-category-card" data-category="${category.title}">  
            <div class="category-card center-elements id="${category.id}" ">
                <img src="${category.image}" alt="${category.title}">
                <h1 class="title-category">${category.title}</h1>
            </div>    
        </button>      
        `;
    })

    categoryContainer.appendChild(divCategoryCardContent)

    const buttonCategories = document.querySelectorAll('#btn-category-card')

    buttonCategories.forEach( button => {
        button.addEventListener('click', event => {
            let category = button.getAttribute('data-category')
            categoryFilter(category)
            btnRemoveCategory.style.display = 'flex';
            categoryContainer.style.display = 'none';
        })
    })
}         

generateCategoryCard()

async function categoryFilter(category) 
{
    const productsList = await getGlobalProductsList();
    setTimeout(() => {
        const subtitleName = document.querySelector('#subtitle')
        subtitleName.textContent = category;

        let productsListFiltered = productsList.filter(product => product.category == category)

        document.querySelector("main").innerHTML = "";
    
        writeProductHTML(productsListFiltered)
    
        const btnRemoveCategory = document.querySelector('#btn-remove-category')
        btnRemoveCategory.style.display = 'flex';
        btnRemoveCategory.addEventListener('click', event => {
            btnRemoveCategory.style.display = 'none';
            categoryContainer.style.display = 'flex';
            subtitleName.textContent = "Productos";
            document.querySelector("main").innerHTML = "";
            getProducts(data => {
                writeProductHTML(data)
            });
        })
    }, await getGlobalProductsList());
}

