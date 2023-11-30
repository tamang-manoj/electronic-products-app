import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface DataState {
  id: any;
  productName: string;
  productCategory: string;

  imgUrl: string;
  productPrice: string;
  productAvailable: string;
  productImgId: string;
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
    builder
      .addCase(initialData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(initialData.fulfilled, (state: any, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(initialData.rejected, (state: any, action) => {
        console.log("rejected");
      });
  },
});

export const initialData = createAsyncThunk(
  "products/initialData",
  async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return newData;
  }
);

export const addProduct: any = createAsyncThunk(
  "products/addProduct",
  async (newProduct: DataState, thunkAPI) => {
    await addDoc(collection(db, "products"), newProduct);
    thunkAPI.dispatch(initialData());
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: any, { dispatch }) => {
    await deleteDoc(doc(db, "products", id));
    dispatch(initialData());
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (editedProduct: any, thunkAPI) => {
    await updateDoc(doc(db, "products", editedProduct.id), editedProduct);
    thunkAPI.dispatch(initialData());
  }
);

export default productsSlice.reducer;
