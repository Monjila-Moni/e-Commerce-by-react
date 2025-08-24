import { createContext, useContext, useState } from "react";

const DiscountContext = createContext();
export const useDiscount = () => useContext(DiscountContext);

export const DiscountProvider = ({ children }) => {
  const [discounts, setDiscounts] = useState({});

  // Generate discount for a product if not already stored
  const getDiscount = (id) => {
    if (discounts[id]) return discounts[id]; // return existing

    const newDiscount = Math.floor(Math.random() * (15 - 3 + 1)) + 3;
    setDiscounts((prev) => ({ ...prev, [id]: newDiscount }));
    return newDiscount;
  };

  return (
    <DiscountContext.Provider value={{ getDiscount }}>
      {children}
    </DiscountContext.Provider>
  );
};
