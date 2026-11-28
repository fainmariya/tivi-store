import type { Product } from '../types/product';
import type { CartItem } from '../types/cart';

export class CartService {
  private readonly STORAGE_KEY = 'shopping_cart';
  private readonly PROMO_STORAGE_KEY = 'shopping_cart_promo';
  private readonly VALID_PROMO = 'SALE10';
  private readonly DISCOUNT_RATE = 0.1;

  private items: CartItem[] = [];
  private appliedPromo: string | null = null;
  private listeners: Array<() => void> = [];

  constructor() {
    this.loadFromStorage();
  }

  // Подписка на любые изменения корзины (для обновления счётчика в хедере)
  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify(): void {
    this.listeners.forEach((listener) => listener());
  }

  // Получить все товары в корзине
  public getItems(): CartItem[] {
    return [...this.items];
  }

  // Получить общее количество единиц всех товаров в корзине
  public getTotalCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Получить количество конкретного товара в корзине (0, если товара нет)
  public getItemQuantity(productId: number): number {
    const item = this.items.find((item) => item.product.id === productId);
    return item ? item.quantity : 0;
  }

  // Добавить товар или увеличить количество, если он уже есть
  public addItem(product: Product): void {
    const existingItem = this.items.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        product,
        quantity: 1,
      });
    }

    this.saveToStorage();
  }

  // Увеличить количество на 1 (для кнопки "+")
  public increaseQuantity(productId: number): void {
    const item = this.items.find((item) => item.product.id === productId);
    if (item) {
      item.quantity += 1;
      this.saveToStorage();
    }
  }

  // Уменьшить количество на 1, но НЕ ниже 1 (для кнопки "-")
  public decreaseQuantity(productId: number): void {
    const item = this.items.find((item) => item.product.id === productId);
    if (item && item.quantity > 1) {
      item.quantity -= 1;
      this.saveToStorage();
    }
  }

  // Удалить товар из корзины
  public removeItem(productId: number): void {
    this.items = this.items.filter((item) => item.product.id !== productId);
    if (this.isEmpty()) {
      this.appliedPromo = null;
    }
    this.saveToStorage();
  }

  // Проверка, пуста ли корзина
  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  // Применить промокод (повторный ввод не накапливает скидку)
  public applyPromoCode(code: string): { success: boolean; alreadyApplied: boolean; message: string } {
    const trimmed = code.trim();

    if (trimmed !== this.VALID_PROMO) {
      this.appliedPromo = null;
      this.saveToStorage();
      return {
        success: false,
        alreadyApplied: false,
        message: 'Invalid promo code.',
      };
    }

    if (this.appliedPromo === this.VALID_PROMO) {
      return {
        success: true,
        alreadyApplied: true,
        message: 'Promo code SALE10 is already applied (10% off).',
      };
    }

    this.appliedPromo = this.VALID_PROMO;
    this.saveToStorage();

    return {
      success: true,
      alreadyApplied: false,
      message: 'Promo code SALE10 applied: 10% discount!',
    };
  }

  // Проверить, активен ли промокод
  public isPromoApplied(): boolean {
    return this.appliedPromo === this.VALID_PROMO;
  }

  // 1. Посчитать итоговую стоимость конкретной позиции (price * quantity)
  public getItemTotal(productId: number): number {
    const item = this.items.find((item) => item.product.id === productId);
    if (!item) {
      return 0;
    }
    return Number((item.product.price * item.quantity).toFixed(2));
  }

  // 2. Посчитать общую стоимость всей корзины без скидки (0 для пустой корзины)
  public getTotalPrice(): number {
    const total = this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    return Number(total.toFixed(2));
  }

  // Посчитать итоговую стоимость с учётом применённого промокода
  public getDiscountedTotal(): number {
    const rawTotal = this.getTotalPrice();
    if (!this.isPromoApplied()) {
      return rawTotal;
    }
    return Number((rawTotal * (1 - this.DISCOUNT_RATE)).toFixed(2));
  }

  // 3. Форматирование цены в USD ($) для вывода в интерфейс
  public formatPrice(amount: number): string {
    return `$${amount}`;
  }

  // --- Работа с localStorage ---

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
    if (this.appliedPromo) {
      localStorage.setItem(this.PROMO_STORAGE_KEY, this.appliedPromo);
    } else {
      localStorage.removeItem(this.PROMO_STORAGE_KEY);
    }
    this.notify();
  }

  private loadFromStorage(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      try {
        this.items = JSON.parse(data) as CartItem[];
      } catch {
        this.items = [];
      }
    }

    const savedPromo = localStorage.getItem(this.PROMO_STORAGE_KEY);
    if (savedPromo === this.VALID_PROMO && !this.isEmpty()) {
      this.appliedPromo = savedPromo;
    }
  }
}

// Единый экземпляр для всего приложения
export const cartService = new CartService();
