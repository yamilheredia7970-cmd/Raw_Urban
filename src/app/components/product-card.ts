import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '../services/product.service';

@Component({
  selector: 'app-product-card',
  imports: [RouterLink],
  template: `
    <div class="group relative flex flex-col p-4 h-full transition-colors duration-300 hover:bg-neutral-900/50">
      <!-- Image Container -->
      <a [routerLink]="['/product', product.id]" class="relative w-full aspect-square bg-neutral-800 overflow-hidden block mb-3 border border-white/5">
        <img
          [src]="imgError ? fallbackSrc : product.image"
          (error)="imgError = true"
          [alt]="product.name"
          class="w-full h-full object-cover object-center opacity-70 group-hover:opacity-100 scale-100 group-hover:scale-110 transition-[opacity,transform] duration-700 ease-out mix-blend-luminosity group-hover:mix-blend-normal"
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

        <!-- Quick add, slides up on hover -->
        <div class="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out bg-accent text-black text-center py-2.5 text-[10px] font-black uppercase tracking-widest">
          Quick View
        </div>
      </a>

      <!-- Content -->
      <div class="flex flex-col flex-grow justify-between">
        <div class="flex justify-between items-start mb-2">
          <div>
            <h3 class="font-bold text-xs tracking-tight uppercase text-white line-clamp-1 mb-1">
              <a [routerLink]="['/product', product.id]" class="hover:text-accent transition-colors">{{ product.name }}</a>
            </h3>
            <p class="text-[10px] text-neutral-500 uppercase tracking-widest">{{ product.category }}</p>
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

  get fallbackSrc(): string {
    const label = encodeURIComponent(this.product.name);
    return `https://placehold.co/800x800/171717/CCFF00?text=${label}&font=roboto`;
  }
}
