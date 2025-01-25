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
        }
    }
});

export const { setCounter } = counterSlice.actions;

export default counterSlice.reducer;
