import { createSlice } from "@reduxjs/toolkit";
const authSlice = createSlice({
    name: "auth",  
    initialState: {
        user: null,
        loading: false,
    },
    reducers: {
        setLoading: (state, action) => {
            state.loading = true;
        },
        removeLoading: (state, action) => {
            state.loading = false;
        },
    },
});

export const { setLoading, removeLoading } = authSlice.actions;

export default authSlice.reducer;