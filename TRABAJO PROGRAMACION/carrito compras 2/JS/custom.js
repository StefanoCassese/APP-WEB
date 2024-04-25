

// apartado para las variables

let allContainerCart = document.querySelector('.products');// este es el selector de todo el container
let containerBuyCart = document.querySelector('.card-items');// este es el contenedor principal donde van a estar las cosas del carrito
let priceTotal = document.querySelector('.price-total')
let amountProduct = document.querySelector('.count-product');


let buyThings = []; // arreglo donde añadimos los objetos de los productos
let totalCard = 0;
let countProduct = 0;

// apartado funciones

loadEventListenrs(); // se llama a la funcion para que abajo se ejecute
function loadEventListenrs(){  // esta funcion nos sirve para añadir los liststenrs a los selectores para generar la respuesta. En este caso son:
    allContainerCart.addEventListener('click', addProduct);// le informamos a los listeners que tienen que reaccionar a la funcion click

    containerBuyCart.addEventListener('click', deleteProduct);// para que con el clik podamos eliminar los productos que deseamos
}


// AGREGAR PRODUCTOS AL CARRITO

function addProduct(e){ //e = evento
  e.preventDefault(); // esto se pone xq el boton de añadir a carrito es un link a el cual redicciona. De esta manera no va a recargar o redireccionar si no que imprime el resultado del evento 
  if (e.target.classList.contains('btn-add-cart')) {// direccionamos el evento a cada vez que se haga click en el boton
  // console.log(e.target.parentElement); // target sirve para darle la ubicacion del evento a recuperar cada vez que ejecutemos la funcion click y el parentElement es un atributo que hace que no solo selecionemos el elemento al que le hicimos click si no que tmb muestar al padre del elemento en este caso el div que lo contiene
      const selectProduct = e.target.parentElement;  // guardo la funcion en una constante para que se repita 
      readTheContent(selectProduct); // Hacemos que con el click agreguemos se lea todo el div que contiene el producto y lo podamos imprimir en el carrito
  }
}

// ELIMINAR PRODUCTOS DEL CARRITO
function deleteProduct(e) { // solo para la clase delete producto
  if (e.target.classList.contains('delete-product')) {
      const deleteId = e.target.getAttribute('data-id');

      buyThings.forEach(value => {
          if (value.id == deleteId) {
              let priceReduce = parseFloat(value.price) * parseFloat(value.amount);
              totalCard =  totalCard - priceReduce;
              totalCard = totalCard.toFixed(2);
          }
      });
      buyThings = buyThings.filter(product => product.id !== deleteId); // reccoremos con filter el arreglo de buyThings con todos los objetos product y si su id es disitinto de deleteId se elimina
      
      countProduct--;
  }
  //FIX: El contador se quedaba con "1" aunque ubiera 0 productos
  if (buyThings.length === 0) {
    priceTotal.innerHTML = 0;
    amountProduct.innerHTML = 0;
}
loadHtml();
}

// llamamos a la funcion readTheContent para que lea el contendido de la varibale productos

function readTheContent(product){  // esto es un objeto al estilo POO para que podamos ver todo lo que querramos en el carrito
  const infoProduct = {
      image: product.querySelector('div img').src, // esta es para que dentro del divisor img se utilice unicamente al src como targer
      title: product.querySelector('.title').textContent, // .title = clase titulo .textContent para visualizar el texto y no el formato
      price: product.querySelector('div p span').textContent, // el precio esta dentro deun div, en un paraffo con etiqueta span
      id: product.querySelector('a').getAttribute('data-id'),
      amount: 1 // para que este por defecto en el contador y dsp podamos crear la suma y que se vea reflejado en la cantidad dentro del carrito 
  }
  totalCard = parseFloat(totalCard) + parseFloat(infoProduct.price);
    totalCard = totalCard.toFixed(2);  //[para que el precio tenga 2 decimales]

    const exist = buyThings.some(product => product.id === infoProduct.id); // Aca estoy recorriendo buyThings buscnado (con some) si hay algun id de los productos que ya existe, si ya esxiste no vuelve a imprimirse en el carro [some devuelve t or f]
    if (exist) {
        const pro = buyThings.map(product => {
            if (product.id === infoProduct.id) {
                product.amount++; //Si al mapear buyThing encuentra 2 id products iguales tiene q sumar 1 a amount product
                return product;
            } else {
                return product
            }
        });
        buyThings = [...pro];  // hago que ele nuevo arreglo pro sea = a buyThings
    } else {
        buyThings = [...buyThings, infoProduct]  //... para hacer una copia del nuevo arreglo que se va a crear al hacer click y luego con infoprodcut le añadimos todo lo que corresponde al producto
        countProduct++;
    }
    loadHtml(); // esto lo creamo para poder darle formato al carrito(ver la imagen del producto ect y con el formato que nostoros querramos)
    //console.log(infoProduct);
}

function loadHtml(){
  clearHtml();
  buyThings.forEach(product => { // con esto hago que en la funcion loadHtml recorra cada elemeto que contiene buythings el cual va a contener el objeto product
      const {image, title, price, amount, id} = product; // sacamos los atributos al objeto para que al mismo tiempo se usen como variables bajo el mismo nombre
       
      // empieza la construccion de la estructura

      const row = document.createElement('div'); // ahi cree un div dinamico
      row.classList.add('item'); // estamos usando todo el formato de la clase item que esta en html
      row.innerHTML = `
          <img src="${image}" alt="">
          <div class="item-content">
              <h5>${title}</h5>
              <h5 class="cart-price">${price}$</h5>
              <h6>Amount: ${amount}</h6>
          </div>
          <span class="delete-product" data-id="${id}">X</span>
      `; // esta funcion nos permite agregar contenido de la clase item volviendo el html estatico en dinamico

      containerBuyCart.appendChild(row); //appendChild es para añadir un elemento hijo al selector en este caso row es un div q esta dentro de un contenedor por lo que es hijo

      priceTotal.innerHTML = totalCard; // agrego que se vea el monto total en el carrito y con las funciones anterirores se suma el total
    

      amountProduct.innerHTML = countProduct;
  });
}
function clearHtml(){
  containerBuyCart.innerHTML = '';
}



