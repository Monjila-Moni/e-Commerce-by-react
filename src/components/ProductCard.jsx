import React from "react";
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const {addToCart} = useCart()
  
  return (
    <div className="border relative border-gray-100 rounded-2xl cursor-pointer hover:scale-105 hover:shadow-2xl transition-all duration-200 p-2 h-max flex flex-col">
      <Link to={`/products/${product.id}`}>
        <img
        src={product.image}
        alt={product.title}
        className="bg-gray-100 aspect-square object-contain rounded-lg w-full cursor-pointer"
      />
      <h1 className="line-clamp-2 p-1 font-semibold text-sm sm:text-base">{product.title}</h1>
      <p className="my-1 text-md sm:text-lg text-gray-800 font-bold">
        ${Number(product.price).toFixed(2)}
      </p>
      </Link>
      
      <button onClick={()=>addToCart(product)}
        className="bg-red-500 px-3 py-2 text-sm sm:text-lg rounded-md text-white w-full cursor-pointer flex gap-2 items-center justify-center font-semibold hover:bg-red-600 active:scale-95 transition-all mt-auto"
      >
        <IoCartOutline className="w-5 h-5 sm:w-6 sm:h-6" /> Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
