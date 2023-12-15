import { createSlice } from "@reduxjs/toolkit";

export interface PromocodeType {
  promocode: string;
  discount: number;
}

const initialState: PromocodeType[] = [
  {
    promocode: "discount20",
    discount: 20,
  },
  {
    promocode: "discount50",
    discount: 50,
  },
  {
    promocode: "discount100",
    discount: 100,
  },
];

export const promocodeSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
});

export const {} = promocodeSlice.actions;

export default promocodeSlice.reducer;
