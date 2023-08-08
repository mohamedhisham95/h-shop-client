import { configureStore } from "@reduxjs/toolkit";

// Slice
import userReducer from "redux/userSlice";
import cartReducer from "redux/cartSlice";
import cartCheckoutSlice from "redux/cartCheckoutSlice";
import checkoutSlice from "redux/checkoutSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    cartCheckout: cartCheckoutSlice,
    checkout: checkoutSlice,
  },
});

export default store;
