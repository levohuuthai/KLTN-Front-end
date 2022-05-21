import userReducer from "../features/Auth/components/Login/userSlice";
import cartReducer from "../features/Cart/cartSlice";

import { configureStore } from "@reduxjs/toolkit";
// import { getDefaultMiddleware } from "@reduxjs/toolkit";

const rootReducer = {
  user: userReducer,
  cart: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (
    getDefaultMiddleware //khỏi bị lỗi anon serializeable
  ) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
