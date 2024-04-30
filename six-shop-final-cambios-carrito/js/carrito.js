export function mainCartControler() {

    const $btnCarrito = document.querySelector('#cart')
    const $btnCarritoHamb = document.querySelector('#cart-hamb')

    $btnCarritoHamb.addEventListener('click', ()=> {
        const cartContainer = document.querySelector("#cart-container");
        cartContainer.style.display = cartContainer.style.display == "none" ? "block" : "none";
    })

    $btnCarrito.addEventListener('click', ()=> {
        const cartContainer = document.querySelector("#cart-container");
        cartContainer.style.display = cartContainer.style.display == "none" ? "block" : "none";
    })

    const $btnAddToCart = document.querySelectorAll('.add-to-cart')

    $btnAddToCart.forEach( btn => {
        btn.addEventListener( 'click', ()=> {
            const id = btn.getAttribute('data-productId')
            addToCart(id)
        })
    })

    document.addEventListener('click', (event) => {
        const itemId = event.target.getAttribute('data-productId');
        if (event.target.classList.contains('remove_from_cart')) {
            removeFromCart(itemId)
        }
        if (event.target.classList.contains('btn_subtract'))
        {
            decreaseQuantity(itemId)
        }
        if ((event.target.classList.contains('btn_sum')))
        {
            increaseQuantity(itemId)
        }
        if ((event.target.id === 'finish-btn'))
        {
            finishPurchase()
        }
        if ((event.target.id === 'remove-all-btn'))
        {
            removeAllFromCart()
        }
    });

}


let cart = [];

// Función para agregar productos al carrito
export function addToCart(articuloId) {
    let articulo = cart.find(item => item.id == articuloId);

    if (articulo) {
        articulo.quantity++;
    } else {
        const producto = JSON.parse(localStorage.getItem(`producto-${articuloId}`));
        if (producto) {
            articulo = {
                id: producto.id,
                title: producto.title,
                price: producto.price,
                quantity: 1
            };
            cart.push(articulo);
        }
    }

    updateCart();
}

// Función para quitar productos del carrito
function removeFromCart(itemId) {
    const index = cart.findIndex(item => item.id == itemId);

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
                <button class="btn_subtract" data-productId="${item.id}" ${item.quantity === 1 ? 'disabled' : ''}>-</button> 
                ${item.quantity} 
                <button class="btn_sum" data-productId="${item.id}">+</button> 
                x $${item.price.toFixed(2)} = $${(item.quantity * item.price).toFixed(2)}
            </span>
            <button class="remove_from_cart" data-productId="${item.id}">Eliminar</button>
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
    const item = cart.find(item => item.id == itemId);
    if (item) {
        item.quantity++;
        updateCart();
    }
}

// Función para disminuir cantidad
function decreaseQuantity(itemId) {
    const item = cart.find(item => item.id == itemId);
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

// Cargar el carrito desde localStorage al cargar la página
window.onload = function() {
    if(localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        updateCart();
    }
}
