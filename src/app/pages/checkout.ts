import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink],
  template: `
    <div class="bg-surface min-h-screen py-12">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="text-center mb-12">
          <a routerLink="/" class="font-display text-5xl tracking-tighter text-black uppercase leading-none inline-block">Strike</a>
        </div>

        <div class="flex flex-col lg:flex-row gap-12">
          
          <!-- FORM SECTION -->
          <div class="flex-grow">
            <!-- Contact -->
            <div class="bg-white p-8 border-t-4 border-black mb-8">
              <div class="flex justify-between items-center mb-6">
                <h2 class="font-display text-2xl uppercase tracking-wide">Contact Information</h2>
                <a routerLink="/account" class="font-sans text-sm underline hover:text-accent">Already have an account? Log in</a>
              </div>
              <div class="mb-4">
                <label for="email" class="block font-sans text-sm font-bold mb-2">Email Address</label>
                <input id="email" type="email" class="w-full border border-gray-300 px-4 py-3 font-sans focus:outline-none focus:border-black focus:ring-1 focus:ring-black">
              </div>
              <label class="flex items-center">
                <input type="checkbox" class="mr-3 w-5 h-5 accent-black">
                <span class="font-sans text-sm">Email me with news and offers</span>
              </label>
            </div>

            <!-- Shipping -->
            <div class="bg-white p-8 border-t-4 border-black mb-8">
              <h2 class="font-display text-2xl uppercase tracking-wide mb-6">Shipping Address</h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label for="firstName" class="block font-sans text-sm font-bold mb-2">First Name</label>
                  <input id="firstName" type="text" class="w-full border border-gray-300 px-4 py-3 font-sans focus:outline-none focus:border-black focus:ring-1 focus:ring-black">
                </div>
                <div>
                  <label for="lastName" class="block font-sans text-sm font-bold mb-2">Last Name</label>
                  <input id="lastName" type="text" class="w-full border border-gray-300 px-4 py-3 font-sans focus:outline-none focus:border-black focus:ring-1 focus:ring-black">
                </div>
              </div>

              <div class="mb-4">
                <label for="address" class="block font-sans text-sm font-bold mb-2">Address</label>
                <input id="address" type="text" class="w-full border border-gray-300 px-4 py-3 font-sans focus:outline-none focus:border-black focus:ring-1 focus:ring-black">
              </div>

              <div class="mb-4">
                <label for="apartment" class="block font-sans text-sm font-bold mb-2">Apartment, suite, etc. (optional)</label>
                <input id="apartment" type="text" class="w-full border border-gray-300 px-4 py-3 font-sans focus:outline-none focus:border-black focus:ring-1 focus:ring-black">
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="sm:col-span-1">
                  <label for="city" class="block font-sans text-sm font-bold mb-2">City</label>
                  <input id="city" type="text" class="w-full border border-gray-300 px-4 py-3 font-sans focus:outline-none focus:border-black focus:ring-1 focus:ring-black">
                </div>
                <div class="sm:col-span-1">
                  <label for="state" class="block font-sans text-sm font-bold mb-2">State</label>
                  <select id="state" class="w-full border border-gray-300 px-4 py-3 font-sans focus:outline-none focus:border-black focus:ring-1 focus:ring-black bg-white">
                    <option>Select State</option>
                    <option>California</option>
                    <option>New York</option>
                  </select>
                </div>
                <div class="sm:col-span-1">
                  <label for="zip" class="block font-sans text-sm font-bold mb-2">ZIP Code</label>
                  <input id="zip" type="text" class="w-full border border-gray-300 px-4 py-3 font-sans focus:outline-none focus:border-black focus:ring-1 focus:ring-black">
                </div>
              </div>
            </div>

            <!-- Payment -->
            <div class="bg-white p-8 border-t-4 border-black">
              <h2 class="font-display text-2xl uppercase tracking-wide mb-2">Payment</h2>
              <p class="font-sans text-sm text-gray-500 mb-6">All transactions are secure and encrypted.</p>
              
              <div class="border border-black p-4 mb-4 bg-gray-50">
                <label class="flex items-center font-bold font-sans">
                  <input type="radio" name="payment" checked class="mr-3 w-5 h-5 accent-black">
                  Credit Card
                </label>
                <div class="mt-4 grid grid-cols-1 gap-4">
                  <input type="text" placeholder="Card Number" class="w-full border border-gray-300 px-4 py-3 font-sans focus:outline-none focus:border-black focus:ring-1 focus:ring-black">
                  <div class="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Expiration Date (MM/YY)" class="w-full border border-gray-300 px-4 py-3 font-sans focus:outline-none focus:border-black focus:ring-1 focus:ring-black">
                    <input type="text" placeholder="Security Code" class="w-full border border-gray-300 px-4 py-3 font-sans focus:outline-none focus:border-black focus:ring-1 focus:ring-black">
                  </div>
                  <input type="text" placeholder="Name on Card" class="w-full border border-gray-300 px-4 py-3 font-sans focus:outline-none focus:border-black focus:ring-1 focus:ring-black">
                </div>
              </div>
              
              <div class="border border-gray-300 p-4">
                <label class="flex items-center font-bold font-sans">
                  <input type="radio" name="payment" class="mr-3 w-5 h-5 accent-black">
                  PayPal
                </label>
              </div>

              <div class="mt-8">
                <button class="w-full bg-accent text-white py-5 font-display text-2xl uppercase tracking-widest hover:bg-red-700 transition-colors">
                  Pay Now
                </button>
              </div>
            </div>
          </div>

          <!-- ORDER SUMMARY (Sidebar) -->
          <div class="w-full lg:w-96 flex-shrink-0">
             <div class="bg-gray-100 p-8 sticky top-8 border-l-4 border-black">
                <h2 class="font-display text-2xl uppercase tracking-wide mb-6">Order Summary</h2>
                
                <div class="divide-y divide-gray-300 mb-6">
                  @for (item of cartItems(); track item.product.id) {
                    <div class="py-4 flex gap-4">
                      <div class="w-16 h-20 bg-gray-200 relative flex-shrink-0">
                        <img [src]="item.product.image" [alt]="item.product.name" class="w-full h-full object-cover">
                        <span class="absolute -top-2 -right-2 bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">{{ item.quantity }}</span>
                      </div>
                      <div class="flex flex-col flex-grow">
                        <span class="font-display uppercase text-sm leading-tight mb-1">{{ item.product.name }}</span>
                        <span class="font-sans text-xs text-gray-500">{{ item.selectedColor }} / {{ item.selectedSize }}</span>
                        <span class="font-sans font-bold text-sm mt-auto">\${{ (item.product.price * item.quantity).toFixed(2) }}</span>
                      </div>
                    </div>
                  }
                </div>

                <div class="space-y-3 mb-6 font-sans text-sm">
                  <div class="flex justify-between">
                    <span>Subtotal</span>
                    <span>\${{ cartTotal().toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Shipping</span>
                    <span>$10.00</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Taxes</span>
                    <span>$0.00</span>
                  </div>
                  <div class="border-t border-gray-300 pt-3 flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>\${{ (cartTotal() + 10).toFixed(2) }}</span>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  `
})
export class CheckoutComponent {
  cartService = inject(CartService);
  cartItems = this.cartService.cartItems;
  cartTotal = this.cartService.cartTotal;
}
