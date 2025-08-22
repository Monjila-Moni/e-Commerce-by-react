import { createContext, useContext, useEffect, useState } from "react";

export const DataContext = createContext([]);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const result = await res.json();
      //console.log("Fetched result:", result);
      setData(result);
    } catch (error) {
      console.log("Error fetching data: ", error);
    }
  };

    // Get unique filtered values
  const getFilteredData = (obj, key) => {
    let allValues = obj?.map(item => item[key]) || [];
    return [...new Set(allValues)];
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, getFilteredData }}>{children}</DataContext.Provider>
  );
};

export const getData = () => useContext(DataContext);
