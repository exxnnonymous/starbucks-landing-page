import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import findTotal from "@/lib/utils/findtotal";
import { HYDRATE } from "next-redux-wrapper";
import cartService from "@/services/cart.services";

export const addtocart = createAsyncThunk(
  "cart/addtocart",
  async ({ products, user_id }) => {
    await cartService.addtocart(products, user_id);
  }
);
export const removefromcart = createAsyncThunk(
  "cart/removefromcart",
  async ({ product_id, user_id }) => {
    await cartService.removefromcart(product_id, user_id);
  }
);
export const emptycart = createAsyncThunk(
  "cart/emptycart",
  async ({ user_id }) => {
    await cartService.emptycart(user_id);
  }
);

const initialState = {
  total: {
    itemsCount: 0,
    price: 0,
  },
  items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let foundItem = state.items.filter(
        (item) => item._id === action.payload._id
      );
      if (foundItem.length === 0) {
        state.items = [...state.items, action.payload];
      } else {
        let objIndex = state.items.findIndex(
          (item) => item._id === action.payload._id
        );
        state.items[objIndex].count += 1;
      }
      state.total = findTotal(state.items);

      localStorage.setItem("cart-items", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      let foundItem = state.items.filter((item) => item._id === action.payload);
      if (foundItem.length === 0) return;
      if (foundItem.length === 1) {
        let objIndex = state.items.findIndex(
          (item) => item._id === action.payload
        );
        if (state.items[objIndex].count > 1) {
          state.items[objIndex].count -= 1;
        } else {
          state.items = state.items.filter(
            (item) => item._id !== action.payload
          );
        }
      }
      state.total = findTotal(state.items);
      localStorage.setItem("cart-items", JSON.stringify(state.items));
    },
    setCart: (state, action) => {
      let items = action.payload;
      if (items) {
        state.items = items;
        state.total = findTotal(state.items);
        if(localStorage){
          localStorage.setItem("cart-items", JSON.stringify(state.items));
        }
      }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.cart,
      }
    },
  },
});

export const { addToCart, removeFromCart, setCart } = cartSlice.actions;

export const totalInCart = (state) => {
  if (state.cart) {
    return state.cart.total;
  }
  return null;
};

export const cartItems = (state) => {
  if (state.cart) {
    return state.cart.items;
  }
  return null;
};

export default cartSlice.reducer;
