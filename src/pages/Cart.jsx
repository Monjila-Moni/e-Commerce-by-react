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

  const totalPrice = cartItem.reduce((total, item) => total + item.price * item.quantity, 0);

  if (!location) return null;

  return (
    <div className="max-w-6xl mx-auto p-4">
      {cartItem.length > 0 ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Total Items ({cartItem.length})</h1>

          {/* Cart Items */}
          <div>
            {cartItem.map((item) => (
              <div
                key={item.id}
                className="flex mt-3 bg-gray-100 p-4 rounded-md justify-between items-center w-full"
              >
                <div className="flex gap-4 items-center">
                  <img src={item.image} alt={item.title} className="w-14 rounded-md" />
                  <div>
                    <h1 className="line-clamp-2 w-[200px]">{item.title}</h1>
                    <p className="text-red-500 font-semibold">${item.price}</p>
                  </div>
                </div>

                <div className="flex bg-red-500 text-white px-2 py-1.5 rounded-md gap-2 font-bold text-xl items-center justify-center">
                  <button
                    onClick={() => decreaseQuantity(item)}
                    className="hover:scale-110 transition-all duration-200 px-2"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item)}
                    className="hover:scale-110 transition-all duration-200 px-2"
                  >
                    +
                  </button>
                </div>

                <div
                  className="mr-4 p-2 cursor-pointer hover:scale-110 hover:shadow-2xl hover:bg-white rounded-full transition-all duration-200"
                  onClick={() => removeFromCart(item)}
                >
                  <FaRegTrashAlt className="text-red-500 text-xl" />
                </div>
              </div>
            ))}
          </div>

          {/* Delivery Info & Bill Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20 mt-6">
            {/* Delivery Info */}
            <div className="bg-gray-100 rounded-md p-7 space-y-4">
              <h1 className="text-gray-800 font-bold text-xl">Delivery Info</h1>
              <p className="text-gray-700">
                Location: {[location.quarter, location.suburb].filter(Boolean).join(", ") || "Not set"}
              </p>

              <div className="flex flex-col space-y-2">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="p-2 rounded-md"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label>Address</label>
                <input
                  type="text"
                  placeholder="Enter your address"
                  className="p-2 rounded-md"
                  value={[location.quarter, location.suburb].filter(Boolean).join(", ") }
                  onChange={(e) => setLocation({ ...location, county: e.target.value })}
                />
              </div>

              <div className="flex w-full gap-4">
                <div className="flex flex-col space-y-2 w-full">
                  <label>State</label>
                  <input
                    type="text"
                    placeholder="Enter your state"
                    className="p-2 rounded-md w-full"
                    value={location.state}
                    onChange={(e) => setLocation({ ...location, state: e.target.value })}
                  />
                </div>
                <div className="flex flex-col space-y-2 w-full">
                  <label>PostCode</label>
                  <input
                    type="text"
                    placeholder="Enter your postcode"
                    className="p-2 rounded-md w-full"
                    value={location.postcode}
                    onChange={(e) => setLocation({ ...location, postcode: e.target.value })}
                  />
                </div>
              </div>

              <div className="flex w-full gap-4">
                <div className="flex flex-col space-y-2 w-full">
                  <label>Country</label>
                  <input
                    type="text"
                    placeholder="Enter your country"
                    className="p-2 rounded-md w-full"
                    value={location.country}
                    onChange={(e) => setLocation({ ...location, country: e.target.value })}
                  />
                </div>
                <div className="flex flex-col space-y-2 w-full">
                  <label>Phone No</label>
                  <input type="text" placeholder="Enter your number" className="p-2 rounded-md w-full" />
                </div>
              </div>

              <button className="bg-red-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer">
                Submit
              </button>

              <div className="flex items-center justify-center text-gray-700">---------OR----------</div>

              <div className="flex justify-center">
                <button onClick={getLocation} className="bg-red-500 text-white px-3 py-2 rounded-md">
                  Detect Location
                </button>
              </div>
            </div>

            {/* Bill Details */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-md p-7 space-y-4 h-max">
              <h1 className="text-gray-800 font-bold text-xl">Bill Details</h1>

              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700"><LuNotebookText /> Items total</h1>
                <p>${totalPrice}</p>
              </div>

              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700"><MdDeliveryDining /> Delivery Charge</h1>
                <p className="text-red-500 font-semibold"><span className="line-through text-gray-600">$25</span> FREE</p>
              </div>

              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700"><GiShoppingBag /> Handling Charge</h1>
                <p className="text-red-500 font-semibold">$5</p>
              </div>

              <hr className="text-gray-200 mt-2" />

              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">Grand Total</h1>
                <p className="font-semibold text-lg">${totalPrice + 5}</p>
              </div>

              <div>
                <h1 className="font-semibold text-gray-700 mb-3 mt-7">Apply Promo Code</h1>
                <div className="flex gap-3">
                  <input type="text" placeholder="Enter code" className="p-2 rounded-md w-full" />
                  <button className="bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md">
                    Apply
                  </button>
                </div>
              </div>

              <button className="bg-red-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center h-[600px]">
          <h1 className="text-red-500/80 font-bold text-5xl">Oh no! Your cart is empty</h1>
          <img src={emptyCart} alt="Empty Cart" className="w-[400px]" />
          <button
            onClick={() => navigate("/products")}
            className="bg-red-500 text-white px-3 py-2 rounded-md cursor-pointer hover:bg-red-600 transition-all duration-200"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
