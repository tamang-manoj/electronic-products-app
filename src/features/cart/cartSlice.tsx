import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
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
    await addDoc(collection(db, "cartProductsCollection"), productToAddToCart);
    thunkAPI.dispatch(initialCartData()).unwrap();
    // console.log(productToAddToCart);
  }
);

export const deleteFromCart: any = createAsyncThunk(
  "cartProducts/deleteFromCart",
  async (id: any, { dispatch }) => {
    await deleteDoc(doc(db, "cartProductsCollection", id));
    dispatch(initialCartData()).unwrap();
  }
);

export default cartSlice.reducer;
