import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink],
  template: `
    <div class="bg-black min-h-screen text-white py-12">
      <div class="max-w-[1200px] mx-auto border-x border-white/10 px-4 sm:px-8 lg:px-12">

        <div class="text-center mb-12 animate-fade-up">
          <a routerLink="/" class="font-[900] text-4xl tracking-tighter uppercase italic leading-none inline-block">RAW_URBAN</a>
        </div>

        <div class="flex flex-col lg:flex-row gap-12">

          <!-- FORM SECTION -->
          <div class="flex-grow space-y-8">
            <!-- Contact -->
            <div class="bg-neutral-900/30 border border-white/10 p-8 animate-fade-up">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-[10px] font-black uppercase tracking-[0.2em] text-accent">01 <span class="text-white ml-2">Contact Information</span></h2>
                <a routerLink="/account" class="font-sans text-xs text-neutral-400 hover:text-accent transition-colors">Already have an account? Log in</a>
              </div>
              <div class="mb-4">
                <label for="email" class="block font-sans text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Email Address</label>
                <input id="email" type="email" placeholder="you&#64;email.com" class="field-dark">
              </div>
              <label class="flex items-center">
                <input type="checkbox" class="mr-3 w-4 h-4 accent-accent">
                <span class="font-sans text-xs text-neutral-400">Email me with news and offers</span>
              </label>
            </div>

            <!-- Shipping -->
            <div class="bg-neutral-900/30 border border-white/10 p-8 animate-fade-up" style="animation-delay: 80ms">
              <h2 class="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-6">02 <span class="text-white ml-2">Shipping Address</span></h2>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label for="firstName" class="block font-sans text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">First Name</label>
                  <input id="firstName" type="text" class="field-dark">
                </div>
                <div>
                  <label for="lastName" class="block font-sans text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Last Name</label>
                  <input id="lastName" type="text" class="field-dark">
                </div>
              </div>

              <div class="mb-4">
                <label for="address" class="block font-sans text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Address</label>
                <input id="address" type="text" class="field-dark">
              </div>

              <div class="mb-4">
                <label for="apartment" class="block font-sans text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Apartment, suite, etc. (optional)</label>
                <input id="apartment" type="text" class="field-dark">
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div class="sm:col-span-1">
                  <label for="city" class="block font-sans text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">City</label>
                  <input id="city" type="text" class="field-dark">
                </div>
                <div class="sm:col-span-1">
                  <label for="state" class="block font-sans text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">State</label>
                  <select id="state" class="field-dark">
                    <option class="bg-black">Select State</option>
                    <option class="bg-black">California</option>
                    <option class="bg-black">New York</option>
                  </select>
                </div>
                <div class="sm:col-span-1">
                  <label for="zip" class="block font-sans text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">ZIP Code</label>
                  <input id="zip" type="text" class="field-dark">
                </div>
              </div>
            </div>

            <!-- Payment -->
            <div class="bg-neutral-900/30 border border-white/10 p-8 animate-fade-up" style="animation-delay: 160ms">
              <h2 class="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-2">03 <span class="text-white ml-2">Payment</span></h2>
              <p class="font-sans text-xs text-neutral-500 mb-6">All transactions are secure and encrypted.</p>

              <div class="border border-accent/60 p-4 mb-4 bg-neutral-900/50">
                <label class="flex items-center font-bold font-sans text-sm">
                  <input type="radio" name="payment" checked class="mr-3 w-4 h-4 accent-accent">
                  Credit Card
                </label>
                <div class="mt-4 grid grid-cols-1 gap-4">
                  <input type="text" placeholder="Card Number" class="field-dark">
                  <div class="grid grid-cols-2 gap-4">
                    <input type="text" placeholder="Expiration Date (MM/YY)" class="field-dark">
                    <input type="text" placeholder="Security Code" class="field-dark">
                  </div>
                  <input type="text" placeholder="Name on Card" class="field-dark">
                </div>
              </div>

              <div class="border border-white/15 p-4">
                <label class="flex items-center font-bold font-sans text-sm">
                  <input type="radio" name="payment" class="mr-3 w-4 h-4 accent-accent">
                  PayPal
                </label>
              </div>

              <div class="mt-8">
                <button class="w-full bg-accent text-black py-5 font-black text-lg uppercase tracking-[0.2em] hover:bg-white transition-colors">
                  Pay Now
                </button>
              </div>
            </div>
          </div>

          <!-- ORDER SUMMARY (Sidebar) -->
          <div class="w-full lg:w-96 flex-shrink-0">
             <div class="bg-neutral-900/50 border border-white/10 border-l-4 border-accent p-8 sticky top-8 animate-fade-up" style="animation-delay: 240ms">
                <h2 class="font-[900] text-2xl uppercase tracking-tighter italic mb-6">Order Summary</h2>

                <div class="divide-y divide-white/10 mb-6">
                  @for (item of cartItems(); track item.product.id) {
                    <div class="py-4 flex gap-4">
                      <div class="w-16 h-20 bg-neutral-800 border border-white/10 relative flex-shrink-0 overflow-hidden">
                        <img [src]="item.product.image" [alt]="item.product.name" class="w-full h-full object-cover mix-blend-luminosity">
                        <span class="absolute -top-2 -right-2 bg-accent text-black w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">{{ item.quantity }}</span>
                      </div>
                      <div class="flex flex-col flex-grow">
                        <span class="uppercase text-sm font-bold leading-tight mb-1">{{ item.product.name }}</span>
                        <span class="font-sans text-xs text-neutral-500">{{ item.selectedColor }} / {{ item.selectedSize }}</span>
                        <span class="font-sans font-bold text-sm mt-auto">\${{ (item.product.price * item.quantity).toFixed(2) }}</span>
                      </div>
                    </div>
                  }
                </div>

                <div class="space-y-3 mb-6 font-sans text-sm text-neutral-400">
                  <div class="flex justify-between">
                    <span>Subtotal</span>
                    <span class="text-white">\${{ cartTotal().toFixed(2) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Shipping</span>
                    <span class="text-white">$10.00</span>
                  </div>
                  <div class="flex justify-between">
                    <span>Taxes</span>
                    <span class="text-white">$0.00</span>
                  </div>
                  <div class="border-t border-white/10 pt-3 flex justify-between font-bold text-lg text-white">
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
