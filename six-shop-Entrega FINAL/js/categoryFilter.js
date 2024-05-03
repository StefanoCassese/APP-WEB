import { writeProductHTML } from "./main.js"
import { createBtnAddCar } from "./carrito.js"

const categoryContainer = document.querySelector('.category-filter-container')

let globalProductsList = []

export function createCategoryFilter(productList) {

    globalProductsList = productList;

    const divCategoriesContainer = document.createElement('div')
    divCategoriesContainer.classList.add('categories-container')
    const ulList = document.createElement('ul')

    const uniqueCategoriesList = new Set()

    globalProductsList.forEach( product => {
        uniqueCategoriesList.add(product.category)
    })

    const categoryList  = Array.from(uniqueCategoriesList)

    categoryList.forEach(category => {
        const categoryItem = document.createElement('li');
        categoryItem.id = category;
        categoryItem.classList.add('category-item');
        categoryItem.textContent = category;
        
        categoryItem.addEventListener('click', (event) => {
            hiddenElement(categoryContainer);
            createButtonCategorySelected(event.target.textContent)
            $buttonOpenFilterMenu.textContent = buttonTextOpen;
            filterForCategorySelected();
        });
    
     ulList.appendChild(categoryItem);
    });

    divCategoriesContainer.appendChild(ulList)

    categoryContainer.appendChild(divCategoriesContainer)

}

const $buttonOpenFilterMenu = document.querySelector('#open-filter-menu')

const buttonTextOpen = "Filtrar por ▶"
const buttonTextClose = "Filtrar por ▼"

$buttonOpenFilterMenu.addEventListener( 'click', ()=> {
    if(!categoryContainer.classList.contains('display-element'))
    {
        showElement(categoryContainer)
        $buttonOpenFilterMenu.textContent = buttonTextClose
    } else {
        hiddenElement(categoryContainer)
        $buttonOpenFilterMenu.textContent = buttonTextOpen
    }
  
})

document.addEventListener( 'click', event => {
    if (!categoryContainer.contains(event.target) && event.target !== $buttonOpenFilterMenu)
    {
        $buttonOpenFilterMenu.textContent = buttonTextOpen
        hiddenElement(categoryContainer)
    }
})

function showElement(element) {
    element.classList.remove('not-display-element')
    element.classList.add('display-element')
}

function hiddenElement(element) {
    element.classList.remove('display-element')
    element.classList.add('not-display-element')
}

function removeElement(elementId) {
    document.getElementById(elementId).remove()
}

let categorySelectedList = []

function createButtonCategorySelected(categoryName) {

    if (!categorySelectedList.includes(categoryName))
    {
        categorySelectedList.push(categoryName)

        const buttonsContainer = document.querySelector('.btns-Category')

        const buttonRemoveFilter = document.createElement('button')
        buttonRemoveFilter.id = categoryName
        buttonRemoveFilter.classList.add("btn-filter")
        buttonRemoveFilter.textContent = categoryName + " ✘"

        buttonsContainer.appendChild(buttonRemoveFilter)

        buttonRemoveFilter.addEventListener( 'click', ()=> {
            removeElement(categoryName)
            let newButtonsCategoryList = categorySelectedList.filter( button => button !== categoryName)
            categorySelectedList = newButtonsCategoryList
            filterForCategorySelected()
        })
    }

}

async function filterForCategorySelected() {
    const mainContent = document.querySelector("main");
    if (categorySelectedList.length > 0) {
        let productsListFiltered = globalProductsList.filter(product => {
            return categorySelectedList.includes(product.category)
        });
        mainContent.innerHTML = "";
        await writeProductHTML(productsListFiltered);
        createBtnAddCar()
    } else {
        mainContent.innerHTML = "";
        await writeProductHTML(globalProductsList);
        createBtnAddCar()
    }
}

