import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ProductCardComponent } from '../components/product-card';

@Component({
  selector: 'app-home',
  imports: [RouterLink, ProductCardComponent],
  template: `
    <div class="max-w-[1440px] mx-auto w-full border-x border-white/10 bg-black">
      <main class="grid grid-cols-1 md:grid-cols-12 md:grid-rows-6 gap-0 min-h-screen">
        
        <!-- HERO (Col 8, Row 4) -->
        <section class="col-span-1 md:col-span-8 md:row-span-4 bg-neutral-900 relative overflow-hidden flex items-end p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 min-h-[500px]">
          <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 z-10"></div>
          
          <div class="absolute inset-0 z-0 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&q=80&w=1920" class="w-full h-full object-cover opacity-30 mix-blend-luminosity animate-kenburns" referrerpolicy="no-referrer">
          </div>

          <div class="absolute top-10 left-10 z-20 flex flex-col gap-2 animate-fade-up">
            <span class="bg-white text-black px-3 py-1 text-[10px] font-black tracking-widest self-start uppercase">New Drop / FW26</span>
            <h2 class="text-6xl md:text-[110px] font-[900] leading-[0.85] tracking-tighter uppercase italic mt-4 text-white">
              Distorted<br/>Reality
            </h2>
          </div>

          <div class="z-20 w-full flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mt-40 animate-fade-up" style="animation-delay: 150ms">
            <div class="max-w-[300px]">
              <p class="text-sm text-neutral-400 mb-6 font-medium">Contemporary streetwear engineered for the concrete landscape. Limited edition technical silhouettes.</p>
              <a routerLink="/shop" class="inline-block bg-accent text-black px-8 py-4 font-black text-sm uppercase tracking-widest hover:bg-white hover:scale-[1.03] active:scale-[0.98] transition-all">Shop Collection</a>
            </div>
            <div class="text-left md:text-right hidden sm:block">
              <span class="block text-[10px] tracking-[0.3em] text-white/40 mb-2 uppercase">Featured Product</span>
              <span class="block text-xl font-bold tracking-tighter italic text-white">"GHOST" SHELL PARKA — $249</span>
            </div>
          </div>
        </section>

        <!-- PROMO (Col 4, Row 3) -->
        <section class="col-span-1 md:col-span-4 md:row-span-3 bg-accent text-black p-8 md:p-10 flex flex-col justify-between border-b border-black min-h-[300px] animate-fade-up" style="animation-delay: 100ms">
          <div class="flex flex-col gap-1 mb-12">
            <span class="text-[10px] font-black tracking-[0.2em] uppercase">Limited Availability</span>
            <h3 class="text-4xl md:text-5xl font-[900] leading-none uppercase tracking-tighter italic mt-2">Archive<br/>Sale</h3>
          </div>
          <div class="flex flex-col gap-4">
            <div class="text-6xl md:text-7xl font-[900] leading-none tracking-tighter">-40%</div>
            <p class="text-xs font-bold uppercase tracking-tight text-black/80">Use code: RAW40 at checkout.<br/>Ends in 12:45:00</p>
            <a routerLink="/shop" class="border-[3px] border-black py-3 text-center font-black text-sm uppercase hover:bg-black hover:text-accent transition-colors mt-2">Claim Offer</a>
          </div>
        </section>

        <!-- STRIP (Col 4, Row 1) -->
        <section class="col-span-1 md:col-span-4 md:row-span-1 bg-white text-black flex items-center px-8 md:px-10 justify-between border-b border-white/10 md:border-b-0 min-h-[80px]">
          <span class="font-black text-[10px] tracking-widest uppercase">Latest Lookbook</span>
          <div class="flex items-center gap-4">
            <div class="w-12 h-[2px] bg-black hidden sm:block"></div>
            <span class="text-xl font-[900] italic">01 / 12</span>
          </div>
        </section>

        <!-- TRENDING PRODUCTS BENTO GRID -->
        @for (product of trendingProducts(); track product.id; let i = $index) {
          <section class="col-span-1 md:col-span-3 md:row-span-2 border-r border-b md:border-b-0 border-white/10 animate-fade-up" [style.animation-delay.ms]="200 + i * 80">
            <app-product-card [product]="product"></app-product-card>
          </section>
        }
      </main>
    </div>
  `
})
export class HomeComponent {
  productService = inject(ProductService);
  trendingProducts = this.productService.getTrendingProducts;
}
