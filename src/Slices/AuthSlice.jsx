import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: {},
        loading: true,
    },
    reducers: {
        setCurrentUser: (state, action) => {
            // console.log("Setting user", action.payload);
            state.currentUser = action.payload;
        },
        removeCurrentUser: (state) => {
            state.currentUser = {};
        }
    },
});

export const { setCurrentUser, removeCurrentUser } = authSlice.actions;


export default authSlice.reducer;