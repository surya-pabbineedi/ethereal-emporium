import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, firstValueFrom, of, take, tap } from 'rxjs';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { AppStore } from '../core/app.store';

export async function ProductsResolver(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  productService: ProductService = inject(ProductService),
  appStore = inject(AppStore)
): Promise<Product[]> {
  appStore.setLoading(true);
  return await firstValueFrom(
    productService.getProducts$().pipe(
      tap(() => appStore.setLoading(false)),
      catchError(() => {
        appStore.setLoading(false);
        return of([]);
      })
    )
  );
}

export async function ProductResolver(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  productService: ProductService = inject(ProductService),
  router = inject(Router),
  appStore = inject(AppStore)
): Promise<Product | null> {
  appStore.setLoading(true);
  return await firstValueFrom(
    productService.getProduct$(route.paramMap.get('id')).pipe(
      tap(() => appStore.setLoading(false)),
      catchError(() => {
        router.navigate(['/404']);
        return of(null);
      })
    )
  );
}
