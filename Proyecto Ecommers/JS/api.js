
export function getApiProducts() {
    
    function traducirNombresCategoria(nombreCategoria) {
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
    
    function getImagenesCategorias(nombreCategoria) {
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
            default:
                console.warn("The format of the string that was given isn't a recognized category");
                break;
        }
    
        return imgURL;
    }
    
    
        const productsCategory = document.getElementById('category-container');
    
        function getProductsCategory() {
    
            let imgCategory;
            let nombreCategoria;
    
            fetch('https://fakestoreapi.com/products/categories')
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then(products => {
                    products.forEach(category => {
                        console.table("Categorías obtenidas:", category); // Verificar las categorías recibidas
                        imgCategory = getImagenesCategorias(category)   
                        nombreCategoria = traducirNombresCategoria(category)                            
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
                })
                .catch(error => console.error('Error fetching data:', error));
    
        }
    
    
    
        const productsContainer = document.getElementById('products-container');
    
        function getProducts(filtro) {
            console.log("Filtro recibido:", filtro);
            let nombreCategoria;
            productsContainer.innerHTML = "";
    
            fetch('https://fakestoreapi.com/products')
                .then(res => {
                    if (!res.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return res.json();
                })
                .then(products => {
                    console.table("Productos obtenidos:", products); // Verificar los productos obtenidos
                    products.forEach(product => {  
                        nombreCategoria = traducirNombresCategoria(product.category)
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
                                        <button class="btn-comprar"><p class="Text-Button">Comprar</p></button>
                                        <button class="btn-Carrito-producto"><img src="ICONS/shopping_cart.png" alt="icono carrito"></button>
                                    </div>
                                </div>
                            </div>
                        </article>
                     `;
    
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
                })
                .catch(error => console.error('Error fetching data:', error));
        }
    
        getProducts("Todos");
        getProductsCategory();
        
        function cambiarCategoriaEtiqueta(categoria) {   
            document.getElementById("Etiqueta").textContent = categoria;
        }
    
        cambiarCategoriaEtiqueta("Todos los productos");
}
    


