import { createProductCard } from "./ProductCard";
import type { Product } from "../types/product";

export function renderCatalog(products: Product[], container: HTMLElement){
    container.replaceChildren();
    products.forEach(product => {
        const card = createProductCard(product);

        container.append(card)
    })
}