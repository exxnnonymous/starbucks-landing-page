import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "@/services/auth.services";
import { setMessage } from "./message";
import { HYDRATE } from "next-redux-wrapper";
import { setCart } from "./cart";
import buyproduct from "@/lib/updateUserProducts"

export const register = createAsyncThunk(
  "user/register",
  async ({ name, email, password, itemsInCart }, thunkAPI) => {
    try {
      const response = await AuthService.register(
        name,
        email,
        password,
        itemsInCart
      );
      thunkAPI.dispatch(
        setMessage({
          title: "Success",
          desc: "You have successfully created account",
        })
      );
      thunkAPI.dispatch(setCart(response.user.cart.items))
      return response.user;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password, itemsInCart }, thunkAPI) => {
    try {
      const response = await AuthService.login(email, password, itemsInCart);
      thunkAPI.dispatch(
        setMessage({
          title: "Success",
          desc: "You have logged in successfully",
        })
      );
      thunkAPI.dispatch(setCart(response.user.cart.items))
      return response.user;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk(
  "user/logout",
  async ({},thunkAPI) => {{

      await AuthService.logout();
      thunkAPI.dispatch(setCart([]))
  
  
  }
  }
);

export const updateProduct = createAsyncThunk(
  "user/updateProduct",
  async({boughtProducts,user_id})=>{
    const res =  await buyproduct(boughtProducts,user_id);

    return res
  }
)

const initialState = {
  user: null,
  isLoggedIn: false,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.isLoggedIn = action.payload.auth;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
        return {
          ...state,
          ...action.payload.user,
        };
      
    },
    [register.pending]: (state, action) => {
      state.isLoggedIn = false;
      state.loading = true;
      state.error = false;
    },
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.loading = false;
      state.user = action.payload;
      state.error = false;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = true;
    },
    [login.pending]: (state, action) => {
      state.isLoggedIn = false;
      state.loading = true;
      state.error = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.loading = false;
      state.user = action.payload;
      state.error = false;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.loading = false;
      state.user = null;
      state.error = true;
    },
    [logout.pending]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [updateProduct.fulfilled]: (state, action) => {
      state.user.products = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
