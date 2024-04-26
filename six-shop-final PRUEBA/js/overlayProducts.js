import { truncarTexto } from "./main.js";

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
