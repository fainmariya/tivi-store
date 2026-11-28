import './cart.css';
import { createHeader } from '../../components/Header';
import { cartService } from '../../services/cart';

const cartContainer = document.getElementById('cart-container');
const cartSummaryElement = document.querySelector<HTMLElement>('.cart-summary');
const cartTotalElement = document.getElementById('cart-total');

// Создаём блок промокода над итоговой суммой
const promoSection = document.createElement('div');
promoSection.className = 'cart-promo';
promoSection.innerHTML = `
  <div class="cart-promo__controls">
    <input type="text" class="cart-promo__input" placeholder="Promo code" aria-label="Promo code" />
    <button type="button" class="btn-apply-promo">Apply</button>
  </div>
  <p class="cart-promo__message" aria-live="polite"></p>
`;

if (cartSummaryElement) {
  cartSummaryElement.before(promoSection);
}

const promoInput = promoSection.querySelector<HTMLInputElement>('.cart-promo__input');
const promoButton = promoSection.querySelector<HTMLButtonElement>('.btn-apply-promo');
const promoMessage = promoSection.querySelector<HTMLElement>('.cart-promo__message');

// Обновляет итоговую сумму в DOM
export function updateCartTotal(): void {
  if (!cartTotalElement) return;
  const total = cartService.getDiscountedTotal();
  cartTotalElement.textContent = cartService.formatPrice(total);
}

// Обработка применения промокода через сервис
function handleApplyPromo(): void {
  if (!promoInput || !promoMessage) return;

  const result = cartService.applyPromoCode(promoInput.value);
  promoMessage.textContent = result.message;
  promoMessage.className = result.success
    ? 'cart-promo__message cart-promo__message--success'
    : 'cart-promo__message cart-promo__message--error';

  // Пересчитываем сумму всегда: при успехе применяется 10%, при ошибке скидка сбрасывается
  updateCartTotal();
}

// Автоматически переводим ввод в верхний регистр при наборе текста
promoInput?.addEventListener('input', () => {
  const start = promoInput.selectionStart;
  const end = promoInput.selectionEnd;
  promoInput.value = promoInput.value.toUpperCase();
  promoInput.setSelectionRange(start, end);
});

promoButton?.addEventListener('click', handleApplyPromo);
promoInput?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
    handleApplyPromo();
  }
});

// Отрисовывает содержимое корзины и управляет видимостью блока промокода и итоговой суммы
export function renderCart(): void {
  if (!cartContainer) return;

  const items = cartService.getItems();
  cartContainer.innerHTML = '';

  if (cartSummaryElement) {
    cartSummaryElement.hidden = false;
  }

  if (cartService.isEmpty()) {
    if (promoInput) promoInput.value = '';
    if (promoMessage) promoMessage.textContent = '';

    cartContainer.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    promoSection.hidden = true;
    updateCartTotal();
    return;
  }

  promoSection.hidden = false;

  // Восстанавливаем статус промокода при перезагрузке страницы
  if (cartService.isPromoApplied() && promoMessage && !promoMessage.textContent) {
    if (promoInput) promoInput.value = 'SALE10';
    promoMessage.textContent = 'Promo code SALE10 applied: 10% discount!';
    promoMessage.className = 'cart-promo__message cart-promo__message--success';
  }

  items.forEach((item) => {
    const itemTotal = cartService.getItemTotal(item.product.id);
    const formattedItemTotal = cartService.formatPrice(itemTotal);
    const formattedUnitPrice = cartService.formatPrice(item.product.price);
    const volumeHtml = item.product.volume
      ? `<p class="cart-item__volume">${item.product.volume}</p>`
      : '';

    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
      <img class="cart-item__image" src="${item.product.image}" alt="${item.product.name}" />
      <div class="cart-item__info">
        <h2 class="cart-item__title">${item.product.name}</h2>
        ${volumeHtml}
        <p class="cart-item__price">${formattedUnitPrice}</p>
      </div>
      <div class="cart-item__controls">
        <button
          type="button"
          class="btn-decrease"
          data-id="${item.product.id}"
          aria-label="Decrease quantity"
          ${item.quantity <= 1 ? 'disabled' : ''}
        >-</button>
        <span class="cart-item__quantity">${item.quantity}</span>
        <button type="button" class="btn-increase" data-id="${item.product.id}" aria-label="Increase quantity">+</button>
      </div>
      <div class="cart-item__line-total">${formattedItemTotal}</div>
      <button type="button" class="btn-remove" data-id="${item.product.id}">Remove</button>
    `;


    cartContainer.appendChild(itemElement);
  });

  updateCartTotal();
}

// Обработка кликов +, -, Remove с мгновенным пересчётом
cartContainer?.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const productId = Number(target.dataset.id);

  if (!productId) return;

  if (target.classList.contains('btn-increase')) {
    cartService.increaseQuantity(productId);
    renderCart();
  } else if (target.classList.contains('btn-decrease')) {
    cartService.decreaseQuantity(productId);
    renderCart();
  } else if (target.classList.contains('btn-remove')) {
    cartService.removeItem(productId);
    renderCart();
  }
});

// Инициализация страницы: добавляем шапку и рендерим корзину
document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector<HTMLDivElement>('#app');
  if (app) {
    app.prepend(createHeader());
  }
  renderCart();
});
