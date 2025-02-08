
const Connect = () => {
    return (
        <div>
            {/* Back to Top Button */}
            <div 
                className="flex justify-center items-center h-[7vh] bg-[#228B22] border-b-1 text-sm lg:text-md text-white font-serif hover:bg-[#1e7a1e] cursor-pointer"
                onClick={() => window.scrollTo(0, 0)}
            >
                Back to top
            </div>

            {/* Main Footer Content */}
            <div className="bg-[#228B22] text-white">
                <div className="w-[95%] lg:w-[90vw] mx-auto">
                    <div className="flex flex-col lg:flex-row h-auto bg-[#228B22] pt-7 pb-7 lg:pb-0">
                        {/* Logo Section */}
                        <div 
                            className="text-2xl lg:text-5xl font-bold text-gray-800 font-['Poppins'] w-full lg:w-1/3 pl-2 lg:pl-5 mb-6 lg:mb-0"
                        >
                            eatances
                            <span   
                                className="bg-[#228B22] inline-flex align-baseline"
                                style={{ fontSize: '1.5rem', marginLeft: '0.1rem' }}
                            >
                                •
                            </span>
                        </div>

                        {/* Links Sections */}
                        <div className="flex flex-wrap justify-start lg:justify-between w-full lg:w-3/4 text-white px-2 lg:px-0">
                            {/* Multi-Restaurant Section */}
                            <div className="flex flex-col space-y-2 w-1/2 lg:w-1/4 mb-6">
                                <span className="font-bold text-base lg:text-lg">Multi-Restaurant</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">Online Pizza Delivery</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">Cost of Food Delivery App</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">Increase Customer Conversion</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">Promote your Restaurant App</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">Food Packaging Ideas</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">Refer A Restaurant</span>
                            </div>

                            {/* Eatance App Section */}
                            <div className="flex flex-col space-y-2 w-1/2 lg:w-1/4 mb-6">
                                <span className="font-bold text-base lg:text-lg">Eatance App</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">Eatance App</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">No Markup Policy</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">Food Partners</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">Restaurant Marketing</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">Eatance For Restaurant</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">Eatance For Events</span>
                            </div>

                            {/* Company Section */}
                            <div className="flex flex-col space-y-2 w-1/2 lg:w-1/4 mb-6">
                                <span className="font-bold text-base lg:text-lg">Company</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">Contact Us</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">About Us</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">Support</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">Careers</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">Free Downloads</span>
                            </div>

                            {/* New Additional Section */}
                            <div className="flex flex-col space-y-2 w-1/2 lg:w-1/4 mb-6">
                                <span className="font-bold text-base lg:text-lg">Resources</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">Blog</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">Case Studies</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">Help Center</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">Privacy Policy</span>
                                <span className="text-sm lg:text-base hover:underline cursor-pointer">Terms of Service</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Connect;