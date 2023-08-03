import { createSlice } from "@reduxjs/toolkit";

interface State {
  checkout_items: any;
}

const initialState: State = {
  checkout_items: [],
};

const cartCheckoutSlice = createSlice({
  name: "cart-checkout",
  initialState,
  reducers: {
    checkoutItems: (state, action) => {
      let initialQunatity = action.payload.map((items: any, index: number) => {
        if (action.payload[index].countInStock === 0) {
          return { ...items, quantity: 0 };
        } else {
          return { ...items, quantity: 1 };
        }
      });

      state.checkout_items = initialQunatity;
    },
    setIncreaseQty: (state, action) => {},
    setDecreaseQty: (state, action) => {},
  },
});

export const { checkoutItems, setIncreaseQty, setDecreaseQty } =
  cartCheckoutSlice.actions;

export default cartCheckoutSlice.reducer;
