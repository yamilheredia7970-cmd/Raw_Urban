import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService, Product } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { ProductCardComponent } from '../components/product-card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink, ProductCardComponent, MatIconModule],
  template: `
    @if (product()) {
      <div class="bg-black min-h-screen text-white border-x border-white/10 max-w-[1440px] mx-auto">
        <!-- BREADCRUMBS -->
        <div class="border-b border-white/10 px-8 py-6">
          <nav class="flex text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em]">
            <a routerLink="/" class="hover:text-accent transition-colors">Home</a>
            <span class="mx-3">/</span>
            <a routerLink="/shop" [queryParams]="{category: product()!.category}" class="hover:text-accent transition-colors">{{ product()!.category }}</a>
            <span class="mx-3">/</span>
            <span class="text-white">{{ product()!.name }}</span>
          </nav>
        </div>

        <section class="grid grid-cols-1 lg:grid-cols-12 border-b border-white/10">
          
          <!-- IMAGE GALLERY (Col 7) -->
          <div class="lg:col-span-7 flex flex-col-reverse lg:flex-row border-b lg:border-b-0 lg:border-r border-white/10">
            <!-- Thumbnails -->
            <div class="flex lg:flex-col overflow-x-auto lg:overflow-visible w-full lg:w-24 flex-shrink-0 hide-scrollbar border-t lg:border-t-0 lg:border-r border-white/10 bg-neutral-900/30">
              @for (img of product()!.gallery; track img; let i = $index) {
                <button (click)="activeImageIndex.set(i)" 
                        class="w-24 lg:w-full aspect-square flex-shrink-0 border-r lg:border-r-0 lg:border-b border-white/10 transition-colors relative"
                        [class.bg-white]="activeImageIndex() === i">
                  <img [src]="img" alt="Thumbnail" class="w-full h-full object-cover opacity-60 mix-blend-luminosity hover:opacity-100 transition-opacity" [class.mix-blend-normal]="activeImageIndex() === i" [class.opacity-100]="activeImageIndex() === i" referrerpolicy="no-referrer">
                </button>
              }
            </div>
            <!-- Main Image -->
            <div class="w-full bg-neutral-900 aspect-[4/5] relative flex-grow">
              <img [src]="product()!.gallery[activeImageIndex()]" [alt]="product()!.name" class="w-full h-full object-cover mix-blend-luminosity" referrerpolicy="no-referrer">
              @if (product()!.discount) {
                <span class="absolute top-6 left-6 bg-accent text-black text-[10px] font-black uppercase px-3 py-1.5 tracking-widest">Sale / -{{product()!.discount}}%</span>
              }
            </div>
          </div>

          <!-- PRODUCT INFO (Col 5) -->
          <div class="lg:col-span-5 flex flex-col p-8 md:p-12">
            <span class="text-[10px] font-black uppercase tracking-[0.2em] text-accent mb-4">{{ product()!.category }}</span>
            <h1 class="font-[900] text-5xl md:text-6xl uppercase tracking-tighter italic leading-none mb-6">{{ product()!.name }}</h1>
            
            <div class="flex items-center space-x-4 mb-8">
              <span class="text-3xl font-[900] tracking-tighter">\${{ product()!.price.toFixed(2) }}</span>
              @if (product()!.originalPrice) {
                <span class="text-lg text-neutral-500 line-through font-bold">\${{ product()!.originalPrice?.toFixed(2) }}</span>
              }
            </div>

            <p class="text-sm text-neutral-400 mb-10 leading-relaxed font-medium">{{ product()!.description }}</p>

            <!-- SELECTORS -->
            <div class="mb-10 flex flex-col gap-8">
              
              <!-- Color -->
              <div>
                <div class="flex justify-between items-center mb-3 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                  <span>Color <span class="text-white ml-2">{{ selectedColor() }}</span></span>
                </div>
                <div class="flex gap-3">
                  @for (color of product()!.colors; track color) {
                    <button (click)="selectedColor.set(color)"
                            class="px-5 py-2 border text-xs font-bold uppercase tracking-widest transition-colors"
                            [class.border-white]="selectedColor() === color"
                            [class.bg-white]="selectedColor() === color"
                            [class.text-black]="selectedColor() === color"
                            [class.border-white/20]="selectedColor() !== color"
                            [class.text-neutral-400]="selectedColor() !== color"
                            [class.hover:border-accent]="selectedColor() !== color"
                            [class.hover:text-accent]="selectedColor() !== color">
                      {{ color }}
                    </button>
                  }
                </div>
              </div>

              <!-- Size -->
              <div>
                <div class="flex justify-between items-center mb-3 text-[10px] font-black uppercase tracking-widest text-neutral-500">
                  <span>Size <span class="text-white ml-2">{{ selectedSize() || 'Select' }}</span></span>
                  <a href="#" class="hover:text-white transition-colors border-b border-neutral-500 pb-0.5">Size Guide</a>
                </div>
                <div class="flex flex-wrap gap-3">
                  @for (size of product()!.sizes; track size) {
                    <button (click)="selectedSize.set(size)"
                            class="w-12 h-12 flex items-center justify-center border text-xs font-bold transition-colors"
                            [class.border-white]="selectedSize() === size"
                            [class.bg-white]="selectedSize() === size"
                            [class.text-black]="selectedSize() === size"
                            [class.border-white/20]="selectedSize() !== size"
                            [class.text-neutral-400]="selectedSize() !== size"
                            [class.hover:border-accent]="selectedSize() !== size"
                            [class.hover:text-accent]="selectedSize() !== size">
                      {{ size }}
                    </button>
                  }
                </div>
              </div>

              <!-- Quantity -->
              <div>
                <span class="block mb-3 text-[10px] font-black uppercase tracking-widest text-neutral-500">Quantity</span>
                <div class="flex items-center border border-white/20 w-32 h-12 bg-neutral-900/50">
                  <button (click)="decrement()" class="w-10 h-full flex items-center justify-center text-neutral-400 hover:text-accent hover:bg-white/5 transition-colors">
                    <mat-icon class="text-sm">remove</mat-icon>
                  </button>
                  <span class="flex-grow text-center text-sm font-bold">{{ quantity() }}</span>
                  <button (click)="increment()" class="w-10 h-full flex items-center justify-center text-neutral-400 hover:text-accent hover:bg-white/5 transition-colors">
                    <mat-icon class="text-sm">add</mat-icon>
                  </button>
                </div>
              </div>

            </div>

            <!-- Actions -->
            <div class="flex flex-col gap-4 mt-auto">
              <button (click)="addToCart()"
                      [disabled]="!selectedSize() || !selectedColor()"
                      class="w-full bg-accent text-black h-14 font-black text-sm uppercase tracking-[0.2em] hover:bg-white transition-colors disabled:opacity-50 disabled:hover:bg-accent disabled:cursor-not-allowed flex items-center justify-center">
                Add To Cart
              </button>
              @if (!selectedSize() || !selectedColor()) {
                 <p class="text-[10px] font-bold uppercase tracking-widest text-neutral-500 text-center">Select size and color to continue</p>
              }
              @if (showAddedMessage()) {
                 <p class="text-[10px] font-bold uppercase tracking-widest text-accent text-center mt-2 flex items-center justify-center"><mat-icon class="mr-1 text-[14px]">check_circle</mat-icon> Added to cart</p>
              }
            </div>

          </div>
        </section>

        <!-- RELATED PRODUCTS -->
        <section class="bg-neutral-900/20 relative overflow-hidden">
          <div class="px-8 py-12 md:py-16">
            <h2 class="font-[900] text-4xl md:text-5xl uppercase tracking-tighter italic mb-10">Archive Match</h2>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-white/10">
              @for (related of relatedProducts(); track related.id) {
                <div class="border-b border-r border-white/10 bg-black">
                  <app-product-card [product]="related"></app-product-card>
                </div>
              }
            </div>
          </div>
        </section>
      </div>
    } @else {
      <div class="text-center py-32 bg-black min-h-screen text-white flex flex-col items-center justify-center">
        <h2 class="font-[900] text-5xl uppercase tracking-tighter italic mb-6">404 / Missing</h2>
        <a routerLink="/shop" class="border-[3px] border-white px-8 py-4 font-black text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-colors">Return to Base</a>
      </div>
    }
  `,
  styles: [`
    .hide-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .hide-scrollbar {
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  cartService = inject(CartService);

  product = signal<Product | undefined>(undefined);
  activeImageIndex = signal(0);
  
  selectedColor = signal<string>('');
  selectedSize = signal<string>('');
  quantity = signal(1);
  
  showAddedMessage = signal(false);

  relatedProducts = computed(() => {
    const p = this.product();
    if (!p) return [];
    // Just grab 4 trending as related for mock
    return this.productService.getTrendingProducts().filter(prod => prod.id !== p.id).slice(0, 4);
  });

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const found = this.productService.getProductById(id);
        this.product.set(found);
        if (found) {
          // Reset selections
          this.activeImageIndex.set(0);
          this.selectedColor.set(found.colors[0] || '');
          this.selectedSize.set('');
          this.quantity.set(1);
          this.showAddedMessage.set(false);
        }
      }
    });
  }

  increment() {
    this.quantity.update(q => q + 1);
  }

  decrement() {
    this.quantity.update(q => q > 1 ? q - 1 : 1);
  }

  addToCart() {
    const p = this.product();
    if (p && this.selectedSize() && this.selectedColor()) {
      this.cartService.addToCart(p, this.quantity(), this.selectedSize(), this.selectedColor());
      this.showAddedMessage.set(true);
      setTimeout(() => this.showAddedMessage.set(false), 3000);
    }
  }
}
