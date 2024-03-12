import { createAsyncThunk } from '@reduxjs/toolkit';
import { ProductResponse } from '../models/ProductResponse';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const productsResponse = await fetch('https://dummyjson.com/products');

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
