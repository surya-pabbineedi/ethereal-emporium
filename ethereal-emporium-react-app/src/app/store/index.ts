import { createSlice, configureStore } from '@reduxjs/toolkit';
import productSlice, { ProductState } from './product.slice';

export interface RootState {
  products: ProductState;
  auth: AppState;
}

interface AppState {
  isAuthenticated: boolean;
}

const initialState: AppState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type AppStoreDispatch = typeof store.dispatch;
export default store;
