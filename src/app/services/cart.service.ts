import { Injectable, signal, computed } from '@angular/core';
import { Product } from './product.service';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSignal = signal<CartItem[]>([]);

  cartItems = this.cartItemsSignal.asReadonly();

  cartTotal = computed(() => {
    return this.cartItemsSignal().reduce((total, item) => total + (item.product.price * item.quantity), 0);
  });

  cartCount = computed(() => {
    return this.cartItemsSignal().reduce((count, item) => count + item.quantity, 0);
  });

  addToCart(product: Product, quantity: number, selectedSize: string, selectedColor: string) {
    this.cartItemsSignal.update(items => {
      const existingItem = items.find(
        i => i.product.id === product.id && i.selectedSize === selectedSize && i.selectedColor === selectedColor
      );
      
      if (existingItem) {
        return items.map(i => 
          i === existingItem ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      
      return [...items, { product, quantity, selectedSize, selectedColor }];
    });
  }

  updateQuantity(item: CartItem, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(item);
      return;
    }
    
    this.cartItemsSignal.update(items => 
      items.map(i => i === item ? { ...i, quantity } : i)
    );
  }

  removeFromCart(item: CartItem) {
    this.cartItemsSignal.update(items => items.filter(i => i !== item));
  }
  
  clearCart() {
    this.cartItemsSignal.set([]);
  }
}
