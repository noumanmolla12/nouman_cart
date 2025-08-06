// features/products/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  products: [],
  searchTerm: '',
  status: 'idle', // idle | loading | succeeded | failed
  error: null,
};

// Async thunk for fetching products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('https://nouman-cart.onrender.com/admin-product/all');
  return response.data;
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setSearchTerm } = productsSlice.actions;
export default productsSlice.reducer;


