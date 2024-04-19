import { generateProductsOverlay, truncarTexto } from "./main.js";

export function searchLogic(productsList) {
    
    const inputs = document.querySelectorAll('#search-input');

    inputs.forEach(input => {
        input.addEventListener('input', event => {
            const searchedText = event.target.value;
            filterProducts(searchedText);
        });

        input.addEventListener('blur', hiddenSearchOverlay); 
    });

    function filterProducts(searchedText) {
        if(searchedText.length === 0)
        {
            hiddenSearchOverlay()
        }
        const productsFiltered = productsList.filter(product => product.title.toUpperCase().includes(searchedText.toUpperCase()));
        htmlResults(productsFiltered);
    }

    function htmlResults(resultProducts) {

        showSearchOverlay()

        const productsContainers = document.querySelectorAll('#search-under-title, #searchMediumWidth, #searchMaxWidth');

        productsContainers.forEach(container => {

            let searchedSuggestion = container.querySelector('#searched-suggestion'); 

            if (searchedSuggestion === null) {
                const navElement = document.createElement('nav');
                navElement.id = 'searched-suggestion';
                navElement.classList.add('searched-suggestion', 'center-elements');
                container.append(navElement);
                searchedSuggestion = navElement;
            } else {
                searchedSuggestion.innerHTML = "";
            }

            const divElemet = document.createElement('div');
            divElemet.classList.add('div-product-suggestion');
            searchedSuggestion.append(divElemet);
            const ul = document.createElement('ul');
            divElemet.append(ul);
            const maxLenghtNameProduct = 32;

            if (resultProducts.length === 0) {
                ul.innerHTML = `
                    <li>  
                        <article class="suggested-products center-elements">
                            <p>Producto no encontrado :(</p>
                        </article>
                    </li>
                `;
            } else {
                resultProducts.forEach(product => {
                    let truncatedNameProduct = truncarTexto(product.title, maxLenghtNameProduct)
                    const li = document.createElement('li');
                    li.innerHTML = `
                        <button id="btn-surggested-product"  data-productId="${product.id}" class="btn-surggested-product" title="${product.title}" aria-label="Boton de producto ${product.title}">
                            <article class="suggested-products center-elements">
                                <img class="searched-suggestion-img" src="${product.image}" alt="${product.title}">
                                <div class="searched-suggestion-text">
                                    <p>${truncatedNameProduct}</p>
                                    <p>$${product.price}</p>
                                </div>
                            </article>
                        </button>
                    `;
                    ul.appendChild(li);
                });

            }

        });

        const $buttonSuggestionProduct = document.querySelectorAll('#btn-surggested-product')

                $buttonSuggestionProduct.forEach($buttonSuggestionProduct => {
                    $buttonSuggestionProduct.addEventListener('click', () => {
                        let productId = parseInt($buttonSuggestionProduct.getAttribute('data-productId'));
                        generateProductsOverlay(productId, productsList)
                    });
                });


    }

    function showSearchOverlay() {
        const searchedSuggestion = document.querySelectorAll('#searched-suggestion');
        searchedSuggestion.forEach(overlay => {
            overlay.innerHTML = "";
            overlay.style.display = 'flex'; 
        });
    }

    function hiddenSearchOverlay() {
        setTimeout(() => {
            const searchedSuggestion = document.querySelectorAll('#searched-suggestion');
            searchedSuggestion.forEach(overlay => {
            overlay.innerHTML = "";
            overlay.style.display = 'none'; 
        });
        }, 100);    
    }

}