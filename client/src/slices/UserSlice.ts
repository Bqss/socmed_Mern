import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { User } from "../types/payload";

const initialState : {crediental : Partial<User>} = {
  crediental : {

  }
};

const userSlice = createSlice({
  name: "user ",
  initialState,
  reducers: {
    setUser: (state, {payload}: {payload : Partial<User>}) => {
      state.crediental = { ...payload };
    },

    resetUser: (state, action) => {
      state.crediental = {
      };
    },
  },
});

export const getUserState = (state: RootState) => state.user;

export const { setUser, resetUser } = userSlice.actions;
export default userSlice;
