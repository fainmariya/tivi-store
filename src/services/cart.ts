import { Product } from '../types/product';
import { CartItem } from '../types/cart';

export class CartService {
  private readonly STORAGE_KEY = 'shopping_cart';
  private items: CartItem[] = [];

  constructor() {
    this.loadFromStorage();
  }

  // Получить все товары в корзине
  public getItems(): CartItem[] {
    return [...this.items];
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
    this.saveToStorage();
  }

  // Проверка, пуста ли корзина
  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  // --- Работа с localStorage ---

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.items));
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
  }
}

// Единый экземпляр для всего приложения
export const cartService = new CartService();
