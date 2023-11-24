import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../features/product/productsSlice";
import roleSlice from "../features/role/roleSlice";
import cartSlice from "../features/role/cartSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    role: roleSlice,
    cartProducts: cartSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
