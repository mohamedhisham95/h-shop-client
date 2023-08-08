import { createSlice } from "@reduxjs/toolkit";

interface State {
  shipping_address: {
    address: string;
    city: string;
    postal_code: string;
  };
}

const initialState: State = {
  shipping_address: {
    address: "",
    city: "",
    postal_code: "",
  },
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setShippingAddress: (state, action) => {
      state.shipping_address = action.payload;
    },
  },
});

export const { setShippingAddress } = checkoutSlice.actions;

export default checkoutSlice.reducer;
