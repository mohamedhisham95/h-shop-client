import { createSlice } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

interface State {
  user_detail: any;
  token: string | null;
}

const initialState: State = {
  user_detail: null,
  token: null,
};

if (localStorage.getItem("h-shop-token")) {
  const decodedToken: any = jwtDecode(
    localStorage.getItem("h-shop-token") || ""
  );

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("h-shop-token");
  } else {
    initialState.user_detail = decodedToken;
    initialState.token = localStorage.getItem("h-shop-token");
  }
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetail: (state, action) => {
      state.user_detail = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLogout: (state) => {
      localStorage.removeItem("h-shop-token");
      state.user_detail = null;
      state.token = null;
    },
  },
});

export const { setUserDetail, setToken, setLogout } = userSlice.actions;

export default userSlice.reducer;
