import React from "react";
import banner from "../assets/banner.jpg";
const MidBanner = () => {
  return (
    <div className="bg-gray-100 py-4 md:py-24 sm:py-12 text-white">
      <div
        className="relative max-w-7xl mx-auto md:rounded-2xl bg-cover h-[550px] md:h-[600px]  bg-center "
        style={{
          backgroundImage: `url(${banner})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/60 md:rounded-2xl flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold lg:text-6xl mb-4">
              Shopping is in Your Pocket...
            </h1>
            <p className="text-lg md:text-xl mb-6 font-semibold">
              Discover the latest designer products with unbeatable prices and
              free shipping on all orders.
            </p>
            <button className="px-4 py-2 md:px-6 md:py-3 bg-red-500 hover:bg-red-600 rounded-lg cursor-pointer font-semibold transition duration-300">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// <div className='bg-gray-100 md:py-24'>
//   <div className='relative max-w-7xl mx-auto md:rounded-2xl pt-28 bg-cover bg-center h-[550px] md:h-[600px] ' style={{backgroundImage: `url(${banner})`, backgroundPosition:'center', backgroundAttachment: 'fixed'}}>
//     <div className='absolute inset-0 bg-black/60 md:rounded-2xl bg-opacity-50 flex items-center justify-center'>
//         <div className='text-center text-white px-4'>

//         </div>
//     </div>
//   </div>
// </div>

export default MidBanner;
