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
    updateQuantity: (state, action) => {
      let updatedCart = state.checkout_items.map((cartItem: any) => {
        if (cartItem._id === action.payload.id) {
          return { ...cartItem, quantity: action.payload.qty };
        }
        return cartItem;
      });
      return { ...state, checkout_items: updatedCart };
    },
    checkoutCartRemoveItem: (state, action) => {
      return {
        ...state,
        checkout_items: state.checkout_items.filter(
          (x: any) => x._id !== action.payload
        ),
      };
    },
    checkoutCartClear: (state) => {
      state.checkout_items = [];
    },
  },
});

export const {
  checkoutItems,
  updateQuantity,
  checkoutCartRemoveItem,
  checkoutCartClear,
} = cartCheckoutSlice.actions;

export default cartCheckoutSlice.reducer;
