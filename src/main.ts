import './style.css';

import { products } from './data/products';
import { renderCatalog } from './components/renderCatalog';



const catalogGrid = document.querySelector<HTMLElement>('.catalog-grid');

if (catalogGrid) {
  renderCatalog(products, catalogGrid);
}