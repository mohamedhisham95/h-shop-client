import { createSlice } from "@reduxjs/toolkit";

interface State {
  cart_items: any;
}

const initialState: State = {
  cart_items: [],
};

let cartItemsFromStorage: any;

if (localStorage?.getItem("h-shop-cart")) {
  cartItemsFromStorage = JSON?.parse(
    localStorage?.getItem("h-shop-cart") ?? "{}"
  );
} else {
  cartItemsFromStorage = [];
}

initialState.cart_items = cartItemsFromStorage;

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartAddItem: (state, action) => {
      const item = action.payload;

      localStorage.removeItem("h-shop-cart");

      const existItem = state.cart_items.find((x: any) => x === item);

      if (existItem) {
        return {
          ...state,
          cart_items: state.cart_items.map((x: any) =>
            x === existItem ? item : x
          ),
        };
      } else {
        localStorage.setItem(
          "h-shop-cart",
          JSON.stringify([...state.cart_items, item])
        );

        return {
          ...state,
          cart_items: [...state.cart_items, item],
        };
      }
    },
    cartRemoveItem: (state, action) => {
      let updatedState = state.cart_items.filter(
        (x: any) => x !== action.payload
      );

      localStorage.setItem("h-shop-cart", JSON.stringify(updatedState));

      return {
        ...state,
        cart_items: state.cart_items.filter((x: any) => x !== action.payload),
      };
    },
    clearCart: (state) => {
      state.cart_items = [];
    },
  },
});

export const { cartAddItem, cartRemoveItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
