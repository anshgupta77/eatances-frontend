import{createSlice} from '@reduxjs/toolkit';
const cartSlice = createSlice({
    name:"cart",
    initialState:{
        items:[],
    },
    reducers: {
        setCart:(state , action) =>{
            state.items = action.payload;
        },
        emptyCart:(state , action) =>{
            state.items = [];
        },
        addToCart:(state,action) => {
            const dish = action.payload;
            state.items.push(...dish , quantity = 1);
        }
    },
});

export const {setCart, emptyCart , addToCart} = cartSlice.actions;

export default cartSlice.reducer;