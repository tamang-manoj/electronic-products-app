import { createSlice } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface RoleState {
  role: string;
}

const initialState: RoleState = {
  role: "user",
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    selectedRole: (state, action) => {
      state.role = action.payload;
      console.log(action.payload);
    },
  },
});

export const { selectedRole } = roleSlice.actions;

export default roleSlice.reducer;
