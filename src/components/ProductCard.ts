import type { Product } from "../types/product";


export function createProductCard(product: Product): HTMLElement {
   
    const card = document.createElement("article");
    card.classList.add('product-card');

    const productImage = document.createElement("img");
      productImage.classList.add("product-card__image");
      productImage.src = product.image;
      productImage.alt = product.name;
      card.append(productImage);
    
    const productContent = document.createElement("div");
      productContent.classList.add("product-card__content");
      card.append(productContent);

    const productTitle = document.createElement("h2");
      productTitle.classList.add("product-card__title");
      productTitle.textContent = product.name;
      productContent.append(productTitle);

    const productDescription = document.createElement("p");
      productDescription.classList.add("product-card__description");
      productDescription.textContent = product.description;
      productContent.append(productDescription);
    if (product.volume) {
        const productVolume = document.createElement("p");
        productVolume.classList.add("product-card__volume");
        productVolume.textContent = product.volume;
        productContent.append(productVolume);
      }
    const productPrice = document.createElement("p");
      productPrice.classList.add("product-card__price");
      productPrice.textContent = `$${product.price}`;
      productContent.append(productPrice);
  
    const productButton = document.createElement("button");
      productButton.classList.add("product-card__button");
      productButton.type = "button";
      productButton.textContent = "Add to Cart";
      card.append(productButton);
  
      return card;

}