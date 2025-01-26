import{createSlice} from '@reduxjs/toolkit';
const cartSlice = createSlice({
    name:"cart",
    initialState:{
        items:[{dish:{
            "_id": "6794cb7b4bfad619c32af4dc",
            "name": "Paneer Tikka",
            "price": 200,
            "description": "Cubes of paneer marinated with spices and grilled to perfection.",
            "image": "https://example.com/paneer-tikka.jpg",
            "inStock": true,
            "category": "veg",
    }}],
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

        }
    },
});

export const {setCart, emptyCart , addToCart} = cartSlice.actions;

export default cartSlice.reducer;