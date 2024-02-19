import { Route } from '@angular/router';
import {
  ProductResolver,
  ProductsResolver,
} from './resolvers/product-resolver';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: '404',
    loadComponent: () => import('./core/not-found.component'),
    title: 'Not Found',
  },
  {
    path: 'products',
    title: 'Products',
    loadComponent: () => import('./products/products.component'),
    resolve: {
      products: ProductsResolver,
    },
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./products/product-detail/product-detail.component'),
    resolve: {
      product: ProductResolver,
    },
  },
];
