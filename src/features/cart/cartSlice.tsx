import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export interface CartState {
  cartItemId: string;
  productImgId: string;
  productName: string;
  productCategory: string;
  imgUrl: string;
  productPrice: string;
  productAvailable: string;
}

interface InitialState {
  data: CartState[];
}

const initialState: InitialState = {
  data: [],
};

export const cartSlice = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initialCartData.fulfilled, (state: any, action) => {
      state.data = action.payload;
    });
  },
});

export const initialCartData = createAsyncThunk(
  "cartProducts/initialCartData",
  async () => {
    const querySnapshot = await getDocs(
      collection(db, "cartProductsCollection")
    );

    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      cartItemId: doc.id,
    }));
    // console.log(newData);
    return newData;
  }
);

export const addToCart: any = createAsyncThunk(
  "cartProducts/addToCart",
  async (productToAddToCart: any, thunkAPI) => {
    await setDoc(
      doc(db, "cartProductsCollection", productToAddToCart.productImgId),
      productToAddToCart
    );
    thunkAPI.dispatch(initialCartData());
  }
);

// export const deleteFromCart: any = createAsyncThunk(
//   "cartProducts/deleteFromCart",
//   async (id: any, { dispatch }) => {
//     await deleteDoc(doc(db, "cartProductsCollection", id));
//     dispatch(initialCartData());
//   }
// );

export default cartSlice.reducer;
