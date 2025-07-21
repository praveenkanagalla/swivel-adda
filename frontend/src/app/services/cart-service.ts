import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartSubject.asObservable();

  constructor() { }

  getCart() {
    return this.cartItems$;
  }

  addToCart(product: any) {
    const items = [...this.cartSubject.value];  // correct way to access current items
    const index = items.findIndex(p => p.id === product.id);

    if (index !== -1) {
      items[index].quantity += 1;
    } else {
      items.push({ ...product, quantity: 1 });
    }

    this.cartSubject.next(items);
  }

  removeFromCart(index: number) {
    const items = [...this.cartSubject.value];
    items.splice(index, 1);
    this.cartSubject.next(items);
  }

  updateQuantity(index: number, change: number) {
    const items = [...this.cartSubject.value];
    items[index].quantity += change;

    if (items[index].quantity <= 0) {
      items.splice(index, 1);
    }

    this.cartSubject.next(items);
  }

  getTotal() {
    return this.cartSubject.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  clearCart() {
    this.cartSubject.next([]);
  }

  getCartCount(): number {
    return this.cartSubject.value.reduce((count, item) => count + item.quantity, 0);
  }
}
