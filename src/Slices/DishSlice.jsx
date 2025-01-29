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
        addDish: (state, action) => {
            console.log("Adding dish", action.payload);
            state.items.push(action.payload);
        },
        removeDish: (state, action) => {
            const dish = action.payload;
            state.items = state.items.filter(item => item._id !== dish._id);
        }

    }
});

export const { setDish , updateDish, addDish, removeDish} = dishSlice.actions;

export default dishSlice.reducer;