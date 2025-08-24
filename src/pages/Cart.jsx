import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import emptyCart from "../assets/empty-cart.png";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { LuNotebookText } from "react-icons/lu";
import { MdDeliveryDining } from "react-icons/md";
import { GiShoppingBag } from "react-icons/gi";

function Cart({ location, setLocation, getLocation }) {
  const { cartItem, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  const navigate = useNavigate();
  const { user } = useUser();
  const [fullName, setFullName] = useState(user?.fullName || "");

  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (!location) return null;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {cartItem.length > 0 ? (
        <>
          <h1 className="text-xl sm:text-2xl font-bold mb-4">
            Total Items ({cartItem.length})
          </h1>

          {/* Cart Items */}
          <div className="space-y-3">
            {cartItem.map((item) => (
              <div
                key={item.id}
                className="flex flex-row bg-gray-100 p-2 md:p-4 rounded-md justify-between items-center gap-2"
              >
                {/* Product Info */}
                <div className="flex gap-4 items-center w-full sm:w-auto">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-14 h-14 object-contain rounded-md"
                  />
                  <div className="overflow-hidden">
                    <h1 className="text-sm sm:text-base font-medium truncate max-w-[150px] md:max-w-[200px]">
                      {item.title}
                    </h1>
                    <p className="text-red-500 font-semibold text-sm sm:text-base">
                      ${item.price}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex bg-red-500 text-white px-2 py-1 rounded-md gap-2 font-bold text-lg items-center">
                  <button
                    onClick={() => decreaseQuantity(item)}
                    className="hover:scale-110 transition px-0 md:px-2"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item)}
                    className="hover:scale-110 transition px-0 md:px-2"
                  >
                    +
                  </button>
                </div>

                {/* Delete Button */}
                <div
                  className="p-2 cursor-pointer hover:scale-110 hover:shadow-md hover:bg-white rounded-full transition"
                  onClick={() => removeFromCart(item)}
                >
                  <FaRegTrashAlt className="text-red-500 md:text-lg sm:text-xm" />
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Info & Bill Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 mt-6">
            {/* Delivery Info */}
            <div className="bg-gray-100 rounded-md p-5 sm:p-7 space-y-4">
              <h1 className="text-gray-800 font-bold text-lg sm:text-xl">
                Delivery Info
              </h1>
              <p className="text-gray-700 text-sm sm:text-base">
                Location:{" "}
                {[location.quarter, location.suburb].filter(Boolean).join(", ") ||
                  "Not set"}
              </p>

              {/* Full Name */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm sm:text-base">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="p-2 rounded-md border"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              {/* Address */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm sm:text-base">Address</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="p-2 rounded-md border"
                  value={[location.quarter, location.suburb]
                    .filter(Boolean)
                    .join(", ")}
                  onChange={(e) =>
                    setLocation({ ...location, county: e.target.value })
                  }
                />
              </div>

              {/* State + Postcode */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex flex-col space-y-2 w-full">
                  <label className="text-sm sm:text-base">State</label>
                  <input
                    type="text"
                    placeholder="Enter your state"
                    className="p-2 rounded-md border w-full"
                    value={location.state}
                    onChange={(e) =>
                      setLocation({ ...location, state: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-2 w-full">
                  <label className="text-sm sm:text-base">PostCode</label>
                  <input
                    type="text"
                    placeholder="Enter your postcode"
                    className="p-2 rounded-md border w-full"
                    value={location.postcode}
                    onChange={(e) =>
                      setLocation({ ...location, postcode: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Country + Phone */}
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <div className="flex flex-col space-y-2 w-full">
                  <label className="text-sm sm:text-base">Country</label>
                  <input
                    type="text"
                    placeholder="Enter your country"
                    className="p-2 rounded-md border w-full"
                    value={location.country}
                    onChange={(e) =>
                      setLocation({ ...location, country: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col space-y-2 w-full">
                  <label className="text-sm sm:text-base">Phone No</label>
                  <input
                    type="text"
                    placeholder="Enter your number"
                    className="p-2 rounded-md border w-full"
                  />
                </div>
              </div>

              <button className="bg-red-500 text-white px-3 py-2 rounded-md mt-3 w-full sm:w-auto">
                Submit
              </button>

              <div className="flex items-center justify-center text-gray-600 text-sm">
                -------- OR --------
              </div>

              <div className="flex justify-center">
                <button
                  onClick={getLocation}
                  className="bg-red-500 text-white px-3 py-2 rounded-md"
                >
                  Detect Location
                </button>
              </div>
            </div>

            {/* Bill Details */}
            <div className="bg-white border border-gray-100 shadow-md rounded-md p-5 sm:p-7 space-y-4 h-max mt-6 md:mt-0">
              <h1 className="text-gray-800 font-bold text-lg sm:text-xl">
                Bill Details
              </h1>

              <div className="flex justify-between items-center text-sm sm:text-base">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <LuNotebookText /> Items total
                </h1>
                <p>${totalPrice}</p>
              </div>

              <div className="flex justify-between items-center text-sm sm:text-base">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <MdDeliveryDining /> Delivery Charge
                </h1>
                <p className="text-red-500 font-semibold">
                  <span className="line-through text-gray-600">$25</span> FREE
                </p>
              </div>

              <div className="flex justify-between items-center text-sm sm:text-base">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <GiShoppingBag /> Handling Charge
                </h1>
                <p className="text-red-500 font-semibold">$5</p>
              </div>

              <hr className="text-gray-200 mt-2" />

              <div className="flex justify-between items-center font-semibold text-base sm:text-lg">
                <h1>Grand Total</h1>
                <p>${totalPrice + 5}</p>
              </div>

              {/* Promo Code */}
              <div>
                <h1 className="font-semibold text-gray-700 mb-3 mt-5 text-sm sm:text-base">
                  Apply Promo Code
                </h1>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="p-2 rounded-md border w-full"
                  />
                  <button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md">
                    Apply
                  </button>
                </div>
              </div>

              <button className="bg-red-500 text-white px-3 py-2 rounded-md w-full mt-3">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-4 justify-center items-center h-[70vh] text-center">
          <h1 className="text-red-500/80 font-bold text-2xl sm:text-4xl">
            Oh no! Your cart is empty
          </h1>
          <img
            src={emptyCart}
            alt="Empty Cart"
            className="w-[250px] sm:w-[400px] object-contain"
          />
          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
