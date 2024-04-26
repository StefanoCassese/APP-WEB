let cart = [];
let tarjetaAbierta = false;
let productos = [];

// Función para obtener los productos y mostrarlos en la página
function getArticulos(done) {
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => done(data))
        .catch(error => console.error('Error al obtener los productos:', error));
}

// Obtener los productos y mostrarlos en la página
getArticulos(data => {
    productos = data;
    agregarProductosAlDOM(productos);
});

// Función para agregar los productos al DOM
function agregarProductosAlDOM(productos) {
    const main = document.querySelector("main");
    main.innerHTML = ''; // Limpiar el contenido actual

    productos.forEach((articulo, index) => {
        localStorage.setItem(`producto-${articulo.id}`, JSON.stringify(articulo));
        const articuloElement = document.createElement('article');
        articuloElement.innerHTML = `
            <div class="image-container">
                <img src="${articulo.image}" alt="${articulo.title}" class="articulo-imagen">
            </div>
            <h2>${articulo.title}</h2>
            <h3>$ ${articulo.price}</h3>
            <button onclick="mostrarTarjetaProducto(${articulo.id})">Ver Detalles</button>
            <button onclick="addToCart(${articulo.id})">Agregar al carrito</button>
        `;
        main.appendChild(articuloElement);
    });
}

// Función para mostrar la tarjeta del producto seleccionado
function mostrarTarjetaProducto(articuloId) {
    // Cerrar tarjeta anterior si está abierta
    if (tarjetaAbierta) {
        cerrarTarjetaProducto();
    }

    const articulo = productos.find(item => item.id === articuloId);
    const tarjetaProducto = document.createElement('div');
    tarjetaProducto.classList.add('tarjeta-producto');
    tarjetaProducto.innerHTML = `
        <button class="cerrar-tarjeta" onclick="cerrarTarjetaProducto()">Cerrar</button>
        <img src="${articulo.image}" alt="${articulo.title}" class="tarjeta-imagen">
        <h2>${articulo.title}</h2>
        <h3>$ ${articulo.price}</h3>
        <button onclick="addToCart(${articulo.id})">Agregar al carrito</button>
    `;
    document.body.appendChild(tarjetaProducto);
    tarjetaAbierta = true;
}

// Función para cerrar la tarjeta del producto
function cerrarTarjetaProducto() {
    const tarjetaProducto = document.querySelector(".tarjeta-producto");
    tarjetaProducto.parentNode.removeChild(tarjetaProducto);
    tarjetaAbierta = false;
}

function toggleCart() {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.style.display = cartContainer.style.display === "none" ? "block" : "none";
}

// Función para agregar productos al carrito
function addToCart(articuloId) {
    const articulo = cart.find(item => item.id === articuloId);

    if (!articulo) {
        const producto = JSON.parse(localStorage.getItem(`producto-${articuloId}`));
        if (producto) {
            cart.push({
                id: producto.id,
                title: producto.title,
                price: producto.price,
                quantity: 1
            });
        }
    } else {
        articulo.quantity++;
    }

    updateCart();
}

// Función para quitar productos del carrito
function removeFromCart(itemId) {
    const index = cart.findIndex(item => item.id === itemId);

    if (index !== -1) {
        cart[index].quantity -= 1;

        if (cart[index].quantity === 0) {
            cart.splice(index, 1);
        }
    }

    updateCart();
}

// Función para eliminar todos los productos del carrito
function removeAllFromCart() {
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
}

// Función para actualizar el carrito
function updateCart() {
    const cartList = document.getElementById("cart-list");
    const totalPrice = document.getElementById("total-price");
    const cartCount = document.getElementById("cart-count");
    const finishBtn = document.getElementById("finish-btn");
    const removeAllBtn = document.getElementById("remove-all-btn");

    cartList.innerHTML = "";
    let total = 0;
    let itemCount = 0;

    cart.forEach(item => {
        const listItem = document.createElement("li");
        listItem.className = "cart-item";
        listItem.innerHTML = `
            <span>${item.title} - 
                <button onclick="decreaseQuantity(${item.id})" ${item.quantity === 1 ? 'disabled' : ''}>-</button> 
                ${item.quantity} 
                <button onclick="increaseQuantity(${item.id})">+</button> 
                x $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}
            </span>
            <button onclick="removeFromCart(${item.id})">Eliminar</button>
        `;
        cartList.appendChild(listItem);

        total += item.quantity * item.price;
        itemCount += item.quantity;
    });

    totalPrice.textContent = `$${total.toFixed(2)}`;
    cartCount.textContent = itemCount;

    // Mostrar o ocultar el carrito según el número de ítems
    const cartContainer = document.getElementById("cart-container");
    cartContainer.style.display = itemCount > 0 ? "block" : "none";

    // Mostrar botones de Finalizar Compra y Eliminar Todo
    finishBtn.style.display = itemCount > 0 ? "block" : "none";
    removeAllBtn.style.display = itemCount > 0 ? "block" : "none";

    // Actualizar localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Función para aumentar cantidad
function increaseQuantity(itemId) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

// Función para disminuir cantidad
function decreaseQuantity(itemId) {
    const item = cart.find(item => item.id === itemId);
    if (item && item.quantity > 1) {
        item.quantity--;
        updateCart();
    }
}

// Función para finalizar la compra
function finishPurchase() {
    cart = [];
    localStorage.removeItem('cart');
    updateCart();
    alert('¡Compra realizada con éxito!');
}

// Función para buscar productos
function searchProducts() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    const filteredProducts = productos.filter(producto => producto.title.toLowerCase().includes(searchTerm));
    agregarProductosAlDOM(filteredProducts);

    // Mostrar botón de volver
    document.getElementById("back-btn").style.display = "block";
}

// Función para mostrar todos los productos
function showAllProducts() {
    agregarProductosAlDOM(productos);

    // Ocultar botón de volver
    document.getElementById("back-btn").style.display = "none";
}


// Cargar el carrito desde localStorage al cargar la página
window.onload = function() {
    if(localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        updateCart();
    }
}


