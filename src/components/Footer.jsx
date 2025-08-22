import { Link } from "react-router-dom";

import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaTwitterSquare,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[#101828] px-4 py-10 text-gray-200 ">
      <div className="text-white md:flex gap-4 max-w-7xl md:justify-between mx-auto">
        <div className="mb-6 md:mb-0">
          <Link to={"/"}>
            {/* <img src={Logo} alt="" className='w-32'/> */}
            <h1 className="text-red-500 text-2xl font-bold">Glamoré</h1>
          </Link>
          <p className="mt-2 text-sm">
            Powering Your World with the Best in Shopping.
          </p>
          <p className="mt-2 text-sm">
            123  St, Style City, NY 10001
          </p>

          <p className="text-sm">Email: support@Glamoré.com</p>
          <p className="text-sm">Phone: (123) 456-7890</p>
        </div>
        <div className="mb-6 md:mb-0">
          <h1 className="text-xl font-semibold">Customer Service</h1>
          <ul className="mt-2 text-sm space-y-2">
            <li>Contact Us</li>
            <li>Shipping & Returns</li>
            <li>FAQs</li>
            <li>Order Tracking</li>
            <li>Size Guide</li>
          </ul>
        </div>
        <div className="mb-6 md:mb-0">
          <h1 className="text-xl font-semibold">Follow Us</h1>
          <div className="flex space-x-4 mt-2">
            <FaFacebook />
            <FaInstagram />
            <FaTwitterSquare />
            <FaPinterest />
          </div>
        </div>
        <div className="mb-6 md:mb-0">
          <h1 className="text-xl font-semibold">Stay in the Loop</h1>
          <p className="mt-2 text-sm">
            Subscribe to get special offers, free giveaways, and more
          </p>
          <form action="" className="mt-4 flex">
            <input 
                type="email" 
                placeholder='Your email address'
                className='w-full p-2 rounded-l-md  text-black focus:outline-none focus:ring-1 focus:ring-red-500 bg-white'
                />
            <button type="submit" className="rounded-r-md py-2 px-4 bg-red-600 hover:bg-red-700 cursor-pointer">Subscribe</button>
          </form>
        </div>
      </div>

      <div className="text-center mt-8 pt-6 border-t border-gray-700 text-sm ">
        <p className="text-white">
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-red-500">Glamoré</span>. All rights reserved{" "}
        </p>
      </div>
    </footer>
  );
}

export default Footer;
