import '../style.css';

import { products } from '../data/products';
import { renderCatalog } from '../components/renderCatalog';
import { createHeader } from '../components/Header';
import { filterProducts } from '../utils/filterProducts';


const app = document.querySelector<HTMLDivElement>('#app');
if (app) {
    app.prepend(createHeader())
}
const catalogGrid = document.querySelector<HTMLElement>(".catalog-grid");
if (catalogGrid) {
    renderCatalog(products, catalogGrid);
  }
let selectedCategory = 'All Categories';
const searchInput = document.querySelector<HTMLInputElement>(".catalog-search");
if (searchInput) {
    
    searchInput.addEventListener('input', () => {
        const searchQuery = searchInput.value;
        const filteredProducts = filterProducts(products, searchQuery, selectedCategory)
        if (catalogGrid) {
        renderCatalog(filteredProducts, catalogGrid);
      }
      });
      
}
const categories = products.map((product) => product.category);
const categoriesUniq = [
    'All Categories',
    ...new Set(categories),
  ];
const filtersContainer = document.querySelector<HTMLDivElement>(".catalog-filters");
if (filtersContainer) {
    categoriesUniq.forEach((category) => {
      const button = document.createElement("button");
      button.classList.add("catalog-filter");
      button.textContent = category;
      if (category === selectedCategory) {
        button.classList.add('active');
      }
      button.addEventListener('click', () => {
        selectedCategory = category;
        filtersContainer
  .querySelectorAll('.catalog-filter')
  .forEach((filterButton) => {
    filterButton.classList.remove('active');
  });

button.classList.add('active');
        if (searchInput && catalogGrid) {
            const searchVal = searchInput.value;
            const filteredProducts = filterProducts(
                products,
                searchVal, 
                selectedCategory
            );
         renderCatalog(filteredProducts, catalogGrid);
        };
    });
    filtersContainer.appendChild(button);
});
}
