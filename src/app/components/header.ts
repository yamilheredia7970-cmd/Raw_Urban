import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <header class="sticky top-0 z-50 w-full bg-black border-b-[3px] border-white text-white">
      <div class="max-w-[1440px] mx-auto px-6 h-[80px] flex items-center justify-between">
        <!-- Logo -->
        <a routerLink="/" class="flex-shrink-0">
          <span class="font-[900] text-3xl md:text-4xl tracking-tighter italic uppercase leading-none">RAW_URBAN</span>
        </a>

        <!-- Desktop Navigation -->
        <nav class="hidden lg:flex space-x-6 text-[10px] font-bold tracking-widest uppercase">
          <a routerLink="/shop" routerLinkActive="border-b-2 border-accent text-white pb-1" [routerLinkActiveOptions]="{exact: true}" class="hover:text-accent transition-colors text-neutral-400">Shop / All</a>
          <a routerLink="/shop" [queryParams]="{category: 'Outerwear'}" class="hover:text-accent transition-colors text-neutral-400">Outerwear</a>
          <a routerLink="/shop" [queryParams]="{category: 'Hoodies'}" class="hover:text-accent transition-colors text-neutral-400">Hoodies</a>
          <a routerLink="/shop" [queryParams]="{category: 'T-Shirts'}" class="hover:text-accent transition-colors text-neutral-400">T-Shirts</a>
          <a routerLink="/shop" [queryParams]="{category: 'Pants'}" class="hover:text-accent transition-colors text-neutral-400">Pants</a>
          <a routerLink="/shop" [queryParams]="{category: 'Accessories'}" class="hover:text-accent transition-colors text-neutral-400">Accessories</a>
        </nav>

        <!-- Actions -->
        <div class="flex items-center space-x-6">
          <div class="hidden lg:flex bg-neutral-900 px-4 py-2 items-center gap-3 border border-white/20">
            <span class="text-[10px] font-bold text-neutral-500 tracking-widest uppercase">Search...</span>
            <div class="w-3 h-3 border-2 border-neutral-500 rounded-full"></div>
          </div>
          
          <a routerLink="/account" class="text-[10px] font-bold hover:text-accent transition-colors hidden sm:block uppercase tracking-widest">
            Account
          </a>
          
          <a routerLink="/cart" class="bg-accent text-black px-3 py-1.5 flex items-center gap-2 hover:bg-white transition-colors">
            <span class="text-[10px] font-black tracking-widest uppercase">Cart</span>
            <span class="text-[10px] font-bold">({{ cartCount() }})</span>
          </a>
        </div>
      </div>
    </header>
  `
})
export class HeaderComponent {
  cartService = inject(CartService);
  cartCount = this.cartService.cartCount;
}
