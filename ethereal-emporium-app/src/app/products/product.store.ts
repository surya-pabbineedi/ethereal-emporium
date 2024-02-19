import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Product } from '../models/product';

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
  withHooks({
    onInit: (store) => {
      console.log('ProductStore initialized with store:', store);
    },
    onDestroy({ products }) {
      console.log('count on destroy', products());
    },
  }),
  withMethods((store) => {
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
    };
  })
);
