import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-account',
  imports: [],
  template: `
    <div class="bg-black min-h-screen text-white py-12 lg:py-20">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        @if (!isLoggedIn()) {
          <div class="max-w-md mx-auto bg-neutral-900/50 border border-white/10 border-t-4 border-accent p-8 animate-fade-up">
            <h1 class="font-[900] text-4xl uppercase tracking-tighter italic mb-6">Login</h1>

            <form (submit)="login($event)">
              <div class="mb-4">
                <label for="loginEmail" class="block font-sans text-xs font-bold uppercase tracking-widest text-neutral-500 mb-2">Email Address</label>
                <input id="loginEmail" type="email" placeholder="you&#64;email.com" class="field-dark">
              </div>
              <div class="mb-6">
                <div class="flex justify-between items-center mb-2">
                  <label for="loginPassword" class="block font-sans text-xs font-bold uppercase tracking-widest text-neutral-500">Password</label>
                  <a href="#" class="font-sans text-xs text-neutral-500 hover:text-accent transition-colors">Forgot?</a>
                </div>
                <input id="loginPassword" type="password" placeholder="••••••••" class="field-dark">
              </div>

              <button type="submit" class="w-full bg-accent text-black py-4 font-black text-sm uppercase tracking-[0.2em] hover:bg-white transition-colors">
                Sign In
              </button>
              <p class="text-center text-[10px] uppercase tracking-widest text-neutral-600 mt-4">Demo: any email &amp; password signs you in</p>
            </form>

            <div class="mt-8 text-center border-t border-white/10 pt-6">
              <span class="font-sans text-sm text-neutral-500">Don't have an account? </span>
              <a href="#" class="font-sans text-sm font-bold border-b border-white hover:text-accent hover:border-accent transition-colors">Create one</a>
            </div>
          </div>
        } @else {
          <!-- DASHBOARD -->
          <div class="animate-fade-up">
            <div class="flex justify-between items-end mb-12">
              <h1 class="font-[900] text-5xl md:text-6xl uppercase tracking-tighter italic leading-none">My Account</h1>
              <button (click)="logout()" class="font-sans text-xs font-bold uppercase tracking-widest text-neutral-500 hover:text-accent transition-colors">Log out</button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

              <!-- Sidebar -->
              <div class="md:col-span-1">
                <div class="bg-neutral-900/50 border border-white/10 border-t-4 border-accent p-6">
                  <p class="font-sans font-bold text-lg mb-1">Demo User</p>
                  <p class="font-sans text-sm text-neutral-500 mb-6">demo&#64;example.com</p>

                  <nav class="space-y-4 font-sans text-xs font-bold uppercase tracking-widest">
                    <a href="#" class="block text-accent">Order History</a>
                    <a href="#" class="block text-neutral-500 hover:text-white transition-colors">Addresses</a>
                    <a href="#" class="block text-neutral-500 hover:text-white transition-colors">Account Details</a>
                    <a href="#" class="block text-neutral-500 hover:text-white transition-colors">Wishlist</a>
                  </nav>
                </div>
              </div>

              <!-- Main Content -->
              <div class="md:col-span-2">
                <h2 class="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-6">Order History</h2>

                <div class="bg-neutral-900/30 border border-white/10 divide-y divide-white/10">
                  <div class="p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <p class="font-sans font-bold mb-1">Order #RU-0982</p>
                      <p class="font-sans text-sm text-neutral-500">Placed on Oct 12, 2026</p>
                    </div>
                    <div class="flex items-center gap-6">
                      <span class="font-sans font-bold">$245.00</span>
                      <span class="bg-accent text-black px-3 py-1 font-sans text-[10px] uppercase font-black tracking-widest">Fulfilled</span>
                    </div>
                  </div>

                  <div class="p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div>
                      <p class="font-sans font-bold mb-1">Order #RU-0845</p>
                      <p class="font-sans text-sm text-neutral-500">Placed on Sep 04, 2026</p>
                    </div>
                    <div class="flex items-center gap-6">
                      <span class="font-sans font-bold">$89.99</span>
                      <span class="border border-white/20 text-neutral-400 px-3 py-1 font-sans text-[10px] uppercase font-black tracking-widest">Delivered</span>
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
