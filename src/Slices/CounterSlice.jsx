import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
    name: "counter",
    initialState: {
        counters: [],
        loading: true,
    },
    reducers: {
        setCounter:(state , action) =>{
            state.counters = action.payload;
            state.loading = false;
        }
    }
});

export const { setCounter } = counterSlice.actions;

export default counterSlice.reducer;
