import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./Slice/userSlice";
import FriendSlice from "./Slice/FriendSlice";

export const store = configureStore({
    reducer:{
        user: userSlice,
        friend : FriendSlice,
    }
});