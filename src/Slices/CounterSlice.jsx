import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        items: [],
        loading: true,
    },
    reducers: {
        setCounter:(state , action) =>{
            state.items = action.payload;
            state.loading = false;
        },
        addCounter: (state, action) => {
            console.log("Adding counter", action.payload);
            state.items.push(action.payload);
        },
        updateCounter: (state, action) => {
            const index = state.items.findIndex((counter) => counter._id === action.payload._id);
            if(index !== -1){
                state.items[index] = action.payload;
            }
        },
        deleteCounter: (state, action) => {
            console.log("Deleting counter", action.payload);
            state.items = state.items.filter(item => item._id !== action.payload._id);
        }
    }
});

export const { setCounter, addCounter, updateCounter , deleteCounter} = counterSlice.actions;

export default counterSlice.reducer;
