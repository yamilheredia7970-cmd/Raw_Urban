import { Injectable, signal, computed } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  gallery: string[];
  category: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  stock: number;
  isNew?: boolean;
}

const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'STRIKE OVERSIZED HOODIE',
    description: 'Heavyweight cotton hoodie with drop shoulders and bold back graphic. Built for the streets. 100% premium cotton, 400gsm.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1572495641004-28421ae52e52?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Hoodies',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'Red', 'Grey'],
    rating: 4.8,
    reviews: 124,
    stock: 50,
    isNew: true
  },
  {
    id: 'p2',
    name: 'NEON UTILITY CARGO PANTS',
    description: 'Tactical cargo pants with multi-pocket design, adjustable cuffs, and reinforced stitching. Water-resistant finish.',
    price: 110.00,
    originalPrice: 140.00,
    discount: 21,
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549062572-544a64fb0c56?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Pants',
    sizes: ['28', '30', '32', '34', '36'],
    colors: ['Black', 'Olive'],
    rating: 4.5,
    reviews: 89,
    stock: 30
  },
  {
    id: 'p3',
    name: 'BLOCK LOGO TEE',
    description: 'Boxy fit heavy tee featuring our signature block logo front and center. Essential everyday piece.',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'T-Shirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['White', 'Black'],
    rating: 4.9,
    reviews: 312,
    stock: 120
  },
  {
    id: 'p4',
    name: 'TACTICAL VEST',
    description: 'Layer up with this tech-wear inspired vest. Features magnetic buckles, mesh lining, and secure zip pockets.',
    price: 135.00,
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1544022613-e87ca75a784a?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Outerwear',
    sizes: ['M', 'L', 'XL'],
    colors: ['Black'],
    rating: 4.7,
    reviews: 45,
    stock: 15
  },
  {
    id: 'p5',
    name: 'ACID WASH CREWNECK',
    description: 'Vintage-inspired acid wash crewneck with distressed details and relaxed fit.',
    price: 75.00,
    originalPrice: 95.00,
    discount: 21,
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Sweatshirts',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Grey', 'Charcoal'],
    rating: 4.4,
    reviews: 67,
    stock: 80
  },
  {
    id: 'p6',
    name: 'STRIKE BEANIE',
    description: 'Chunky knit beanie with rubberized logo patch. Keeps you warm and on point.',
    price: 28.00,
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Accessories',
    sizes: ['OS'],
    colors: ['Black', 'Red', 'Neon Green'],
    rating: 4.8,
    reviews: 150,
    stock: 200
  },
  {
    id: 'p7',
    name: 'GRAFFITI PUFFER JACKET',
    description: 'High-volume puffer jacket featuring custom all-over graffiti print. Extreme cold protection.',
    price: 195.00,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Outerwear',
    sizes: ['M', 'L', 'XL'],
    colors: ['Black/White'],
    rating: 4.9,
    reviews: 32,
    stock: 10,
    isNew: true
  },
  {
    id: 'p8',
    name: 'ESSENTIAL JOGGERS',
    description: 'Premium fleece joggers with tapered fit, long drawstrings, and embroidered logo.',
    price: 65.00,
    image: 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=800',
    gallery: [
      'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=800'
    ],
    category: 'Pants',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Black', 'Grey'],
    rating: 4.6,
    reviews: 210,
    stock: 150
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsSignal = signal<Product[]>(MOCK_PRODUCTS);

  products = this.productsSignal.asReadonly();

  getTrendingProducts = computed(() => {
    return this.productsSignal().slice(0, 4);
  });

  getProductById(id: string): Product | undefined {
    return this.productsSignal().find(p => p.id === id);
  }

  getProductsByCategory(category: string): Product[] {
    if (!category || category === 'All') return this.productsSignal();
    return this.productsSignal().filter(p => p.category === category);
  }
}
