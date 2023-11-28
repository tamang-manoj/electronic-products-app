import { createSlice } from "@reduxjs/toolkit";
// import { act } from "react-dom/test-utils";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface RoleState {
  role: string;
  loggedIn: boolean;
}

const initialState: RoleState = {
  role: "user",
  loggedIn: false,
};

export const roleSlice = createSlice({
  name: "roleStatus",
  initialState,
  reducers: {
    selectedRole: (state, action) => {
      state.role = action.payload.role;
      state.loggedIn = action.payload.loggedIn;
      // console.log(action.payload);
    },
  },
});

export const { selectedRole } = roleSlice.actions;

export default roleSlice.reducer;
