import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '../models/product';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BulkImportProductComponent } from './bulk-import-product/bulk-import-product.component';
import { switchMap, take, tap } from 'rxjs';
import { ContentService } from '../services/content.service';
import { ProductService } from '../services/product.service';
import { NotificationHubService } from '../services/notification-hub.service';
import { MatSnackBar } from '@angular/material/snack-bar';

type ProductState = {
  products: Product[];
  filteredProducts: Product[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
};

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  isLoading: false,
  filter: { query: '', order: 'asc' },
};

export const ProductStore = signalStore(
  withState(initialState),
  withMethods((store) => {
    const dialogService = inject(MatDialog);
    const contentService = inject(ContentService);
    const productService = inject(ProductService);

    return {
      setProducts(incomingProducts: Product[]) {
        patchState(store, {
          products: incomingProducts,
          filteredProducts: incomingProducts,
        });
      },
      setIsLoading(isLoading: boolean) {
        patchState(store, { isLoading });
      },
      setFilter(filter: { query: string; order: 'asc' | 'desc' }) {
        patchState(store, { filter });
      },
      setFilerQuery(query: string) {
        patchState(store, {
          filteredProducts: query
            ? store
                .products()
                .filter((product) =>
                  product.title.toLowerCase().includes(query.toLowerCase())
                )
            : store.products(),
          filter: { query, order: store.filter.order() },
        });
      },
      bulkImport() {
        return dialogService
          .open(BulkImportProductComponent, {
            id: BulkImportProductComponent.DIALOG_ID,
          })
          .afterClosed()
          .pipe(
            switchMap((productsToImport) =>
              contentService.importProducts(productsToImport)
            ),
            take(1)
          )
          .subscribe();
      },
      loadProducts() {
        patchState(store, { isLoading: true });
        productService
          .getProducts$()
          .pipe(take(1))
          .subscribe((products) => {
            patchState(store, {
              products,
              filteredProducts: products,
              isLoading: false,
              filter: { query: '', order: store.filter.order() },
            });
          });
      },
    };
  }),
  withHooks((store) => {
    const notificationService = inject(NotificationHubService);
    const _snackBar = inject(MatSnackBar);

    return {
      onInit: () => {
        store.loadProducts();

        notificationService.on(
          NotificationHubService.ProductsImportSuccess,
          ({ entityType }) => {
            if (entityType === 'products') {
              store.loadProducts();

              _snackBar.open('Products imported successfully!', 'Ok', {
                horizontalPosition: 'end',
                verticalPosition: 'top',
              });
            }
          }
        );
      },
    };
  })
);
