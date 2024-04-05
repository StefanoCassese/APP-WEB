import { getApiProducts } from "./JS/api.js";

getApiProducts()


window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});


function irPagina(paginaURL) {

    window.location.href = paginaURL;
}

document.getElementById("btn-Logo").addEventListener("click", function() {
    irPagina('http://127.0.0.1:5500/index.html'); // Cambia 'index.html' por la URL de tu página principal
});

