import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-account',
  imports: [],
  template: `
    <div class="bg-surface min-h-screen py-12 lg:py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        @if (!isLoggedIn()) {
          <div class="max-w-md mx-auto bg-white p-8 border-t-8 border-black">
            <h1 class="font-display text-4xl uppercase tracking-tighter mb-6">Login</h1>
            
            <form (submit)="login($event)">
              <div class="mb-4">
                <label for="loginEmail" class="block font-sans text-sm font-bold mb-2">Email Address</label>
                <input id="loginEmail" type="email" value="demo@strike.com" class="w-full border border-gray-300 px-4 py-3 font-sans focus:outline-none focus:border-black focus:ring-1 focus:ring-black">
              </div>
              <div class="mb-6">
                <div class="flex justify-between items-center mb-2">
                  <label for="loginPassword" class="block font-sans text-sm font-bold">Password</label>
                  <a href="#" class="font-sans text-sm text-gray-500 hover:text-black">Forgot?</a>
                </div>
                <input id="loginPassword" type="password" value="password123" class="w-full border border-gray-300 px-4 py-3 font-sans focus:outline-none focus:border-black focus:ring-1 focus:ring-black">
              </div>
              
              <button type="submit" class="w-full bg-black text-white py-4 font-display text-lg uppercase tracking-widest hover:bg-accent transition-colors">
                Sign In
              </button>
            </form>

            <div class="mt-8 text-center border-t border-gray-200 pt-6">
              <span class="font-sans text-sm text-gray-500">Don't have an account? </span>
              <a href="#" class="font-sans text-sm font-bold border-b border-black hover:text-accent hover:border-accent transition-colors">Create one</a>
            </div>
          </div>
        } @else {
          <!-- DASHBOARD -->
          <div>
            <div class="flex justify-between items-end mb-12">
              <h1 class="font-display text-5xl md:text-6xl text-black uppercase tracking-tighter leading-none">My Account</h1>
              <button (click)="logout()" class="font-sans text-sm font-bold underline hover:text-accent">Log out</button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              <!-- Sidebar -->
              <div class="md:col-span-1">
                <div class="bg-white p-6 border-t-4 border-black">
                  <p class="font-sans font-bold text-lg mb-1">Demo User</p>
                  <p class="font-sans text-sm text-gray-500 mb-6">demo&#64;strike.com</p>
                  
                  <nav class="space-y-4 font-sans text-sm font-bold uppercase">
                    <a href="#" class="block text-accent">Order History</a>
                    <a href="#" class="block text-gray-500 hover:text-black">Addresses</a>
                    <a href="#" class="block text-gray-500 hover:text-black">Account Details</a>
                    <a href="#" class="block text-gray-500 hover:text-black">Wishlist</a>
                  </nav>
                </div>
              </div>

              <!-- Main Content -->
              <div class="md:col-span-2">
                <h2 class="font-display text-2xl uppercase tracking-wide mb-6">Order History</h2>
                
                <div class="bg-white border-t-4 border-black divide-y divide-gray-200">
                  <div class="p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <p class="font-sans font-bold mb-1">Order #STK-0982</p>
                      <p class="font-sans text-sm text-gray-500">Placed on Oct 12, 2026</p>
                    </div>
                    <div class="flex items-center gap-6">
                      <span class="font-sans font-bold">$245.00</span>
                      <span class="bg-black text-white px-3 py-1 font-sans text-xs uppercase font-bold tracking-wider">Fulfilled</span>
                    </div>
                  </div>
                  
                  <div class="p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <p class="font-sans font-bold mb-1">Order #STK-0845</p>
                      <p class="font-sans text-sm text-gray-500">Placed on Sep 04, 2026</p>
                    </div>
                    <div class="flex items-center gap-6">
                      <span class="font-sans font-bold">$89.99</span>
                      <span class="bg-gray-200 text-gray-600 px-3 py-1 font-sans text-xs uppercase font-bold tracking-wider">Delivered</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        }
      </div>
    </div>
  `
})
export class AccountComponent {
  isLoggedIn = signal(false);

  login(event: Event) {
    event.preventDefault();
    this.isLoggedIn.set(true);
  }

  logout() {
    this.isLoggedIn.set(false);
  }
}
