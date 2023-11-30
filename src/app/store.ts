import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "../features/product/productsSlice";
import cartSlice from "../features/role/cartSlice";
import characterSlice from "../features/role/characterSlice";

export const store = configureStore({
  reducer: {
    products: productsSlice,
    cartProducts: cartSlice,
    characters: characterSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
