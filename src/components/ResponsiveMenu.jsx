import React from "react";
import { FaUserCircle, FaCaretDown } from "react-icons/fa";
import { MapPin } from "lucide-react";
import { CgClose } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";

const ResponsiveMenu = ({
  openNav,
  setOpenNav,
  location,
  getLocation,
  openDropDown,
  setOpenDropDown,
}) => {
  const { user } = useUser();

  return (
    <div
      className={`${
        openNav ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[80%] max-w-sm flex-col 
      bg-white px-6 pt-10 pb-6 text-gray-800 md:hidden rounded-r-2xl 
      shadow-xl transition-all duration-300`}
    >
      {/* User Section */}
      <div className="flex items-center gap-4 border-b pb-4">
        {user ? (
          <UserButton appearance={{ elements: { avatarBox: "w-12 h-12" } }} />
        ) : (
          <FaUserCircle size={48} className="text-gray-500" />
        )}
        <div>
          <h1 className="font-semibold text-lg">
            Hello, {user?.firstName || "Guest"}
          </h1>
          <p className="text-sm text-gray-500">
            {user ? "Premium User" : "Welcome!"}
          </p>
        </div>
      </div>

      {/* Location Section */}
      <div className="flex items-center gap-3 mt-6 px-1" onClick={() => setOpenDropDown((prev) => !prev)}>
        <MapPin
          className="text-red-500 cursor-pointer"
          size={22}
          onClick={getLocation}
        />
        <div className="flex flex-col leading-tight font-medium text-sm">
          {location && Object.values(location).some(Boolean) ? (
            <>
              {location.quarter && <span>{location.quarter}</span>}
              {location.suburb && <span>{location.suburb}</span>}
            </>
          ) : (
            <span className="text-gray-500">Add Address</span>
          )}
        </div>
        <FaCaretDown
          className="cursor-pointer text-gray-600"
          
        />
      </div>

      {/* Dropdown for Mobile */}
      {openDropDown && (
        <div className="w-[250px] bg-white fixed z-50 top-40 left-6 shadow-2xl border border-gray-200 p-5 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h1 className="font-semibold text-lg">Change Location</h1>
            <CgClose
              className="cursor-pointer text-gray-600 hover:text-red-500"
              onClick={() => setOpenDropDown(false)}
            />
          </div>
          <button
            onClick={getLocation}
            className="w-full bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-400 transition"
          >
            Detect my Location
          </button>
        </div>
      )}

      {/* Nav Links */}
      <nav className="mt-10 flex-1">
        <ul className="flex flex-col gap-4 text-lg font-medium">
          {[
            { to: "/", label: "Home" },
            { to: "/products", label: "Products" },
            { to: "/about", label: "About" },
            { to: "/contact", label: "Contact" },
          ].map((item, idx) => (
            <li key={idx}>
              <NavLink
                to={item.to}
                onClick={() => setOpenNav(false)}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg transition ${
                    isActive
                      ? "bg-red-100 text-red-600 font-semibold"
                      : "hover:bg-gray-100 text-gray-700"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
            
          ))}
          <li>
            <SignedOut >
          <SignInButton className="w-full bg-red-500 text-white py-2 mt-4 rounded-lg cursor-pointer text-base font-medium hover:bg-red-400 transition" />
        </SignedOut></li>
        </ul>
      </nav>

      {/* Auth Section */}
      <div className="flex justify-center mt-6">
        
      </div>
    </div>
  );
};

export default ResponsiveMenu;
