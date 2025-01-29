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
        }
    }
});

export const { setCounter, addCounter } = counterSlice.actions;

export default counterSlice.reducer;
