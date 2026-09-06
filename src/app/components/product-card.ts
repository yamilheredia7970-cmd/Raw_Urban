import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../services/product.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  template: `
    <div class="group relative flex flex-col p-4 h-full transition-colors duration-500 hover:bg-neutral-900/50">
      <!-- Image Container, notched corner tag -->
      <div class="relative w-full aspect-[4/5] mb-3">
        <div class="absolute top-0 right-0 w-7 h-7 bg-accent" style="clip-path: polygon(100% 0, 100% 100%, 0 0);"></div>
        <a
          [routerLink]="['/product', product.id]"
          class="absolute inset-0 z-10 bg-neutral-800 overflow-hidden block border border-white/5 group-hover:border-accent/50 transition-colors duration-500"
          style="clip-path: polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%);"
        >
          <img
            [src]="imgError ? fallbackSrc : product.image"
            (error)="imgError = true"
            [alt]="product.name"
            class="w-full h-full object-cover object-center opacity-70 group-hover:opacity-100 scale-100 group-hover:scale-105 transition-[opacity,transform] duration-[1200ms] ease-out mix-blend-luminosity group-hover:mix-blend-normal"
            referrerpolicy="no-referrer">

          <!-- Badges -->
          <div class="absolute top-3 left-3 flex flex-col gap-2 z-10">
            @if (product.isNew) {
              <span class="bg-white text-black text-[9px] font-black uppercase px-2 py-1 tracking-widest">New Drop</span>
            }
            @if (product.discount) {
              <span class="bg-accent text-black text-[9px] font-black uppercase px-2 py-1 tracking-widest">Sale</span>
            }
          </div>

          <!-- Quick view, slides up on hover -->
          <div class="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-accent text-black text-center py-2.5 text-[10px] font-black uppercase tracking-widest">
            Quick View
          </div>
        </a>
      </div>

      <!-- Content -->
      <div class="flex flex-col flex-grow justify-between">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h3 class="font-bold text-xs tracking-tight uppercase text-white line-clamp-1 mb-1">
              <a [routerLink]="['/product', product.id]" class="hover:text-accent transition-colors">{{ product.name }}</a>
            </h3>
            <p class="text-[10px] text-neutral-500 uppercase tracking-widest mb-1.5">{{ product.category }}</p>
            <div class="flex gap-1">
              @for (color of product.colors; track color) {
                <span
                  class="w-2.5 h-2.5 rounded-full border border-white/20"
                  [style.background]="swatchColor(color)"
                  [title]="color"
                ></span>
              }
            </div>
          </div>
          <div class="flex flex-col items-end flex-shrink-0 pl-2">
            <span class="font-bold text-xs text-white">\${{ product.price.toFixed(2) }}</span>
            @if (product.originalPrice) {
              <span class="text-[10px] text-neutral-500 line-through">\${{ product.originalPrice.toFixed(2) }}</span>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  imgError = false;

  private readonly colorMap: Record<string, string> = {
    black: '#171717',
    white: '#f5f5f5',
    red: '#dc2626',
    grey: '#9ca3af',
    gray: '#9ca3af',
    charcoal: '#4b5563',
    olive: '#5c5f3a',
    'neon green': '#CCFF00'
  };

  get fallbackSrc(): string {
    const label = encodeURIComponent(this.product.name);
    return `https://placehold.co/800x1000/171717/CCFF00?text=${label}&font=roboto`;
  }

  swatchColor(color: string): string {
    const key = color.toLowerCase();
    if (key.includes('/')) {
      const [a, b] = key.split('/').map(c => this.colorMap[c.trim()] ?? '#737373');
      return `linear-gradient(135deg, ${a} 50%, ${b} 50%)`;
    }
    return this.colorMap[key] ?? '#737373';
  }
}
