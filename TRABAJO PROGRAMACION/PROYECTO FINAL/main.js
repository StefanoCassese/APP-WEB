let carrito = [];
let total = 0;
let carritoVisible = false;

// Función para obtener los productos de la API
async function getProductsFromAPI() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        return [];
    }
}

// Función para cargar los productos en la página
async function cargarProductos() {
    const productos = await getProductsFromAPI();

    const main = document.querySelector(".container");
    productos.forEach(articulo => {
        const productoHTML = `
            <article class="product">
                <div class="product__img">
                    <img src="${articulo.image}">
                </div>
                <div class="product__text">
                    <p class="product__text__title">${articulo.title}</p>
                    <p class="product__text__price">$${articulo.price}</p>
                </div>
                <div class="product__button">
                    <button class="btn btn-color-1">Comprar</button>
                    <button class="btn btn-color-2 proyecto-btn" onclick="agregarAlCarrito('${articulo.id}', '${articulo.title}', '${articulo.image}', ${articulo.price})">Agregar al Carrito</button>
                </div>
            </article>
        `;
        main.insertAdjacentHTML('beforeend', productoHTML);
    });
}

// Función para mostrar el mensaje de carrito vacío y permitir cerrarlo
function mostrarCarritoVacio() {
    const carritoDiv = document.querySelector("#carrito");
    carritoDiv.innerHTML = `
        <h2>CARRITO DE COMPRAS</h2>
        <p>El carrito está vacío</p>
        <button onclick="cerrarCarrito()">Cerrar</button>
    `;
    carritoVisible = true;
    carritoDiv.style.display = "block";
}

// Función para cerrar el carrito manualmente
function cerrarCarrito() {
    const carritoDiv = document.querySelector("#carrito");
    carritoDiv.style.display = "none";
    carritoVisible = false;
}

// Función para actualizar la visualización del carrito
function actualizarCarrito() {
    const carritoDiv = document.querySelector("#carrito");
    if (carrito.length > 0) {
        carritoDiv.innerHTML = "<h2>CARRITO DE COMPRAS</h2>";
        carrito.forEach(producto => {
            carritoDiv.innerHTML += `
                <div class="producto-carrito">
                    <img src="${producto.image}" alt="${producto.title}">
                    <p>${producto.title}</p>
                    <p>Precio: $${producto.price}</p>
                    <p>Cantidad: ${producto.quantity}</p>
                    <button onclick="eliminarProducto('${producto.id}')">Eliminar</button>
                </div>
            `;
        });
        carritoDiv.innerHTML += `<p>Total: $${total.toFixed(2)}</p>`;
        carritoVisible = true;
        carritoDiv.style.display = "block";
    } else {
        mostrarCarritoVacio();
    }
}

// Función para agregar un producto al carrito
function agregarAlCarrito(id, title, image, price) {
    const productoExistente = carrito.find(producto => producto.id === id);
    if (productoExistente) {
        productoExistente.quantity++;
    } else {
        carrito.push({ id, title, image, price, quantity: 1 });
    }
    total += parseFloat(price);
    actualizarCarrito();
}

// Función para eliminar un producto del carrito
function eliminarProducto(id) {
    const index = carrito.findIndex(producto => producto.id === id);
    if (index !== -1) {
        const deletedProduct = carrito.splice(index, 1)[0];
        total -= parseFloat(deletedProduct.price) * deletedProduct.quantity;
    }
    actualizarCarrito();
}

// Función para abrir y cerrar la ventana del carrito
const logoCarrito = document.querySelector(".logo p");

logoCarrito.addEventListener("click", () => {
    if (carrito.length === 0 && carritoVisible) {
        cerrarCarrito();
    } else {
        const carritoDiv = document.querySelector("#carrito");
        carritoDiv.style.display = "block";
        carritoVisible = true;
    }
});

// Cargar productos al cargar la página
cargarProductos();
