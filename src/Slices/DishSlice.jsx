import { createSlice } from "@reduxjs/toolkit";

const dishSlice = createSlice({
    name: "dish",
    initialState: {
        items: [],
        loading: true,
    },
    reducers: {
        setDish:(state , action) =>{
            state.items = action.payload;
            state.loading = false;
        }
    }
});

export const { setDish } = dishSlice.actions;

export default dishSlice.reducer;