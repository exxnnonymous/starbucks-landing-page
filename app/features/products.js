import {  createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const productSlice = createSlice({
  name: "products",
  initialState: {
    items: null,
    activeItem: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setActiveDrink: (state, action) => {
      state.activeItem = action.payload;
    }
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.products,
      };
    },
  },
});

export const { setProducts, setActiveDrink } = productSlice.actions;
export const selectProducts = (state) => {
  
  if (state.products) {
    return state.products.items;
  } else {
    return null;
  }
};
export const selectActiveDrink = (state) => {
  if (state.products) {
    return  state.products.activeItem;
  } else {
    return null;
  }
};

export default productSlice.reducer;
