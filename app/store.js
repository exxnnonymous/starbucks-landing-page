import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import  cartSlice  from "./features/cart";
import productsSlice from "./features/products";
import  userSlice  from "./features/users";
import  messageSlice  from "./features/message";
import  loaderSlice  from "./features/loader";

const reducer={
    products: productsSlice,
    user:userSlice,
    cart:cartSlice,
    message:messageSlice,
    loader:loaderSlice
}

const store = configureStore({
    reducer,
    devTools: true,
});

const makeStore = () => store
    


export const wrapper = createWrapper(makeStore)