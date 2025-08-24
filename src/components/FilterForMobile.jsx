import React, { useState } from "react";
import { FaFilter } from "react-icons/fa6";
import { getData } from "../context/DataContext";

function FilterForMobile({
  search,
  setSearch,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  allCategory,
  handleCheckboxChange,
  resetFilter,
  openFilter, setOpenFilter
}) {


  const { data, getFilteredData } = getData();

  const toggleFilter = () => {
    setOpenFilter((prev) => !prev);
  };

  return (
    <div className="bg-gray-100 mt-5 rounded-md shadow-md block md:hidden">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-300">
        <h1 className="text-xl font-semibold">Filters</h1>
        <FaFilter
          onClick={toggleFilter}
          className="text-gray-800 text-lg cursor-pointer hover:text-gray-900 transition"
        />
      </div>

      {/* Filters Content */}
      {openFilter && (
        <div
          className={`bg-gray-100 px-4 py-3 transition-all duration-300 ease-in-out`}
        >
          {/* Search */}
          <input
            type="text"
            className="bg-white rounded-md p-2 border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Categories */}
          <h2 className="font-semibold text-lg mt-5">Category</h2>
          <div className="flex flex-col gap-2 mt-2">
            {allCategory?.map((category) => (
              <label
                htmlFor={category}
                key={category}
                className="flex gap-2 items-center cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCheckboxChange(category)}
                  className="cursor-pointer accent-blue-500"
                  id={category}
                />
                <span className="text-gray-700">
                  {category.toUpperCase()}
                </span>
              </label>
            ))}
          </div>

          {/* Price Range */}
          <h2 className="mt-5 font-semibold text-lg">Price Range</h2>
          <div className="flex flex-col gap-2">
            <label>
              ${priceRange[0]} - ${priceRange[1]}
            </label>
            <input
              type="range"
              className="w-full accent-blue-500 cursor-pointer"
              min="0"
              max="200"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
            />
          </div>

          {/* Reset Button */}
          <div className="flex justify-center mt-6">
            <button
              className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600 active:scale-95 transition-all"
              onClick={resetFilter}
            >
              Reset Filters
            </button>
          </div>
          
        </div>
      )}
    </div>
  );
}

export default FilterForMobile;
