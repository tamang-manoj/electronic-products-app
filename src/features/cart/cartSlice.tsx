import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
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
    builder.addCase(getCartData.fulfilled, (state: any, action) => {
      state.data = action.payload;
    });
  },
});

export const getCartData = createAsyncThunk(
  "cartProducts/getCartData",
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
    thunkAPI.dispatch(getCartData());
  }
);

export const deleteFromCart: any = createAsyncThunk(
  "cartProducts/deleteFromCart",
  async (id: any, { dispatch }) => {
    await deleteDoc(doc(db, "cartProductsCollection", id));
    dispatch(getCartData());
  }
);

export const updateEditInCart = createAsyncThunk(
  "cartProducts/updateEditInCart",
  async ({ isEditProductInCart, editedProduct }: any, thunkAPI) => {
    await updateDoc(
      doc(db, "cartProductsCollection", isEditProductInCart.cartItemId),
      editedProduct
    );
    // console.log(isEditProductInCart);
    // console.log("updated", editedProduct);
    thunkAPI.dispatch(getCartData());
  }
);

export default cartSlice.reducer;
