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
  cartItemId?: string;
  productImgId: string;
  productName: string;
  productCategory: string;
  imgUrl: string;
  productPrice: string;
  productAvailable: string;
  count: number;
  productId?: string;
  productDescription?: string;
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
  reducers: {
    updateDeletedProduct: (state, action) => {
      state.data = state.data.filter(
        (eachData: CartState) => eachData.cartItemId !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartData.fulfilled, (state: any, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(getCartData.pending, (state) => {
        state.loading = true;
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

export const addToCart = createAsyncThunk(
  "cartProducts/addToCart",
  async (productToAddToCart: CartState, thunkAPI) => {
    await addDoc(collection(db, "cartProductsCollection"), {
      ...productToAddToCart,
    });
    thunkAPI.dispatch(getCartData());
  }
);

export const deleteFromCart = createAsyncThunk(
  "cartProducts/deleteFromCart",
  async (id: string) => {
    await deleteDoc(doc(db, "cartProductsCollection", id));
    // dispatch(getCartData());
  }
);

export const updateEditInCart = createAsyncThunk(
  "cartProducts/updateEditInCart",
  async (
    {
      isEditProductInCart,
      editedProduct,
    }: { isEditProductInCart: CartState; editedProduct: CartState },
    thunkAPI
  ) => {
    await updateDoc(
      doc(
        db,
        "cartProductsCollection",
        isEditProductInCart.cartItemId as string
      ),
      editedProduct as any
    );
    // console.log(isEditProductInCart);
    // console.log("updated", editedProduct);
    thunkAPI.dispatch(getCartData());
  }
);

export const updateProductCount = createAsyncThunk(
  "cartProducts/updateProductCount",
  async (
    {
      productAlreadyInCart,
      newCount,
    }: {
      productAlreadyInCart: CartState;
      newCount: number;
    },
    thunkAPI
  ) => {
    await updateDoc(
      doc(
        db,
        "cartProductsCollection",
        productAlreadyInCart.cartItemId as string
      ),
      {
        count: productAlreadyInCart.count + newCount,
      }
    );
    // console.log(newCount);
    //  .dispatch(getCartData());

    // await updateDoc(doc(db, "cartProductsCollection", cartItemId), {
    //   count: newCount,
    // });
    // // console.log(newCount);
    // thunkAPI.dispatch(getCartData());
  }
);

export const { updateDeletedProduct } = cartSlice.actions;
export default cartSlice.reducer;
