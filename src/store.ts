import { configureStore } from "@reduxjs/toolkit";

// Slice
import userReducer from "redux/userSlice";
import cartReducer from "redux/cartSlice";
import cartCheckoutSlice from "redux/cartCheckoutSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    cartCheckout: cartCheckoutSlice,
  },
});

export default store;
