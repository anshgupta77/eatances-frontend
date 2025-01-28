import{createSlice} from '@reduxjs/toolkit';
const cartSlice = createSlice({
    name:"cart",
    initialState:{
        items:[],
        loading: false,
    },
    reducers: {
        setCart:(state , action) =>{
            state.items = action.payload;
            console.log(state.items);
        },
        emptyCart:(state , action) =>{
            state.items = [];
        },
        addToCart:(state,action) => {
            const dish = action.payload;
            // console.log(dish);
            state.items.push({...dish , quantity: 1});
            console.log(state.items);

        },
    },
});

export const {setCart, emptyCart , addToCart} = cartSlice.actions;

export default cartSlice.reducer;