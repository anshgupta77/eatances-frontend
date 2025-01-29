import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",  
    initialState: {
        items: [],
        loading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = true;
            console.log("loading", state.loading);
        },
        removeLoading: (state, action) => {
            state.loading = false;
        },
        setUser: (state, action) => {
            console.log("Setting user", action.payload);
            state.items = action.payload;
        },
        removeUser: (state, action) => {
            const user = action.payload;
            state.items = state.items.filter(item => item._id !== user._id);
        },
    },
});

export const { setLoading, removeLoading, setUser, removeUser } = authSlice.actions;

export default authSlice.reducer;