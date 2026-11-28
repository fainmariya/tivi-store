import { createProductCard } from "./ProductCard";
import type { Product } from "../types/product";

export function renderCatalog(products: Product[], container: HTMLElement){
    container.replaceChildren();
    if (products.length === 0) {
        container.innerHTML = "<p class='catalog-empty'>Products not found</p>";
        return;
    
      }
    products.forEach(product => {
        const card = createProductCard(product);
    
        container.append(card)
    })
}