import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData } from "../context/DataContext";
import { IoChevronBack } from "react-icons/io5";
import { useDiscount } from "../context/DiscountContext";
import Loading from "../assets/Loading4.webm";
import { useCart } from "../context/CartContext";

function CategoryProduct() {
  const { category } = useParams();
  const { data } = getData();
  const { addToCart } = useCart();

  const filteredItem = data?.filter((item) => item.category === category);
  const { getDiscount } = useDiscount();
  const navigate = useNavigate()

  return (
    <div className="mw-6xl mx-auto p-4 mt-10 mb-10">
      <button 
      onClick={()=>navigate('/')}
      className="bg-gray-800 mb-5 text-white px-3 py-1 rounded-md cursor-pointer flex gap-1 items-center">
        <IoChevronBack /> Back
      </button>

      {filteredItem.length > 0 ? (
        filteredItem.map((item) => {
          const discount = getDiscount(item.id);
          return (
            <div key={item.id} className="flex flex-col gap-4 mb-4">
              <div className="flex gap-4 items-center p-4 bg-gray-100 rounded-md w-full">
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-28 h-28 object-contain flex-shrink-0"
                />

                {/* Info */}
                <div className="space-y-2 overflow-hidden">
                  {/* Title with ellipsis */}
                  <h1 className="font-bold md:text-lg text-base line-clamp-2 hover:text-red-400">
                    {item.title}
                  </h1>

                  {/* Price + discount */}
                  <p className="font-semibold flex items-center md:text-lg text-sm">
                    <span className="mr-1">$</span>
                    <span className="text-xl font-bold truncate max-w-[120px]">
                      {item.price}
                    </span>
                    <span className="ml-2 text-green-600 text-sm">
                      ({discount}% off)
                    </span>
                  </p>

                  {/* Delivery info */}
                  <p className="text-xs md:text-sm text-gray-600">
                    FREE delivery{" "}
                    <span className="font-semibold">Fri, 18 Apr</span> <br />
                    Or fastest delivery{" "}
                    <span className="font-semibold">Tomorrow, 17 Apr</span>
                  </p>

                  {/* Button */}
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-red-500 hover:bg-red-600 cursor-pointer text-white px-3 py-1 rounded-md mt-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex items-center justify-center h-[400px]">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
}

export default CategoryProduct;
