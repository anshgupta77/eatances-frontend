import { useSelector } from "react-redux";
import CartCard from "../components/Cards/CartCard";
const CartPage = () => {
    const cartItems = useSelector(state =>state.cart.items);
    console.log(cartItems);
    return ( 
        <div className="p-6 min-h-[80vh]">
            <CartCard cartItems={cartItems} />
        </div>
     );
}
 
export default CartPage;
