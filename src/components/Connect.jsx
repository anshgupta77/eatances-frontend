const Connect = () => {     
    return ( 
        <div className="">
            <div 
                className="flex justify-center items-center h-[7vh] bg-[#0a830a] border-b-1 text-md text-white *: font-serif hover:bg-[#228B22] cursor-pointer" 
                onClick={() => window.scrollTo(0, 0)}>
                Back to top
            </div>
            <div className="bg-[#228B22] text-white">

            <div className="w-[90vw] mx-auto">
            


            <div className="flex h-auto bg-[#228B22] pt-7">
                {/* Left Section: eatances */}
                <div 
                    className="text-3xl font-bold text-gray-800 font-serif w-1/4 pl-5" 
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                    eatances
                    <span 
                        className="bg-[#228B22] inline-flex align-baseline" 
                        style={{ fontSize: '1.5rem', marginLeft: '0.1rem' }}
                    >
                        •
                    </span>
                </div>

    {/* Right Section: Rest of the content */}
                <div className="flex flex-wrap justify-between w-3/4 text-white">
                    <div className="flex flex-col space-y-2 w-1/4 mb-6">
                        <span className="font-semibold text-lg">Multi-Restaurant Aggregator</span>
                        <span>Online Pizza Delivery</span>
                        <span>Cost of Food Delivery App</span>
                        <span>Increase Customer Conversion</span>
                        <span>Promote your Restaurant App</span>
                        <span>Food Packaging Ideas</span>
                        <span>Refer A Restaurant</span>
                    </div>

                    <div className="flex flex-col space-y-2 w-1/4 mb-6">
                        <span className="font-semibold text-lg">Eatance App</span>
                        <span>Eatance App</span>
                        <span>No Markup Policy</span>
                        <span>Food Partners</span>
                        <span>Restaurant Marketing</span>
                        <span>Eatance For Restaurant</span>
                        <span>Eatance For Events</span>
                    </div>

                    <div className="flex flex-col space-y-2 w-1/4 mb-6">
                        <span className="font-semibold text-lg">Company</span>
                        <span>Contact Us</span>
                        <span>About Us</span>
                        <span>Support</span>
                        <span>Careers</span>
                        <span>Free Downloads</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>
    );
}
 
export default Connect;

