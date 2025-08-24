import { useNavigate, useParams } from "react-router-dom";
import { getData } from "../context/DataContext";
import Loading from "../assets/Loading4.webm";
import { useRef } from "react";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "../context/CartContext";
import { useDiscount } from "../context/DiscountContext";


function SingleProductDetails() {
  const { id } = useParams();
  const { data } = getData();
  const {getDiscount} = useDiscount()
  const product = data?.find((item) => item.id === Number(id));
 
  const discount = getDiscount(product.id)
  const navigate = useNavigate();
  const {addToCart} = useCart()


  return (
    <>
      {product ? (
        <div className="mx-4">
          {/* Breadcrumb */}
          <div className="max-w-6xl mx-auto my-10">
            <h1 className="text-lg md:text-xl text-gray-600 font-medium">
              <span
                className="cursor-pointer hover:text-red-500"
                onClick={() => navigate("/")}
              >
                Home
              </span>{" "}
              /{" "}
              <span
                className="cursor-pointer hover:text-red-500"
                onClick={() => navigate("/products")}
              >
                Products
              </span>{" "}
              / <span className="text-gray-800 font-semibold">{product?.title}</span>
            </h1>
          </div>

          {/* Content */}
          <div className="max-w-6xl mx-auto md:p-6 flex flex-col md:flex-row gap-12">
            {/* Image */}
            <div className="flex-1">
              <img
                src={product.image}
                alt={product.title}
                className="w-full max-h-[300px] md:max-h-[400px] rounded-2xl object-contain  p-4"
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {product.title}
              </h1>
              <p className="text-gray-500 uppercase mt-3 tracking-wide">
                {product.category}
              </p>

              {/* Price */}
              <p className="text-xl font-bold mt-5 flex items-center gap-3">
                <span className="text-red-500 text-2xl">${product.price}</span>
                <span className="line-through text-gray-500 text-lg">
                  $
                  {Math.round(product.price + (product.price * discount) / 100)}
                </span>
                <span className="bg-red-500 px-4 py-1.5 rounded-full text-sm text-white font-semibold shadow-sm">
                  {discount}% Discount
                </span>
              </p>

              {/* Description */}
              <p className="text-gray-600 mt-6 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity */}
              <div className="flex gap-4 items-center mt-8">
                <label
                  htmlFor="quantity"
                  className="text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="quantity"
                  className="rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 w-24 px-3 py-2 text-gray-800 text-center shadow-sm"
                  min={1}
                  defaultValue={1}
                />
              </div>

              {/* Button */}
          
                <button onClick={()=>addToCart(product)}
                className="mt-8 bg-red-500 text-white px-2 py-2 md:px-4 md:py-3 rounded-xl font-semibold hover:bg-red-600 active:scale-95 transition-all shadow-md flex gap-3  mb-4"
              >
                <IoCartOutline className='w-6 h-6'/>Add to Cart
              </button>
    
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </>
  );
}

export default SingleProductDetails;
