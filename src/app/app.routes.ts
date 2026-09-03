import {Routes} from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home').then(m => m.HomeComponent)
  },
  {
    path: 'shop',
    loadComponent: () => import('./pages/shop').then(m => m.ShopComponent)
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product-detail').then(m => m.ProductDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart').then(m => m.CartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout').then(m => m.CheckoutComponent)
  },
  {
    path: 'account',
    loadComponent: () => import('./pages/account').then(m => m.AccountComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
