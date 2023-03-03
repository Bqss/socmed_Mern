import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getUserById, getUserCrediental } from "../api/User";


const initialState  = {
  value: {}
}

const userSlice = createSlice({
  name : "user ",
  initialState,
  reducers: {
    setUser : (state, action) => {
      const {user} = action.payload;
 
      state.value = {...user};
    },

    resetUser : (state, action) => {
      state.value = {}
    } 
  }
})

export const {  setUser, resetUser } = userSlice.actions;
export default userSlice;
