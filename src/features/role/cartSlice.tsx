import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface CartState {
  id: any;
  productName: string;
  productCategory: string;
  imgFile: string;
  productPrice: string;
  productAvailable: string;
}

const initialState: CartState[] = [
  //   {
  //     id: uuidv4(),
  //     productName: "VR Headset",
  //     productCategory: "Wearable",
  //     imgFile:
  //       "https://images.pexels.com/photos/3831136/pexels-photo-3831136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     productPrice: "8000",
  //     productAvailable: "10",
  //   },
];

export const cartSlice = createSlice({
  name: "cartProducts",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      //   console.log(action.payload);
      state.push(action.payload);
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
