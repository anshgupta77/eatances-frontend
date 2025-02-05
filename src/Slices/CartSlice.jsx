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
            // console.log("cart slice",state.items);
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

export const totalPrice = (state) =>state.cart.items.reduce((acc, element) =>{
    if(element.dish)
        return acc + element.dish.price * element.quantity;
    return acc;
}, 0);

export const ValidationOfCart = (state) =>state.cart.items.reduce((acc, element) =>{
    if(!element.dish)
        return acc && false;
    return acc;
}, true);

export default cartSlice.reducer;