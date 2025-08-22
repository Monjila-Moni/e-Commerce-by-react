import React, { useState, useEffect } from "react";
import { getData } from "../context/DataContext";
import Loading from "../assets/Loading4.webm";
import FilterSection from "../components/FilterSection";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json";

function Products() {
  const { data } = getData();
  const [search, setSearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedCategories, setSelectedCategories] = useState(["All"]);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Filtering logic
  const filteredProducts = (data || []).filter((item) => {
    const textSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const checkboxSearch =
      selectedCategories.includes("All") ||
      selectedCategories.includes(item.category);
    const priceSearch =
      item.price >= priceRange[0] && item.price <= priceRange[1];
    return textSearch && checkboxSearch && priceSearch;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo(0,0)
  }, [search, selectedCategories, priceRange]);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 mb-10">
        {data.length > 0 ? (
          <>
            <div className="flex flex-col md:flex-row gap-8 md:items-stretch">
              {/* Filter Section */}
              <FilterSection
                search={search}
                setSearch={setSearch}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                // optional: keep a fixed-ish width on md+ so columns feel consistent
                className="md:w-72 md:flex-shrink-0"
              />

              {/* Product Column */}
              <div className="flex-1">
                {currentProducts.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
                      {currentProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                      ))}
                    </div>

                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </>
                ) : (
                  // 👇 This centers *within the product column* height
                  <div className="h-full flex items-center justify-center py-10">
                    <Lottie
                      animationData={notfound}
                      className="w-[300px] md:w-[400px]"
                    />
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center min-h-[530px]">
            <video
              src={Loading}
              muted
              autoPlay
              loop
              className="w-24 h-24 sm:w-32 sm:h-32"
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Products;
