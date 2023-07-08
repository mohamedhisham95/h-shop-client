import { configureStore } from "@reduxjs/toolkit";

// Slice
import userReducer from "redux/userSlice";
import commonReducer from "redux/commonSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    common: commonReducer,
  },
});

export default store;
