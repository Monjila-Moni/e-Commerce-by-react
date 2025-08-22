import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 space-y-8">
        <h1 className="text-4xl font-bold text-center">About Glamoré</h1>

        <p className="text-gray-700 text-lg">
          Welcome to <span className="font-semibold text-red-600">Glamoré</span>
          , your ultimate destination for timeless jewelry and elegant clothing.
          From dazzling necklaces to chic dresses, we bring you pieces that make
          every moment shine.
        </p>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">Our Mission</h2>
          <p className="text-gray-700 text-base">
            At Glamoré, our mission is to help you express your style through
            stunning jewelry and fashion-forward clothing. We carefully curate
            our collection to ensure every piece radiates beauty, quality, and
            confidence.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">
            Why Choose Us?
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Handcrafted jewelry with exquisite attention to detail</li>
            <li>Trendy and classic clothing for every occasion</li>
            <li>Premium quality at affordable prices</li>
            <li>Fast delivery and dedicated customer care</li>
            <li>Hassle-free returns for a worry-free shopping experience</li>
          </ul>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-red-600">Our Vision</h2>
          <p className="text-gray-700 text-base">
            We dream of a world where every individual feels beautiful and
            confident in their own style. By blending timeless elegance with
            modern trends, we aim to make fashion and jewelry accessible to all
            — without compromising on quality.
          </p>
        </div>

        <div className="text-center mt-10">
          <h3 className="text-xl font-semibold text-red-600 mb-2">
            Join the Glamoré Family
          </h3>
          <p className="text-gray-700 mb-4">
            Whether you’re searching for the perfect gift, a statement piece, or
            a wardrobe refresh — Glamoré is here to help you shine.
          </p>
          <Link to={"/products"}>
            <button className="bg-red-600 text-white px-6 py-2 rounded-xl hover:bg-red-700 transition duration-300">
              Explore Collection
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
