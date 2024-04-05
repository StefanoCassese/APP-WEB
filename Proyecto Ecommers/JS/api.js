
// Almacena un array de productos en forma de cache para evitar tantos llamados a la api
let cachedProductList = []; 

export function getApiProductList() {
    // Si la lista de productos está en la caché, devuelve la lista de productos de la caché
    if (cachedProductList.length > 0) {
        return Promise.resolve(cachedProductList);
    }
    
    // Si la lista de productos no está en la caché, se hace una nueva solicitud a la API
    return getApiProducts().then(productList => {
        // Almacena la lista de productos en caché
        cachedProductList = productList;
        return productList;
    });
}

// Almacena en un array las categorias de los productos en forma de cache para evitar tantos llamados a la api
let cachedCategoryProductList = [];

export function getApiCategoryProductsList() {
    // Si la lista de categorias está en la caché, devuelve la lista de categorias de la caché
    if (cachedCategoryProductList.length > 0) {
        return Promise.resolve(cachedCategoryProductList);
    }
    
    // Si la lista de categorias no está en la caché, se hace una nueva solicitud a la API
    return getApiCategoryProducts().then(categoryList => {
        // Almacena la lista de productos en caché
        cachedCategoryProductList = categoryList;
        return categoryList;
    });
}

// retorna un array de productos de la api
function getApiProducts() { 
    return fetch('https://fakestoreapi.com/products')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(products => {   
            return products;        
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error; 
        });        
}

// retorna un array de categorias de la api
function getApiCategoryProducts() {
    return fetch('https://fakestoreapi.com/products/categories')
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(category => {  
            return category;        
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            throw error; 
        });  
}

