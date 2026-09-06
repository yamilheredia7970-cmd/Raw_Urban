import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-cart',
  imports: [RouterLink, MatIconModule],
  template: `
    <div class="bg-black min-h-screen text-white">
      <div class="max-w-[1440px] mx-auto border-x border-white/10 px-4 sm:px-8 lg:px-12 py-12 lg:py-16">

        <nav class="flex text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
          <a routerLink="/" class="hover:text-accent transition-colors">Home</a>
          <span class="mx-2">/</span>
          <span class="text-white">Cart</span>
        </nav>
        <h1 class="font-[900] text-5xl md:text-7xl uppercase tracking-tighter italic leading-none mb-12">Your Cart</h1>

        @if (cartItems().length > 0) {
          <div class="flex flex-col lg:flex-row gap-12">

            <!-- CART ITEMS -->
            <div class="flex-grow">
              <div class="border-t border-white/10">
                <!-- Header -->
                <div class="hidden sm:grid grid-cols-12 gap-4 py-4 border-b border-white/10 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500">
                  <div class="col-span-6">Product</div>
                  <div class="col-span-3 text-center">Quantity</div>
                  <div class="col-span-3 text-right">Total</div>
                </div>

                <!-- Items -->
                <div class="divide-y divide-white/10">
                  @for (item of cartItems(); track item.product.id + item.selectedSize + item.selectedColor; let i = $index) {
                    <div class="py-6 flex flex-col sm:grid sm:grid-cols-12 sm:gap-4 items-center animate-fade-up" [style.animation-delay.ms]="i * 80">

                      <!-- Product Info -->
                      <div class="col-span-6 flex items-center w-full mb-4 sm:mb-0">
                        <a [routerLink]="['/product', item.product.id]" class="w-20 h-24 flex-shrink-0 bg-neutral-800 border border-white/10 mr-5 overflow-hidden">
                          <img [src]="item.product.image" [alt]="item.product.name" class="w-full h-full object-cover mix-blend-luminosity" referrerpolicy="no-referrer">
                        </a>
                        <div class="flex flex-col">
                          <a [routerLink]="['/product', item.product.id]" class="font-bold text-sm uppercase tracking-tight hover:text-accent transition-colors line-clamp-1">{{ item.product.name }}</a>
                          <span class="font-sans text-xs text-neutral-500 mt-1">\${{ item.product.price.toFixed(2) }}</span>
                          <div class="mt-2 font-sans text-[10px] uppercase tracking-widest text-neutral-500 flex gap-4">
                            <span>Color: <strong class="text-white">{{ item.selectedColor }}</strong></span>
                            <span>Size: <strong class="text-white">{{ item.selectedSize }}</strong></span>
                          </div>
                          <button (click)="removeItem(item)" class="text-[10px] font-bold uppercase tracking-widest text-neutral-500 hover:text-accent self-start mt-3 transition-colors">Remove</button>
                        </div>
                      </div>

                      <!-- Quantity -->
                      <div class="col-span-3 flex justify-center w-full sm:w-auto mb-4 sm:mb-0">
                        <div class="flex items-center border border-white/20 w-28 h-11 bg-neutral-900/50">
                          <button (click)="updateQuantity(item, item.quantity - 1)" class="w-9 h-full flex items-center justify-center text-neutral-400 hover:text-accent transition-colors">
                            <mat-icon class="text-sm">remove</mat-icon>
                          </button>
                          <span class="flex-grow text-center font-sans text-sm font-bold">{{ item.quantity }}</span>
                          <button (click)="updateQuantity(item, item.quantity + 1)" class="w-9 h-full flex items-center justify-center text-neutral-400 hover:text-accent transition-colors">
                            <mat-icon class="text-sm">add</mat-icon>
                          </button>
                        </div>
                      </div>

                      <!-- Total -->
                      <div class="col-span-3 text-right w-full sm:w-auto flex justify-between sm:block">
                        <span class="sm:hidden text-[10px] uppercase tracking-widest text-neutral-500">Total:</span>
                        <span class="font-sans font-bold text-lg">\${{ (item.product.price * item.quantity).toFixed(2) }}</span>
                      </div>

                    </div>
                  }
                </div>
              </div>
            </div>

            <!-- ORDER SUMMARY -->
            <div class="w-full lg:w-96 flex-shrink-0">
              <div class="bg-neutral-900/50 border border-white/10 border-t-4 border-accent p-8 sticky top-28 animate-fade-up">
                <h2 class="font-[900] text-2xl uppercase tracking-tighter italic mb-6">Summary</h2>

                <div class="space-y-4 mb-8 font-sans text-sm">
                  <div class="flex justify-between text-neutral-400">
                    <span>Subtotal</span>
                    <span class="text-white">\${{ cartTotal().toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between text-neutral-400">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div class="flex justify-between text-neutral-400">
                    <span>Taxes</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div class="border-t border-white/10 pt-4 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>\${{ cartTotal().toFixed(2) }}</span>
                  </div>
                </div>

                <a routerLink="/checkout" class="block w-full bg-accent text-black text-center py-4 font-black text-sm uppercase tracking-[0.2em] hover:bg-white transition-colors">
                  Checkout
                </a>

                <div class="mt-6">
                  <p class="font-sans text-[10px] uppercase tracking-widest text-neutral-500 text-center flex items-center justify-center">
                    <mat-icon class="mr-2 text-sm">lock</mat-icon> Secure Checkout
                  </p>
                </div>
              </div>
            </div>

          </div>
        } @else {
          <!-- EMPTY CART -->
          <div class="border border-white/10 p-16 text-center animate-fade-up">
            <mat-icon class="text-6xl text-neutral-700 mb-6">shopping_bag</mat-icon>
            <h2 class="font-[900] text-3xl uppercase tracking-tighter italic mb-4">Your cart is empty</h2>
            <p class="font-sans text-sm text-neutral-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
            <a routerLink="/shop" class="inline-block bg-accent text-black px-10 py-4 font-black text-sm uppercase tracking-[0.2em] hover:bg-white transition-colors">
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
