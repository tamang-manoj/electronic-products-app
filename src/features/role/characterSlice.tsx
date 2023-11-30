import { createSlice } from "@reduxjs/toolkit";

export interface CharInfo {
  email: string;
  role: "admin" | "user";
}
export interface CharacterState {
  charArray: CharInfo[];
  loggedIn: boolean;
  loggedInRole: "admin" | "user";
}

const initialState: CharacterState = {
  charArray: [
    {
      email: "user@gmail.com",
      role: "user",
    },
    {
      email: "admin@gmail.com",
      role: "admin",
    },
  ],
  loggedIn: false,
  loggedInRole: "user",
};

export const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    charToSelect: (state, action) => {
      state.charArray = state.charArray;
      state.loggedIn = action.payload.loggedIn;
      state.loggedInRole = action.payload.loggedInRole;
    },
  },
});

export const { charToSelect } = characterSlice.actions;

export default characterSlice.reducer;
