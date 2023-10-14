import { createSlice } from "@reduxjs/toolkit";

interface State {
  shipping_address: {
    address: string;
    city: string;
    postal_code: string;
  };
  payment_method: string;
}

const initialState: State = {
  shipping_address: {
    address: "",
    city: "",
    postal_code: "",
  },
  payment_method: "Stripe",
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setShippingAddress: (state, action) => {
      state.shipping_address = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.payment_method = action.payload;
    },
  },
});

export const { setShippingAddress, setPaymentMethod } = checkoutSlice.actions;

export default checkoutSlice.reducer;
