import { createSlice } from "@reduxjs/toolkit";

const dishSlice = createSlice({
    name: "dish",
    initialState: {
        items: [],
        // loading: true,
    },
    reducers: {
        setDish:(state , action) =>{
            state.items = action.payload;
            console.log(state.items);
        },
        updateDish: (state, action) => {
            const {updatedDish, id} = action.payload;
            const index = state.items.findIndex((dish) => dish._id === id);
            state.items[index] = updatedDish;
        },
    }
});

export const { setDish , updateDish} = dishSlice.actions;

export default dishSlice.reducer;