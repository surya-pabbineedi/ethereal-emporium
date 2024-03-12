import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts } from './product.actions';

export interface ProductState {
  products: any[];
  loading: boolean;
  error?: any;
}

const initialState: ProductState = {
  products: [],
  loading: false,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProducts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.payload;
    });
  },
});

export const productActions = productSlice.actions;

// export const loadProductsAction = () => {
//   return async (dispatch: Function) => {
//     const productsAsync = async () => {
//       const productsResponse: ProductResponse = await (
//         await fetch('https://dummyjson.com/products')
//       ).json();
//       return productsResponse.products;
//     };

//     try {
//       const products = await productsAsync();
//       dispatch(productActions.setProducts(products));
//     } catch (error) {
//       console.error('Error loading products', error);
//     }
//   };
// };

export default productSlice;
