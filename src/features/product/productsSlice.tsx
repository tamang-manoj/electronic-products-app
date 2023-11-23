import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProductState {
  id: any;
  productName: string;
  productCategory: string;
  imgFile: string;
  productPrice: string;
  productAvailable: string;
}

const initialState: ProductState[] = [
  {
    id: uuidv4(),
    productName: "VR Headset",
    productCategory: "Wearable",
    imgFile:
      "https://images.pexels.com/photos/3831136/pexels-photo-3831136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productPrice: "8000",
    productAvailable: "10",
  },
  {
    id: uuidv4(),
    productName: "Motherboard",
    productCategory: "Computer Accessories",
    imgFile:
      "https://images.pexels.com/photos/163073/raspberry-pi-computer-linux-163073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productPrice: "10000",
    productAvailable: "20",
  },
  {
    id: uuidv4(),
    productName: "VR Headset",
    productCategory: "Wearable",
    imgFile:
      "https://images.pexels.com/photos/3831136/pexels-photo-3831136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productPrice: "8000",
    productAvailable: "10",
  },
  {
    id: uuidv4(),
    productName: "Motherboard",
    productCategory: "Computer Accessories",
    imgFile:
      "https://images.pexels.com/photos/163073/raspberry-pi-computer-linux-163073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productPrice: "10000",
    productAvailable: "20",
  },
  {
    id: uuidv4(),
    productName: "VR Headset",
    productCategory: "Wearable",
    imgFile:
      "https://images.pexels.com/photos/3831136/pexels-photo-3831136.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productPrice: "8000",
    productAvailable: "10",
  },
];

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },

    addProduct: (state, action) => {
      state.push(action.payload);
    },

    editProduct: (state, action) => {
      const {
        editId,
        productName,
        productCategory,
        imgFile,
        productPrice,
        productAvailable,
      } = action.payload;

      const editingProduct: any = state.find(
        (product) => product.id === editId
      );
      editingProduct.productName = productName;
      editingProduct.productCategory = productCategory;
      editingProduct.imgFile = imgFile;
      editingProduct.productPrice = productPrice;
      editingProduct.productAvailable = productAvailable;
    },

    deleteProduct: (state, action) => {
      const filteredProducts = state.filter(
        (product) => product.id !== action.payload.id
      );
      console.log(action.payload.id);
      return filteredProducts;
    },
  },
});

export const { addProduct, editProduct, deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;
