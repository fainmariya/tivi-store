import '../style.css';

import { products } from '../data/products';
import { renderCatalog } from '../components/renderCatalog';
import { createHeader } from '../components/Header';

const app = document.querySelector<HTMLDivElement>('#app');
if (app) {
    app.prepend(createHeader())
}
const catalogGrid = document.querySelector<HTMLElement>(".catalog-grid");
if (catalogGrid) {
    renderCatalog(products, catalogGrid);
  }
