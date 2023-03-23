import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { RootState } from "../store";

const initialState : {value: Socket | null} ={
  value: null
}
const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers : {
    setSocket: (state, action) => {
      state.value = action.payload ;
    } 
  } 
});

export const {setSocket} = socketSlice.actions;
export default socketSlice;
export const getSocket = (state: RootState) => {
  return state.socket.value;
}


