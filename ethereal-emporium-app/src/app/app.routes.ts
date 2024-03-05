import { Route } from '@angular/router';
import { ProductResolver } from './resolvers/product-resolver';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '404',
    loadComponent: () => import('./core/not-found.component'),
    title: 'Not Found',
  },
  {
    path: 'login',
    loadComponent: () => import('./core/login/login.component'),
    title: 'Login',
    data: {
      showHeader: false,
    },
  },
  {
    path: 'home',
    loadComponent: () => import('./core/home/home.component'),
    title: 'Home',
  },
  {
    path: 'products',
    title: 'Products',
    loadComponent: () => import('./products/products.component'),
    // resolve: {
    //   products: ProductsResolver,
    // },
  },
  {
    path: 'products/:id',
    loadComponent: () =>
      import('./products/product-detail/product-detail.component'),
    resolve: {
      product: ProductResolver,
    },
  },
  {
    path: 'roles',
    loadComponent: () => import('./roles/roles.component'),
  },
];
