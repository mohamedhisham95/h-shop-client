import { createSlice } from "@reduxjs/toolkit";

interface State {
  theme: string | null;
}

const initialState: State = {
  theme: "dark",
};

if (localStorage.getItem("h-shop-theme")) {
  initialState.theme = localStorage.getItem("h-shop-theme");
}

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
  },
});

export const { setTheme } = commonSlice.actions;

export default commonSlice.reducer;
