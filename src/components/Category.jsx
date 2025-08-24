import React from "react";
import { getData } from "../context/DataContext";
import { useNavigate } from "react-router-dom";

function Category() {
 
  const navigate = useNavigate()
  const {data, getFilteredData} = getData()
  const uniqueCategories = getFilteredData(data, "category");

  return (
    <div className="bg-[#101829]">
      <div className="max-w-6xl mx-auto flex flex-wrap gap-4 items-center justify-center sm:justify-around py-7 px-4">
        {uniqueCategories?.map(category => (
          <button
            onClick={()=>navigate(`/category/${category}`)}
            key={category}
            className="bg-gradient-to-r from-red-500 to-purple-500 hover:from-purple-500 hover:to-red-500 text-white px-4 py-2 rounded-md cursor-pointer transition-colors duration-300"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Category;
