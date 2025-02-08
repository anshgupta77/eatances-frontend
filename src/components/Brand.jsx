import sankalp from "../assets/sankalp.webp";
import barkat from "../assets/barkat.webp";
import chaalo from "../assets/chaalo-oshawa.webp";
import tadka from "../assets/tadka-king.webp";
import fresh from "../assets/fresh-slice.webp";
import { Link } from "react-router-dom";
const BrandsPhoto = [
    sankalp, barkat, chaalo, tadka, fresh
];

// const Brand = () => {
//     return ( 
//         <div className="space-y-4 bg-gray-100 h-[65vh] flex flex-col mt-[10%]">
//             <div className="my-[4%] flex flex-col justify-between text-center space-y-4">
//                 <div className="text-center text-5xl font-bold text-blue-950">
//                     Your <span className="text-[#228B22]">Favourite Brands</span>, All in One Place
//                 </div>
//                 <div className="text-center text-lg text-gray-600">
//                     Eatance partners with the best restaurants and event organizers to bring you an unmatched selection of coupons and deals.
//                 </div>

//             </div>

//             <div className=" p-4 rounded-lg flex justify-center gap-4">
//                 {BrandsPhoto.map((brand, index) => (
//                     <div key={index} className="bg-white w-[240px] h-[120px] rounded-r-full rounded-l-full overflow-hidden shadow-sm">
//                         <img src={brand} alt={`brand-${index}`} className="w-full h-full object-cover rounded-lg" />
//                     </div>
//                 ))}
//             </div>
//             <div className="flex justify-center">
//                 <Link to="/counter">
//                     <button className="px-18 py-4 bg-[#228B22] text-white text-xl rounded-md hover:bg-[#228B22]">
//                             View all Brands
//                         </button>
//                 </Link>
//             </div>

//         </div>
//     );
// }
 
// export default Brand;



const Brand = () => {
    return ( 
        <div className="space-y-4 bg-gray-100 min-h-[40vh] flex flex-col mt-[5%] py-8 lg:py-20">
            <div className="my-[0%] flex flex-col justify-between text-center space-y-4 px-4">
                <div className="text-center text-3xl lg:text-5xl font-bold text-blue-950">
                    Your <span className="text-[#228B22]">Favourite Brands</span>, All in One Place
                </div>
                <div className="text-center text-base lg:text-lg text-gray-600">
                    Eatance partners with the best restaurants and event organizers to bring you an unmatched selection of coupons and deals.
                </div>
            </div>

            <div className="p-4 rounded-lg flex flex-wrap justify-center gap-4">
                {BrandsPhoto.map((brand, index) => (
                    <div key={index} className="bg-white w-[150px] lg:w-[240px] h-[80px] lg:h-[120px] rounded-r-full rounded-l-full overflow-hidden shadow-sm">
                        <img src={brand} alt={`brand-${index}`} className="w-full h-full object-cover rounded-lg" />
                    </div>
                ))}
            </div>
            <div className="flex justify-center px-4">
                <Link to="/counter">
                    <button className="px-8 lg:px-18 py-3 lg:py-4 bg-[#228B22] text-white text-lg lg:text-xl rounded-md hover:bg-[#228B22]">
                        View all Brands
                    </button>
                </Link>
            </div>
        </div>
    );
}


export default Brand;