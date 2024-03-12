import { createAsyncThunk } from '@reduxjs/toolkit';
import { Product, ProductResponse } from '../models/ProductResponse';

export const fetchProducts = createAsyncThunk<Product[], string>(
  'products/fetchProducts',
  async (query, { rejectWithValue }) => {
    try {
      const productsResponse = await fetch(
        query
          ? `https://dummyjson.com/products/search?q=${query}`
          : 'https://dummyjson.com/products'
      );

      if (!productsResponse.ok) {
        return rejectWithValue(productsResponse.statusText);
      }

      const productsResponseData: ProductResponse =
        await productsResponse.json();
      return productsResponseData.products;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
