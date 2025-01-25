// import sankalp from "../assets/sankalp.webp";
// import barkat from "../assets/barkat.webp";
// import chaalo from "../assets/chaalo-oshawa.webp";
// import tadka from "../assets/tadka-king.webp";
// import fresh from "../assets/fresh-slice.webp"

// const BrandsPhoto = [
//     sankalp, barkat, chaalo, tadka, fresh
// ];

// const Brand = () => {
//     return ( 
//         <div>
//             <div>
//                 Your Favourite Brands, All in One Place
//             </div>
//             <div>
//                 Eatance partners with the best restaurants and event organizers to bring you an unmatched selection of coupons and deals.
//             </div>
//             <div>
//                 {BrandsPhoto.map((brand, index) => (
//                     <div key={index}>
//                         <img src={brand} alt="" />
//                     </div>
//                 ))}
//             </div>
//         </div>
//      );
// }
 
// export default Brand;



import sankalp from "../assets/sankalp.webp";
import barkat from "../assets/barkat.webp";
import chaalo from "../assets/chaalo-oshawa.webp";
import tadka from "../assets/tadka-king.webp";
import fresh from "../assets/fresh-slice.webp";

const BrandsPhoto = [
    sankalp, barkat, chaalo, tadka, fresh
];

const Brand = () => {
    return ( 
        <div className="space-y-4 bg-gray-100 h-[70vh] flex flex-col mt-[10%]">
            <div className="my-[4%] flex flex-col justify-between text-center space-y-4">
                <div className="text-center text-5xl font-bold text-blue-950">
                    Your <span className="text-green-500">Favourite Brands</span>, All in One Place
                </div>
                <div className="text-center text-lg text-gray-600">
                    Eatance partners with the best restaurants and event organizers to bring you an unmatched selection of coupons and deals.
                </div>

            </div>

            <div className=" p-4 rounded-lg flex justify-center gap-4">
                {BrandsPhoto.map((brand, index) => (
                    <div key={index} className="bg-white w-[240px] h-[120px] rounded-r-full rounded-l-full overflow-hidden shadow-sm">
                        <img src={brand} alt={`brand-${index}`} className="w-full h-full object-cover rounded-lg" />
                    </div>
                ))}
            </div>
            <div className="flex justify-center">
                <button className="px-18 py-4 bg-green-500 text-white text-xl rounded-md hover:bg-green-600">
                    View All
                </button>
            </div>

        </div>
    );
}
 
export default Brand;
