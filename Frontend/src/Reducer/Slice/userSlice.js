import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState:{
        token: localStorage.getItem("token") ? localStorage.getItem("token") : null, 
        userData: null,
        currentUser : localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
        loading:false,
    },
    reducers:{
        setCurrentUserDetails(state, action){
            state.currentUser = action.payload;
        },
        setUserDetails(state,action){
            console.log(action.payload);
            state.userData=action.payload;
        },
        setToken(state, action){
            state.token = action.payload;
        },
        setLoading(state,action){
            state.loading = action.payload;
        },
    }
});

export const {setCurrentUserDetails, setUserDetails, setToken, setLoading} =  userSlice.actions;
export default userSlice.reducer;