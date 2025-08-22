import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { MapPin } from "lucide-react";
import { useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { FaCaretDown } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar({
  getLocation,
  setError,
  location,
  openDropDown,
  setOpenDropDown,
}) {
  const { cartItem } = useCart();

  const toggleDropDown = () => {
    setOpenDropDown((prev) => !prev);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <div className="bg-white py-4 shadow-2xl px-4">
      <div className="max-w-9xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        {/* Logo + Location */}
        <div className="flex flex-wrap gap-4 sm:gap-7 items-center justify-center sm:justify-start">
          <Link to={"/"}>
            <h1 className="font-bold text-2xl sm:text-3xl">
              <span className="text-red-500 font-serif">G</span>lamoré
            </h1>
          </Link>

          <div className="flex gap-1 cursor-pointer text-gray-700 items-center text-sm sm:text-base">
            <MapPin className="text-red-500" onClick={getLocation} />
            <div className="flex flex-col leading-tight font-semibold">
              {location && Object.values(location).some(Boolean) ? (
                <>
                  {location.quarter && <span>{location.quarter}</span>}
                  {location.suburb && <span>{location.suburb}</span>}
                </>
              ) : (
                <span>Add Address</span>
              )}
            </div>

            <FaCaretDown onClick={toggleDropDown} />
          </div>

          {/* Dropdown */}
          {openDropDown && (
            <div className="w-[250px] bg-white fixed z-50 top-16 left-4 sm:left-60 shadow-2xl border-2 border-gray-100 p-5 rounded-md">
              <h1 className="flex justify-between font-semibold mb-4 text-lg sm:text-xl">
                Change Location
                <span>
                  <CgClose onClick={toggleDropDown} />
                </span>
              </h1>
              <button
                onClick={getLocation}
                className="bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer hover:bg-red-400"
              >
                Detect my Location
              </button>
            </div>
          )}
        </div>

        {/* Menu Section */}
        <nav className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-7 items-center">
          <ul className="flex flex-wrap justify-center gap-4 sm:gap-7 items-center text-lg sm:text-xl font-semibold">
            {["/", "/products", "/about", "/contact"].map((path, idx) => (
              <NavLink
                key={idx}
                to={path}
                className={({ isActive }) =>
                  `${
                    isActive ? "border-b-2 border-red-500" : "text-black"
                  } cursor-pointer`
                }
              >
                <li>{["Home", "Products", "About", "Contact"][idx]}</li>
              </NavLink>
            ))}
          </ul>

          <Link to={"/cart"} className="relative">
            <IoCartOutline className="h-6 w-6 sm:h-7 sm:w-7" />
            <span className="bg-red-500 px-2 rounded-full absolute -top-3 -right-3 text-xs sm:text-sm">
              {cartItem.length}
            </span>
          </Link>

          <div>
            <SignedOut>
              <SignInButton className="bg-red-500 text-white py-1 px-3 rounded-md cursor-pointer text-sm sm:text-base" />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;
