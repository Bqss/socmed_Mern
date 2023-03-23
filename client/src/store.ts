import { configureStore } from "@reduxjs/toolkit";
import socketSlice from "./slices/socketSlice";
import userSlice from "./slices/UserSlice";

const store = configureStore({
  reducer : {
    user: userSlice.reducer,
    socket : socketSlice.reducer
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck : false
    })
  },
}) 


export type RootState= ReturnType<typeof store.getState>


export default store ;