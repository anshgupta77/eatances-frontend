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
        setLoading:(state,action) =>{
            state.loading = true;
        },
        removeLoading:(state,action) =>{
            state.loading = false;
        }
    },
});

export const {setCart, emptyCart , addToCart, setLoading, removeLoading} = cartSlice.actions;

export default cartSlice.reducer;