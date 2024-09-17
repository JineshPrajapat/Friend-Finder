import { createSlice } from "@reduxjs/toolkit";
import AllUsers from "../../Pages/AllUsers";

const friendSlice = createSlice({
    name : 'friend',
    initialState : {
        allUsers : [],
        friends : [],
        requestRecieved : [],
        requestSent: [],
        mutualFriends : [],
        allInterest:[]
    },

    reducers:{
        setAllUsers(state, action){
            state.allUsers = action.payload;
        },
        setFriends(state, action){
            state.friends = action.payload;
        },
        setRequestRecieved(state, action){
            state.requestRecieved = action.payload;
        },
        setRequestSent(state, action){
            state.requestSent = action.payload;
        },
        setMutualFriends(state, action){
            state.mutualFriends = action.payload;
        },
        setAllInterest(state, action){
            state.allInterest = action.payload;
        }

        
    }
});

export const {setAllUsers, setFriends, setRequestRecieved, setRequestSent, setMutualFriends, setAllInterest} = friendSlice.actions;
export default friendSlice.reducer;