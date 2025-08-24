
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser
} from "@clerk/clerk-react";

const ResponsiveMenu = ({ openNav, setOpenNav }) => {
  const { user } = useUser();

  return (
    <div
      className={`${
        openNav ? "left-0" : "-left-[100%]"
      } fixed bottom-0 top-0 z-20 flex h-screen w-[75%] flex-col justify-between bg-white px-8 pb-160 pt-16 text-black md:hidden rounded-r-xl shadow-md transition-all duration-300`}
    >
      {/* User Section */}
      <div className="flex items-center gap-3">
        {user ? (
          <UserButton appearance={{ elements: { avatarBox: "w-12 h-12" } }} />
        ) : (
          <FaUserCircle size={50} />
        )}
        <div>
          <h1 className="font-semibold">Hello, {user?.firstName || "Guest"}</h1>
          <h1 className="text-sm text-slate-500">
            {user ? "Premium User" : "Welcome!"}
          </h1>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="mt-12">
        <ul className="flex flex-col gap-6 text-xl font-semibold">
          <li>
            <NavLink
              to="/"
              onClick={() => setOpenNav(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md ${
                  isActive ? "bg-gray-200 text-blue-600" : "hover:bg-gray-100"
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              onClick={() => setOpenNav(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md ${
                  isActive ? "bg-gray-200 text-blue-600" : "hover:bg-gray-100"
                }`
              }
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              onClick={() => setOpenNav(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md ${
                  isActive ? "bg-gray-200 text-blue-600" : "hover:bg-gray-100"
                }`
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              onClick={() => setOpenNav(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md ${
                  isActive ? "bg-gray-200 text-blue-600" : "hover:bg-gray-100"
                }`
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="ml-3 mt-8">
        <SignedOut>
          <SignInButton className="bg-red-500 text-white py-1 px-3 rounded-md cursor-pointer text-sm sm:text-base w-full" />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};

export default ResponsiveMenu;
