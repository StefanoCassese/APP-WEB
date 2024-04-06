function getProducts(done) {
    const results = fetch('https://fakestoreapi.com/products');
    results
        .then(response => response.json())
        .then(data => {
            done(data);
        });
}

getProducts(data => {
    const main = document.querySelector("main");
    data.forEach(articulos => {
        const articulo = document.createRange().createContextualFragment(
            `
            <article class="product">
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
});


const navContenedor = document.querySelector("#hamburger-nav")

function returnMenu() {
    navContenedor.innerHTML = `
    
    <div class="logo"><p>Six Shop</p></div>
    <div class="search">
            <input type="text" placeholder="Buscar" class="search-input">
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

//getProducts()