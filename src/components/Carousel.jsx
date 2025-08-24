import React, { useContext } from "react";
import { DataContext, getData } from "../context/DataContext";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Category from "./Category";
import { useNavigate } from "react-router-dom";

function Carousel() {
  // const { data } = useContext(DataContext);
  //by this line we dont need to import DataContext and useContext
   
  const { data } = getData();
  const navigate = useNavigate()

  // Custom Arrow Components
  function NextArrow({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="absolute top-1/2 right-2 md:right-4 -translate-y-1/2 z-10 bg-white text-black rounded-full p-2 shadow-lg hover:bg-gray-200"
      >
        <FaArrowRight />
      </button>
    );
  }

  function PrevArrow({ onClick }) {
    return (
      <button
        onClick={onClick}
        className="absolute top-1/2 left-2 md:left-4 -translate-y-1/2 z-10 bg-white text-black rounded-full p-2 shadow-lg hover:bg-gray-200"
      >
        <FaArrowLeft />
      </button>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 500,
    pauseOnHover: false,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div>
      <Slider {...settings}>
        {data.length > 0 ? (
          // slice for only showing 7 items in the carousel
          data.slice(0, 7).map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] px-4 sm:px-6 py-8 sm:py-10"
            >
              <div className="flex flex-col md:flex-row gap-8 md:gap-10 justify-center items-center md:h-[600px] text-center md:text-left">
                {/* Left Section - Text */}
                <div className="space-y-4 sm:space-y-6 max-w-[500px]">
                  <h3 className="text-red-500 font-semibold text-xs sm:text-sm font-sans">
                    Choose for your loved one
                  </h3>
                  <h1 className="text-white uppercase text-2xl sm:text-4xl font-bold line-clamp-3">
                    {item.title}
                  </h1>
                  <p className="text-gray-400 line-clamp-3 text-sm sm:text-base">
                    {item.description}
                  </p>
                  <button 
                  onClick={()=>navigate(`/products/${item.id}`)}
                  className="bg-gradient-to-r from-red-500 to-purple-500 hover:from-purple-500 hover:to-red-500 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-300">
                    Shop Now
                  </button>
                </div>

                {/* Right Section - Image */}
                <div className="w-full max-w-[200px] sm:max-w-[450px] h-[300px] sm:h-[450px]">
                  <img
                    onClick={()=>navigate(`/products/${item.id}`)}
                    src={item.image}
                    alt={item.title}
                    className="rounded-full hover:scale-105 transition-transform duration-300 shadow-2xl shadow-red-400 bg-white p-4 w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-white">Loading...</div>
        )}
      </Slider>
      <Category/>
    </div>
  );
}

export default Carousel;
