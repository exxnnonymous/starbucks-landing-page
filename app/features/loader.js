import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

export const loaderSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    startLoading: (state) => {
        if(!state.loading){
            state.loading = true;
        }
    },
    closeLoading: (state) => {
        if(state.loading){
            state.loading = false;
        }
    },
  },
});


export const { startLoading, closeLoading } = loaderSlice.actions;
export default loaderSlice.reducer;