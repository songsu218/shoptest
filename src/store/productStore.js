/** @format */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getProductList = createAsyncThunk('products/getPgetProductList', async (category) => {
  let url = ` https://my-json-server.typicode.com/songsu218/shoptest/products`;
  if (category) {
    url += `?category=${category}`;
  }
  let respons = await fetch(url);
  let data = await respons.json();
  return data;
});

let products = createSlice({
  name: 'products',
  initialState: {
    name: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    loadData: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.pending, (state) => {
        state.status = 'loading';
      }) ///
      .addCase(getProductList.fulfilled, (state, action) => {
        state.status = 'sucess';
        state.products = action.payload;
      }) ///
      .addCase(getProductList.rejected, (state, action) => {
        state.status = 'faild';
        state.error = action.error.message;
      });
  },
});

export const { extraReducers } = products.actions;
export default products;
