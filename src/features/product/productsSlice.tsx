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
    productCategory: "Computer",
    imgFile:
      "https://images.pexels.com/photos/163073/raspberry-pi-computer-linux-163073.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    productPrice: "10000",
    productAvailable: "20",
  },
  {
    id: uuidv4(),
    productName: "Pebble Duet Pro PTWE02 Wireless Earpods",
    productCategory: "Audio",
    imgFile:
      "https://img.freepik.com/free-vector/headphones-wireless-realistic-composition-with-isolated-image-phones-with-power-bank-dock-station-with-reflections-vector-illustration_1284-73201.jpg?w=740&t=st=1700749328~exp=1700749928~hmac=a74ecefce4e2f91989bcc6e1258afd242597ad5ab96d579cca6f6f160ae80f28",
    productPrice: "4000",
    productAvailable: "50",
  },
  {
    id: uuidv4(),
    productName: "Headphone",
    productCategory: "Audio",
    imgFile:
      "https://img.freepik.com/free-photo/levitating-music-headphones-display_23-2149817602.jpg?w=360&t=st=1700749489~exp=1700750089~hmac=8267947be925c900e865fed234cfe81ad6fff683ba2d1ac2fab65f363510ceb5",
    productPrice: "10000",
    productAvailable: "75",
  },
  {
    id: uuidv4(),
    productName: "Smartwatch",
    productCategory: "Wearable",
    imgFile:
      "https://img.freepik.com/free-vector/smart-watch-realistic-image-black_1284-11873.jpg?w=740&t=st=1700749720~exp=1700750320~hmac=6eac8b228ae611ab8f3bb1a0c71ea45634e09d453f30e0da9a1902d2e53a075b",
    productPrice: "5000",
    productAvailable: "100",
  },
  {
    id: uuidv4(),
    productName: "Mobile Charger",
    productCategory: "Mobile",
    imgFile:
      "https://img.freepik.com/free-photo/charger-usb-cable-type-c-orange-background_58702-4531.jpg?w=740&t=st=1700749953~exp=1700750553~hmac=48d85d438d9332bbd706c70312d092d52103cb20411bd81b0071a9514a1dbacc",
    productPrice: "1000",
    productAvailable: "200",
  },
  {
    id: uuidv4(),
    productName: "Powerbank",
    productCategory: "Mobile",
    imgFile:
      "https://img.freepik.com/free-photo/power-bank-mobile-phone_155003-4585.jpg?w=740&t=st=1700750137~exp=1700750737~hmac=377108b0e24dd4198e223b81055f81301c8dbdd18a4a85f8f57da661e20ea6c1",
    productPrice: "1000",
    productAvailable: "170",
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
