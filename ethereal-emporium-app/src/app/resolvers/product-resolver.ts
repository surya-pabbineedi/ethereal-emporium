import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, firstValueFrom, of, take } from 'rxjs';
import { ProductService } from '../services/product.service';
import { PagedResponse } from '../models/paged-response';
import { Product } from '../models/product';

export async function ProductsResolver(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  productService: ProductService = inject(ProductService)
): Promise<PagedResponse<Product>> {
  return await firstValueFrom(productService.getProducts$().pipe(take(1)));
}

export async function ProductResolver(
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
  productService: ProductService = inject(ProductService),
  router = inject(Router)
): Promise<Product | null> {
  return await firstValueFrom(
    productService.getProduct$(route.paramMap.get('id')).pipe(
      take(1),
      catchError(() => {
        router.navigate(['/404']);
        return of(null);
      })
    )
  );
}
