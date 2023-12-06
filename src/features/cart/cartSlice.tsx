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
  count?: number;
}

interface InitialState {
  data: CartState[];
  loading: boolean;
}

const initialState: InitialState = {
  data: [],
  loading: false,
};

export const cartSlice = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCartData.fulfilled, (state: any, action) => {
      state.data = action.payload;
    });

    builder.addCase(updateProductCount.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateProductCount.fulfilled, (state) => {
      state.loading = false;
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
    await addDoc(collection(db, "cartProductsCollection"), {
      ...productToAddToCart,
      count: 1,
    });
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

export const updateProductCount: any = createAsyncThunk(
  "cartProducts/updateProductCount",
  async (
    {
      cartItemId,
      newCount,
    }: {
      cartItemId: string;
      newCount: number;
    },
    thunkAPI
  ) => {
    await updateDoc(doc(db, "cartProductsCollection", cartItemId), {
      count: newCount,
    });
    // console.log(newCount);
    thunkAPI.dispatch(getCartData());
  }
);

export default cartSlice.reducer;
