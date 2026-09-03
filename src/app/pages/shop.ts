import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../services/product.service';
import { ProductCardComponent } from '../components/product-card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-shop',
  imports: [RouterLink, ProductCardComponent, MatIconModule],
  template: `
    <div class="bg-black min-h-screen text-white border-x border-white/10 max-w-[1440px] mx-auto">
      <!-- HEADER -->
      <div class="border-b border-white/10 p-8 md:p-12">
        <nav class="flex text-neutral-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
          <a routerLink="/" class="hover:text-accent transition-colors">Home</a>
          <span class="mx-2">/</span>
          <span class="text-white">Shop</span>
          @if (currentCategory() !== 'All') {
            <span class="mx-2">/</span>
            <span class="text-accent">{{ currentCategory() }}</span>
          }
        </nav>
        <h1 class="font-[900] text-5xl md:text-[80px] uppercase tracking-tighter italic leading-none">
          {{ currentCategory() === 'All' ? 'ALL_ARCHIVE' : currentCategory() }}
        </h1>
      </div>

      <section class="flex flex-col md:flex-row">
        
        <!-- SIDEBAR -->
        <aside class="w-full md:w-64 flex-shrink-0 border-b md:border-b-0 md:border-r border-white/10 p-8 md:p-10">
          <div class="sticky top-28">
            <!-- Categories -->
            <div class="mb-12">
              <h3 class="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-neutral-400">Category</h3>
              <ul class="space-y-4 text-xs font-bold tracking-widest uppercase">
                <li><button (click)="setCategory('All')" [class.text-accent]="currentCategory() === 'All'" class="hover:text-accent transition-colors text-left">All / Archive</button></li>
                <li><button (click)="setCategory('Outerwear')" [class.text-accent]="currentCategory() === 'Outerwear'" class="hover:text-accent transition-colors text-left">Outerwear</button></li>
                <li><button (click)="setCategory('Hoodies')" [class.text-accent]="currentCategory() === 'Hoodies'" class="hover:text-accent transition-colors text-left">Hoodies</button></li>
                <li><button (click)="setCategory('T-Shirts')" [class.text-accent]="currentCategory() === 'T-Shirts'" class="hover:text-accent transition-colors text-left">T-Shirts</button></li>
                <li><button (click)="setCategory('Pants')" [class.text-accent]="currentCategory() === 'Pants'" class="hover:text-accent transition-colors text-left">Pants</button></li>
                <li><button (click)="setCategory('Accessories')" [class.text-accent]="currentCategory() === 'Accessories'" class="hover:text-accent transition-colors text-left">Accessories</button></li>
              </ul>
            </div>

            <!-- Size -->
            <div>
              <h3 class="text-[10px] font-black uppercase tracking-[0.2em] mb-6 text-neutral-400">Size Filter</h3>
              <div class="flex flex-wrap gap-2">
                @for (size of ['S', 'M', 'L', 'XL', 'XXL']; track size) {
                  <button class="w-10 h-10 border border-white/20 flex items-center justify-center text-xs font-bold hover:border-accent hover:text-accent transition-colors">{{ size }}</button>
                }
              </div>
            </div>
          </div>
        </aside>

        <!-- GRID -->
        <div class="flex-grow flex flex-col">
          <!-- Toolbar -->
          <div class="flex justify-between items-center p-6 border-b border-white/10 text-[10px] font-bold uppercase tracking-widest text-neutral-500">
            <span>{{ filteredProducts().length }} Results</span>
            
            <div class="flex items-center space-x-3">
              <span>Sort:</span>
              <select class="bg-transparent border-none text-white focus:outline-none focus:ring-0 uppercase cursor-pointer text-[10px] font-bold tracking-widest">
                <option value="newest" class="bg-black">Latest Drop</option>
                <option value="price-low" class="bg-black">Price: Low</option>
                <option value="price-high" class="bg-black">Price: High</option>
              </select>
            </div>
          </div>

          <!-- Products -->
          @if (filteredProducts().length > 0) {
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
              @for (product of filteredProducts(); track product.id) {
                <div class="border-b border-r border-white/10">
                  <app-product-card [product]="product"></app-product-card>
                </div>
              }
            </div>
          } @else {
            <div class="text-center p-24 flex-grow flex flex-col items-center justify-center">
              <h3 class="font-[900] text-3xl italic uppercase tracking-tighter mb-4 text-white">No Transmission</h3>
              <p class="text-xs text-neutral-500 tracking-widest uppercase mb-8">Adjust your filters</p>
              <button (click)="setCategory('All')" class="bg-accent text-black px-8 py-3 font-black text-xs uppercase tracking-widest hover:bg-white transition-colors">Reset View</button>
            </div>
          }
        </div>
        
      </section>
    </div>
  `
})
export class ShopComponent implements OnInit {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);

  currentCategory = signal<string>('All');

  filteredProducts = computed(() => {
    return this.productService.getProductsByCategory(this.currentCategory());
  });

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const cat = params['category'];
      if (cat) {
        this.currentCategory.set(cat);
      } else {
        this.currentCategory.set('All');
      }
    });
  }

  setCategory(category: string) {
    this.currentCategory.set(category);
    // In a real app, update URL query params here
  }
}
