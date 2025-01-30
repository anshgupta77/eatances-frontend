import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "user",  
    initialState: {
        items: [],
        loading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = true;
            // console.log("loading", state.loading);
        },
        removeLoading: (state, action) => {
            state.loading = false;
        },
        setUser: (state, action) => {
            // console.log("Setting user", action.payload);
            state.items = action.payload;
        },
        removeUser: (state, action) => {
            const user = action.payload;
            state.items = state.items.filter(item => item._id !== user._id);
        },
        updateUser: (state, action) => {
            const user = action.payload;
            const index = state.items.findIndex(item => item._id === user._id);
            if (index !== -1) {
                state.items[index] = user;
            }
        },
    },
});

export const { setLoading, removeLoading, setUser, removeUser, updateUser } = authSlice.actions;


export const LoadingState = state => state.user.loading;
export default authSlice.reducer;