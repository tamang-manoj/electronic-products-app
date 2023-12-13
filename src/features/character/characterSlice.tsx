import { createSlice } from "@reduxjs/toolkit";

export interface CharInfo {
  email: string;
  role: "admin" | "user";
}

export interface Status {
  isLoggedIn: boolean;
  role: "admin" | "user";
}

export interface CharacterState {
  charArray: CharInfo[];
  status: Status;
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
  status: {
    isLoggedIn:
      localStorage.getItem("persist_login") &&
      JSON.parse(localStorage.getItem("persist_login") as string).isLoggedIn,
    role: "user",
  },
};

export const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharInfo: (state, action) => {
      state.status.isLoggedIn = action.payload?.isLoggedIn;
      state.status.role = action.payload?.role;
    },
  },
});

export const { setCharInfo } = characterSlice.actions;

export default characterSlice.reducer;
