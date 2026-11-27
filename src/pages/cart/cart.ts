import './cart.css';
import { cartService } from '../../services/cart';

const cartContainer = document.getElementById('cart-container') as HTMLDivElement;

function renderCart(): void {
 
  if (cartService.isEmpty()) {
    cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    return;
  };

  cartContainer.innerHTML = cartService
    .getItems()
    .map((item) => {
      const lineTotal = item.product.price * item.quantity;
      const isMinQuantity = item.quantity <= 1;

      return `
        <div class="cart-item">
            <img class="cart-item__image" src="${item.product.image}" alt="${item.product.name}" />
            
            <div class="cart-item__info">
            <h3 class="cart-item__title">${item.product.name}</h3>
            ${item.product.volume ? `<p class="cart-item__volume">${item.product.volume}</p>` : ''}
            <p class="cart-item__price">Price: $${item.product.price}</p>
            </div>

            <div class="cart-item__controls">
            <button data-action="decrease" data-id="${item.product.id}" ${isMinQuantity ? 'disabled' : ''}>-</button>
            <span>${item.quantity}</span>
            <button data-action="increase" data-id="${item.product.id}">+</button>
            </div>

            <div class="cart-item__line-total">$${lineTotal}</div>

            <button data-action="remove" data-id="${item.product.id}">Remove</button>
        </div>
        `;
    })
    .join('');
};

cartContainer.addEventListener('click', (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  const action = target.dataset.action;
  const productId = Number(target.dataset.id);

  if (!action || !productId) return;

  if (action === 'increase') {
    cartService.increaseQuantity(productId);
  } else if (action === 'decrease') {
    cartService.decreaseQuantity(productId);
  } else if (action === 'remove') {
    cartService.removeItem(productId);
  }

  renderCart();
});

renderCart();
