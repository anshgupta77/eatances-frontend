import { useState } from 'react';
import { ShoppingCart, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeCurrentUser } from "../Slices/AuthSlice";
import { ROLE } from "../constraint";

const NewNavbar = ({token, setToken}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cartItems = useSelector(state => state.cart.items);
    const user = useSelector(state => state.auth.currentUser);
    
    // console.log("User from the auth",token);
    console.log("User from the auth",user);
    const cartItemsCount = cartItems.length;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleLogout() {
        dispatch(removeCurrentUser());
        localStorage.removeItem("token");
        localStorage.removeItem("refresh-token");
        setToken(null);
        navigate("/");
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="shadow-md sticky top-0 z-50 bg-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/">
                        <div className="text-3xl font-bold text-blue-950 font-serif hover:text-[#228B22]">
                            eatances
                            <span className="text-[#228B22] inline-flex align-baseline" style={{ fontSize: '1.5rem', marginLeft: '0.1rem' }}>
                                •
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex space-x-6 text-blue-950 font-serif font-bold">
                        <div className="relative hover:text-[#0a830a] cursor-pointer group">
                            <Link to="/">Home</Link>
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#0a830a] rounded-full opacity-0 group-hover:opacity-100 mt-1"></div>
                        </div>
                        <div className="relative hover:text-[#0a830a] cursor-pointer group">
                            <Link to="/profile">Profile</Link>
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#0a830a] rounded-full opacity-0 group-hover:opacity-100 mt-1"></div>
                        </div>
                        {user && user.role === ROLE.Admin && (
                            <div className="relative hover:text-[#0a830a] cursor-pointer group">
                                <Link to="/admin">Admin Panel</Link>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#0a830a] rounded-full opacity-0 group-hover:opacity-100 mt-1"></div>
                            </div>
                        )}
                        <div className="relative hover:text-[#0a830a] cursor-pointer group">
                            <Link to="/dish">Dishes</Link>
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#0a830a] rounded-full opacity-0 group-hover:opacity-100 mt-1"></div>
                        </div>
                        {user && user.email && <div className="relative hover:text-[#0a830a] cursor-pointer group">
                            <Link to="/counter">Counter</Link>
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#0a830a] rounded-full opacity-0 group-hover:opacity-100 mt-1"></div>
                        </div>}
                        {user && user.role === ROLE.Merchant && (
                            <div className="relative hover:text-[#0a830a] cursor-pointer group">
                                <Link to="/merchant">Merchant Panel</Link>
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#0a830a] rounded-full opacity-0 group-hover:opacity-100 mt-1"></div>
                            </div>
                        )}
                        <div className="relative hover:text-[#0a830a] cursor-pointer group">
                            Contact us
                            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-2 bg-[#0a830a] rounded-full opacity-0 group-hover:opacity-100 mt-1"></div>
                        </div>
                    </div>

                    {/* Cart and Login/Logout - Always visible */}
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <div className="absolute top-0 right-0 text-orange-400 text-s font-bold rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2">
                                {cartItemsCount}
                            </div>
                            <Link to="/cart">
                                <ShoppingCart className="w-8 h-8 text-[#228B22] cursor-pointer hover:text-[#0a830a]" />
                            </Link>
                        </div>

                        <div className="hidden md:block">
                            {!token ? (
                                <Link to="/loginsignup">
                                    <button className="flex items-center justify-center space-x-2 px-8 py-3 text-[#0a830a] text-lg bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300">
                                        <i className="fi-rr-user text-[#0a830a] text-xl"></i>
                                        <span>Login</span>
                                    </button>
                                </Link>
                            ) : (
                                <button onClick={handleLogout} className="flex items-center justify-center space-x-2 px-8 py-3 text-[#0a830a] text-lg bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300">
                                    <i className="fi-rr-user text-[#0a830a] text-xl"></i>
                                    <span>Logout</span>
                                </button>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button onClick={toggleMenu} className="md:hidden">
                            {isMenuOpen ? (
                                <X className="h-6 w-6 text-[#0a830a]" />
                            ) : (
                                <Menu className="h-6 w-6 text-[#0a830a]" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 py-4 border-t border-gray-200">
                        <div className="flex flex-col space-y-4 text-blue-950 font-serif font-bold">
                            <Link to="/" className="hover:text-[#0a830a]" onClick={() => setIsMenuOpen(false)}>
                                Home
                            </Link>
                            <Link to="/profile" className="hover:text-[#0a830a]" onClick={() => setIsMenuOpen(false)}>
                                Profile
                            </Link>
                            {user && user.role === ROLE.Admin && (
                                <Link to="/admin" className="hover:text-[#0a830a]" onClick={() => setIsMenuOpen(false)}>
                                    Admin Panel
                                </Link>
                            )}
                            <Link to="/dish" className="hover:text-[#0a830a]" onClick={() => setIsMenuOpen(false)}>
                                Dishes
                            </Link>
                            {token && <Link to="/counter" className="hover:text-[#0a830a]" onClick={() => setIsMenuOpen(false)}>
                                Counter
                            </Link>}
                            {user && user.role === ROLE.Merchant && (
                                <Link to="/merchant" className="hover:text-[#0a830a]" onClick={() => setIsMenuOpen(false)}>
                                    Merchant Panel
                                </Link>
                            )}
                            <div className="hover:text-[#0a830a]">
                                Contact us
                            </div>
                            <div className="pt-4">
                                {!user.email ? (
                                    <Link to="/loginsignup" onClick={() => setIsMenuOpen(false)}>
                                        <button className="w-full flex items-center justify-center space-x-2 px-8 py-3 text-[#0a830a] text-lg bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300">
                                            <i className="fi-rr-user text-[#0a830a] text-xl"></i>
                                            <span>Login</span>
                                        </button>
                                    </Link>
                                ) : (
                                    <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full flex items-center justify-center space-x-2 px-8 py-3 text-[#0a830a] text-lg bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300">
                                        <i className="fi-rr-user text-[#0a830a] text-xl"></i>
                                        <span>Logout</span>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewNavbar;
