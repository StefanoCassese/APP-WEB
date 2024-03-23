export function storageProducts(){
    localStorage.setItem('product', JSON.stringify(getProducts()))
}