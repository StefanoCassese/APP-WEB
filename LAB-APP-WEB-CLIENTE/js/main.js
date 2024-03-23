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
                    <p>${articulos.title}</p>
                    <p>${articulos.price}</p>
                </div>
                <div class="product__button"><button>Comprar</button></div>
            </article>
            `
        );
        main.append(articulo); // Moved append inside the loop
    });
});

//getProducts()