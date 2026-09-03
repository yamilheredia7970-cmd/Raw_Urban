import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="bg-surface min-h-screen py-12 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="font-display text-5xl md:text-7xl text-black uppercase tracking-tighter leading-none mb-12">Your Cart</h1>
        
        @if (cartItems().length > 0) {
          <div class="flex flex-col lg:flex-row gap-12">
            
            <!-- CART ITEMS -->
            <div class="flex-grow">
              <div class="bg-white border-t-4 border-black">
                <!-- Header -->
                <div class="hidden sm:grid grid-cols-12 gap-4 p-6 border-b border-gray-200 font-display uppercase tracking-wide text-gray-500">
                  <div class="col-span-6">Product</div>
                  <div class="col-span-3 text-center">Quantity</div>
                  <div class="col-span-3 text-right">Total</div>
                </div>

                <!-- Items -->
                <div class="divide-y divide-gray-200">
                  @for (item of cartItems(); track item.product.id + item.selectedSize + item.selectedColor) {
                    <div class="p-6 flex flex-col sm:grid sm:grid-cols-12 sm:gap-4 items-center">
                      
                      <!-- Product Info -->
                      <div class="col-span-6 flex items-center w-full mb-4 sm:mb-0">
                        <a [routerLink]="['/product', item.product.id]" class="w-24 h-32 flex-shrink-0 bg-gray-100 mr-6">
                          <img [src]="item.product.image" [alt]="item.product.name" class="w-full h-full object-cover" referrerpolicy="no-referrer">
                        </a>
                        <div class="flex flex-col">
                          <a [routerLink]="['/product', item.product.id]" class="font-display text-xl uppercase tracking-wide hover:text-accent transition-colors line-clamp-1">{{ item.product.name }}</a>
                          <span class="font-sans text-sm text-gray-500 mt-1">\${{ item.product.price.toFixed(2) }}</span>
                          <div class="mt-2 font-sans text-sm flex gap-4">
                            <span>Color: <strong>{{ item.selectedColor }}</strong></span>
                            <span>Size: <strong>{{ item.selectedSize }}</strong></span>
                          </div>
                          <button (click)="removeItem(item)" class="text-sm font-sans text-gray-400 hover:text-accent underline self-start mt-3 transition-colors">Remove</button>
                        </div>
                      </div>

                      <!-- Quantity -->
                      <div class="col-span-3 flex justify-center w-full sm:w-auto mb-4 sm:mb-0">
                        <div class="flex items-center border border-gray-300 w-32 h-12">
                          <button (click)="updateQuantity(item, item.quantity - 1)" class="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors">
                            <mat-icon>remove</mat-icon>
                          </button>
                          <span class="flex-grow text-center font-sans font-bold">{{ item.quantity }}</span>
                          <button (click)="updateQuantity(item, item.quantity + 1)" class="w-10 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors">
                            <mat-icon>add</mat-icon>
                          </button>
                        </div>
                      </div>

                      <!-- Total -->
                      <div class="col-span-3 text-right w-full sm:w-auto flex justify-between sm:block">
                        <span class="sm:hidden font-display uppercase text-gray-500">Total:</span>
                        <span class="font-sans font-bold text-xl">\${{ (item.product.price * item.quantity).toFixed(2) }}</span>
                      </div>
                      
                    </div>
                  }
                </div>
              </div>
            </div>

            <!-- ORDER SUMMARY -->
            <div class="w-full lg:w-96 flex-shrink-0">
              <div class="bg-white p-8 border-t-4 border-accent sticky top-28">
                <h2 class="font-display text-3xl uppercase tracking-wide mb-6">Summary</h2>
                
                <div class="space-y-4 mb-8 font-sans">
                  <div class="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>\${{ cartTotal().toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div class="flex justify-between text-gray-600">
                    <span>Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div class="border-t border-gray-200 pt-4 flex justify-between font-bold text-xl">
                    <span>Total</span>
                    <span>\${{ cartTotal().toFixed(2) }}</span>
                  </div>
                </div>

                <a routerLink="/checkout" class="block w-full bg-accent text-white text-center py-4 font-display text-xl uppercase tracking-widest hover:bg-red-700 transition-colors">
                  Checkout
                </a>
                
                <div class="mt-6">
                  <p class="font-sans text-sm text-gray-500 text-center flex items-center justify-center">
                    <mat-icon class="mr-2 text-sm">lock</mat-icon> Secure Checkout
                  </p>
                </div>
              </div>
            </div>

          </div>
        } @else {
          <!-- EMPTY CART -->
          <div class="bg-white p-16 text-center border-t-4 border-black">
            <mat-icon class="text-6xl text-gray-300 mb-6">shopping_bag</mat-icon>
            <h2 class="font-display text-4xl uppercase tracking-wide mb-4">Your cart is empty</h2>
            <p class="font-sans text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <a routerLink="/shop" class="inline-block bg-black text-white px-10 py-4 font-display text-lg uppercase tracking-widest hover:bg-accent transition-colors">
              Start Shopping
            </a>
          </div>
        }
      </div>
    </div>
  `
})
export class CartComponent {
  cartService = inject(CartService);
  
  cartItems = this.cartService.cartItems;
  cartTotal = this.cartService.cartTotal;

  updateQuantity(item: CartItem, quantity: number) {
    this.cartService.updateQuantity(item, quantity);
  }

  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item);
  }
}
