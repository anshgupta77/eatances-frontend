import { createSlice } from "@reduxjs/toolkit";

const dishSlice = createSlice({
    name: "dish",
    initialState: {
        dishes: [],
        loading: true,
    },
    reducers: {
        setDish:(state , action) =>{
            state.dishes = action.payload;
            state.loading = false;
        }
    }
});

export const { setDish } = dishSlice.actions;

export default dishSlice.reducer;