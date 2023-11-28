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
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface DataState {
  id: any;
  productName: string;
  productCategory: string;

  imgUrl: string;
  productPrice: string;
  productAvailable: string;
  productId: string;
}

export interface ProductState {
  data: DataState[];
  isLoading: boolean;
}

const initialState: ProductState = {
  data: [],
  isLoading: false,
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(initialData.fulfilled, (state: any, action) => {
      state.data = action.payload;
    });

    builder.addCase(addProduct.fulfilled, (state: any, action) => {
      state.data = action.payload;
    });

    builder.addCase(deleteProduct.fulfilled, (state: any, action) => {
      state.data = action.payload;
    });

    builder.addCase(editProduct.fulfilled, (state: any, action) => {
      state.data = action.payload;
    });
  },
});

export const initialData = createAsyncThunk(
  "products/initialData",
  async () => {
    return await getDocs(collection(db, "products")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      // console.log(newData);
      return newData;
    });
  }
);

export const addProduct: any = createAsyncThunk(
  "products/addProduct",
  async (newProduct: DataState, thunkAPI) => {
    await addDoc(collection(db, "products"), newProduct);
    const newData = thunkAPI.dispatch(initialData()).unwrap();
    return newData;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: any, { dispatch }) => {
    await deleteDoc(doc(db, "products", id));
    const newData = dispatch(initialData()).unwrap();
    return newData;
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (editedProduct: any, thunkAPI) => {
    await updateDoc(doc(db, "products", editedProduct.id), editedProduct);
    const newData = await thunkAPI.dispatch(initialData()).unwrap();
    console.log(editedProduct);
    return newData;
  }
);

export default productsSlice.reducer;
