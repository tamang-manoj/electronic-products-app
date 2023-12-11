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
import { CartState, updateEditInCart } from "../cart/cartSlice";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface DataState {
  id?: string;
  productName: string;
  productCategory: string;
  imgUrl: string;
  productPrice: string;
  productAvailable: string;
  productImgId: string;
  productDescription: string;
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
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state: any, action) => {
        state.data = action.payload;
        state.isLoading = false;
      })
      .addCase(getProducts.rejected, () => {
        console.log("rejected");
      });

    // builder.addCase(addProduct.pending, (state) => {
    //   state.isLoading = true;
    // });
  },
});

export const getProducts = createAsyncThunk(
  "products/getProducts",
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
    thunkAPI.dispatch(getProducts());
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string, { dispatch }) => {
    await deleteDoc(doc(db, "products", id));
    dispatch(getProducts());
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async (editedProduct: any, thunkAPI) => {
    await updateDoc(doc(db, "products", editedProduct.id), editedProduct);
    thunkAPI.dispatch(getProducts());
    // console.log("edited product is: ", editedProduct);

    const { cartProducts }: any = thunkAPI.getState();
    // console.log(cartProducts);

    const isEditProductInCart = cartProducts.data.find(
      (cartProduct: CartState) => cartProduct.productId === editedProduct.id
    );

    if (isEditProductInCart) {
      // console.log(isEditProductInCart);

      thunkAPI.dispatch(
        updateEditInCart({ isEditProductInCart, editedProduct })
      );
      // console.log("edited product in cart: ", isEditProductInCart);
    }
  }
);

export default productsSlice.reducer;
