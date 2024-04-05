import { getApiProductList, getApiCategoryProductsList } from "./JS/api.js"
import { mostrarBarraBusqueda } from "./JS/buscador.js";

/* Apartado de funciones de obtencion y escritura de productos y categorias */

const productosList = await getApiProductList(); // Array de las productos
const prodcutosCategoriasList = await getApiCategoryProductsList() // Array de las categorias que tienen los productos 

async function MostrarProductosYCategorias() {
    try {
        escribirCodigoHTMLProductos(productosList, 'Todos');
        escribirCodigoHTMLCategorias(prodcutosCategoriasList);
    } catch (error) {
        console.error('Error al obtener y mostrar productos:', error);
    }
}

MostrarProductosYCategorias()

function escribirCodigoHTMLCategorias(Categorias) {

    const productsCategory = document.getElementById('category-container'); 

    let imgCategory;
    let nombreCategoria;

    Categorias.forEach(category => {

        imgCategory = getImagene(category)   // Trae las imagenes para cada categoria de productos alamacenadas en el proyecto

        nombreCategoria = traducirNombresCategoria(category)  // Traduce las categorias del ingles al español para evitar errores de apertura de string y una mejor accesivilidad

        productsCategory.innerHTML += `
        <article>
            <div class="contenedor-Categoria">                         
                <img src="${imgCategory}" alt="${nombreCategoria} category">
                <button id="btn-Categoria" class="resaltador-Imagen-Texto">
                    <p>${nombreCategoria}</p>
                </button>                   
            </div>
        </article>
        `;
    });
}


function escribirCodigoHTMLProductos(products, filtro) {

    const productsContainer = document.getElementById('products-container');

    productsContainer.innerHTML = "";

        products.forEach(product => {  

            let nombreCategoria = traducirNombresCategoria(product.category) // Traduccion de la categoria

            let htmlProductos = ` 
            <article>
                <div class="contenedor-Producto">
                    <img src="${product.image}" alt="${product.title}">
                    <div class="contenedor-Texto-Producto">
                        <p class="poducto-Nombre">${product.title}</p>                            
                        <p class="producto-Categoria">${nombreCategoria}</p>
                        <p class="producto-Precio">$ ${product.price}</p>
                        <p class="producto-Estado">Nuevo</p>
    
                        <div class="contenedor-botones-compra">                                
                            <button id="btn-comprar" class="btn-comprar"><p class="Text-Button">Comprar</p></button>
                            <button id="btn-Carrito-producto" class="btn-Carrito-producto"><img src="ICONS/shopping_cart.png" alt="icono carrito"></button>
                        </div>
                    </div>
                </div>
            </article>
         `;

         // Filtra por categoria, si filtro no es igual a la palabra clave "Todos" entonces filtra cada producto segun la categoria recibida en el filtro
        if(filtro !== "Todos")   
        {
            if(nombreCategoria == filtro)
            {
                productsContainer.innerHTML += htmlProductos;
            }
        } 
        else {
            productsContainer.innerHTML += htmlProductos;
        }  
        
    });
}

// Traduce el nombre de la categoria recibida 
 export function traducirNombresCategoria(nombreCategoria) {
    let nombreCategoriaTraducido;

    switch(nombreCategoria) {
        case "jewelery":
            nombreCategoriaTraducido = "Accesorios";
            break;
        case "men's clothing":
            nombreCategoriaTraducido = "Hombre";
            break;
        case "women's clothing":
            nombreCategoriaTraducido = "Mujer";
            break;
        case "electronics":
            nombreCategoriaTraducido = "Tecnología";
            break;
        default:
            console.warn("The format of the string that was given isn't a recognized category");
            break;
    }

    return nombreCategoriaTraducido;
}

// Trae las imagenes para cada categoria de productos alamacenadas en el proyecto
export function getImagene(nombreCategoria) {
    let imgURL;

    switch(nombreCategoria) {
        case "jewelery":
            imgURL = "IMG/IMG-CATEGORIAS/Accesorios categoria.jpg";
            break;
        case "men's clothing":
            imgURL = "IMG/IMG-CATEGORIAS/Hombres categoria.jpg";
            break;
        case "women's clothing":
            imgURL = "IMG/IMG-CATEGORIAS/Mujeres categoria.jpg";
            break;
        case "electronics":
            imgURL = "IMG/IMG-CATEGORIAS/Tecnologia categoria.jpg";
            break;
        case "ProductoNoEncontrado":
            imgURL = "IMG/Imagen producto no encontrado.png"
            break;
        default:
            console.warn("The format of the string that was given isn't a recognized category");
            break;
    }

    return imgURL;
}

/* Apartado de navegacion de botones */

/*
 Busca por cada elemento del tipo boton existente en el documento el cual su id comience con "btn-"
 y luego ejecuta una funcion segun cada caso.
*/

const botones = document.querySelectorAll('button[id^="btn-"]');

botones.forEach(boton => {
    boton.addEventListener('click', () => {
        switch (boton.id) {
            case 'btn-Logo':
                navegarInicio();
                break;
            case 'btn-Carrito-producto':
                agregarCarrito();
                break;
            case 'btn-Buscador':
                buscador();
                break;
            case 'btn-comprar':
                comprarProducto();
                break;
            case 'btn-Carrito':
                abrirCarrito();
                break;
            case 'btn-Categoria':
                seleccionarCategoria(boton.textContent.trim()); // Se utiliza el texto del boton como nombre de la categoria
                break;
            case 'btn-menu':
                abrirMenuNavegacion();
                break;
            default:
                console.log("Boton obtenido:", boton.id);
                break;
        }
    });
});

function navegarInicio() {
    window.location.href = 'index.html';
}

function agregarCarrito() {
    // dejado para el que esta haciendo el carrito
}

function buscador() {
    mostrarBarraBusqueda() // Abre el buscador 
}

function comprarProducto() {
    // en proceso
}

function abrirCarrito() {
    // dejado para el que esta haciendo el carrito
}

function seleccionarCategoria(filtro) {
    escribirCodigoHTMLProductos(productosList, filtro); // Se llama a la funcion para reescribir los productos y se le pasa el filtro nuevo
    cambiarCategoriaEtiqueta(filtro) 
}

function abrirMenuNavegacion() {
     // en proceso
}

// Cambia el texto de la etiqueta segun la categoria seleccionada
function cambiarCategoriaEtiqueta(categoria) {   
    document.getElementById("Etiqueta").textContent = categoria;
}

// Inicializa el texto de la etiqueta en "Todos los productos"             
cambiarCategoriaEtiqueta("Todos los productos");  


