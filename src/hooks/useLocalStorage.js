import { useState, useEffect } from "react";

export function useLocalStorage(key, initialData) {
  // Lazy initializer -> reads localStorage immediately
  const [data, setData] = useState(() => {
    try {
      const existingData = localStorage.getItem(key);
      return existingData ? JSON.parse(existingData) : initialData;
    } catch {
      return initialData;
    }
  });

  // Sync to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [key, data]);

  // Listen for changes in other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        setData(e.newValue ? JSON.parse(e.newValue) : initialData);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [key, initialData]);

  // Update function (handles function updates like useState)
  const updateLocalStorage = (newData) => {
    setData((prev) => {
      const value = typeof newData === "function" ? newData(prev) : newData;
      localStorage.setItem(key, JSON.stringify(value));
      return value;
    });
  };

  return [data, updateLocalStorage];
}
