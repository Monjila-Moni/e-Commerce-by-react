
function FilterSection({
  search,
  setSearch,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  allCategory,
  handleCheckboxChange,
  resetFilter,
  selectedBrand,
  setSelectedBrand,
}) {


  // const getFilteredData = (object, key)=>{
  //     object.map((item)=>{
  //         const all = item[key]
  //         return [... new(all)]
  //     })
  // }


  // const handleBrandChange = (brand)=>{
  //   if(brand === "All"){
  //     setSelectedBrand(["All"])

  //   }else{
  //     let updatedBrand = [...selectedBrand]
  //     if(updatedBrand.includes(brand)){
  //       updatedBrand = updatedBrand.filter((b)=>b!=brand)

  //     }else{
  //       updatedBrand = updatedBrand.filter((b) => b !== "All");
  //       updatedBrand.push(brand);
  //     }
  //      setSelectedBrand(updatedBrand);
  //   }
  // }

  return (
    <div className="bg-gray-100 mt-13 p-4 rounded-md hidden md:block h-max">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="bg-white rounded-md p-2 border-gray-400 border"
      />

      {/* category-wise search */}
      <h1 className="font-semibold text-xl mt-5">Category</h1>
      {allCategory?.map((category) => (
        <label
          htmlFor={category}
          key={category}
          className="flex gap-2 mt-3 cursor-pointer"
        >
          <input
            type="checkbox"
            value={category}
            checked={selectedCategories.includes(category)}
            onChange={() => handleCheckboxChange(category)}
            className="cursor-pointer"
            id={category}
          />
          {category.toUpperCase()}
        </label>
      ))}
      {/* brand-wise search */}
      {/* <h1 className="font-semibold text-xl mt-5">Brand</h1>
      <select className="cursor-pointer bg-white rounded-md p-2 border-gray-300 border w-full mt-3">
        {
          allBrand?.map((brand, index)=>{
            return <option key={index} 
                    value={brand} 
                    onChange={handleBrandChange}>
              {brand.toUpperCase()}
            </option>
          })
        }
      </select> */}

      {/* price-wise search */}
      <h1 className="mt-5 font-semibold text-xl mb-3">Price Range</h1>
      <div className="flex flex-col gap-2">
        <label htmlFor="">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <input
          type="range"
          className="transition-all"
          min="0"
          max="200"
          value={priceRange[1]}
          onChange={(e) =>
            setPriceRange([priceRange[0], Number(e.target.value)])
          }
        />
      </div>
      <button
        className="bg-red-500 text-white rounded-md px-3 py-1 mt-5 cursor-pointer hover:bg-red-600 active:scale-95 transition-all"
        onClick={
          resetFilter
        }
      >
        Reset Filters
      </button>
    </div>
  );
}

export default FilterSection;
