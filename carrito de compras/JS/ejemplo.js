const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector(
	'.container-cart-products'
);

btnCart.addEventListener('click', () => {
	containerCartProducts.classList.toggle('hidden-cart');
});

/* ========================= */
const cartInfo = document.querySelector('.cart-product'); // creo una variable que selecciona a .cart-product una clase de html que representa la barra del carrito //
const rowProduct = document.querySelector('.row-product');  //creo una variable que selecciona a .row-product una clase de html que representa el listado dentro del carrito //


// Creo una Lista de todos los contenedores de productos
const productsList = document.querySelector('.container-items'); //container-items = es el div con la lista de todos los productos en la pagina //


// creaccion de la variable que se encargue del arreglo de los productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar'); // Esta clase se crea para q vayamos sumando el valor de los productos, ver mas abajo

const countProducts = document.querySelector('#contador-productos'); // este es el contador de los productos #es un id esta en html

const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');
//creo la funcion para que el programa reaccione al click del usuario -- addEventListener funcion de js que le dice al programa que este atento a que va a estar haciendo el usuario en este caso cuando hace click
productsList.addEventListener('click', e => {
	 

    if (e.target.classList.contains('btn-add-cart')) { /*Aca llamamos solo a la calse que contiene el boton añadir al carrito*/
		const product = e.target.parentElement;

		const infoProduct = {
			quantity: 1, // x defecto al hacer el primer click quiero q selecione 1 solo producto 
			title: product.querySelector('h2').textContent, // tmb al clickear en el boton agrego a la lista del carrito el nombre del prodcuto
			price: product.querySelector('p').textContent, // tmb al clickear en el boton agrego a la lista del carrito valor del producto el cual se va a ir sumando al final
		};

		const exits = allProducts.some(
			product => product.title === infoProduct.title
		); // some recorre todos los objetos que tiene el vector y con esta constante exits puedo identificar que productos dentro del carrito existen para no agregarlos nuevamente y asi sumar uno dsp del otro

		if (exits) { // este if funciona para que se agreguen una sola vez los productos y solo aumente la cantidad
			const products = allProducts.map(product => {
				if (product.title === infoProduct.title) {
					product.quantity++;
					return product;
				} else {
					return product;
				}
			});
			allProducts = [...products];
		} else {
			allProducts = [...allProducts, infoProduct];
		}

		showHTML(); // sirve para mostrar todo el contenido de de html que creamos en la constante showHTML ver mas abajo la clase
	}
});
// para que cada vez que hagamos click en la x saquemos algun producto
rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) { //la clase icon-close esta dentro del svg del icono de la x
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent; // ademas de usar titulos es mejor usar ID

		allProducts = allProducts.filter( 
			product => product.title !== title
		);

		console.log(allProducts);

		showHTML();
	}
});

// Funcion para mostrar  HTML
const showHTML = () => {
	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden');
		rowProduct.classList.add('hidden');
		cartTotal.classList.add('hidden');
	} else {
		cartEmpty.classList.add('hidden');
		rowProduct.classList.remove('hidden');
		cartTotal.classList.remove('hidden');
	}

	// Limpiar HTML estba escrito algo no darle mucha importancia
	rowProduct.innerHTML = '';
    //Esto lo creamos para que se vaya sumando el precio final y la cantidad de productos en el carrito ver la funcion abajo
	let total = 0;
	let totalOfProducts = 0;

	allProducts.forEach(product => {
		const containerProduct = document.createElement('div');
		containerProduct.classList.add('cart-product');

		containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">${product.price}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="icon-close"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

		rowProduct.append(containerProduct);

		total =
			total + parseInt(product.quantity * product.price.slice(1)); // este es el total se hace cantidad de producto * precio
		totalOfProducts = totalOfProducts + product.quantity; // el  totla de los productos es la suma del product.quantity dentro del carrito
	});

	valorTotal.innerText = `$${total}`; // aca hago que se sume el total
	countProducts.innerText = totalOfProducts; // aca en esta funcion hacemos que se sumen los productos
};