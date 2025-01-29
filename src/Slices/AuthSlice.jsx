import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        items: {},
    },
    reducers: {
        setCurrentUser: (state, action) => {
            state.items = action.payload;
        },
        removeCurrentUser: (state) => {
            state.items = {};
        },
    },
});

export const { setCurrentUser, removeCurrentUser } = authSlice.actions;


export default authSlice.reducer;