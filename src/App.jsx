import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Products from "./pages/Products";
import SingleProductDetails from "./pages/SingleProductDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CategoryProduct from "./pages/CategoryProduct";
import { useCart } from "./context/CartContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [location, setLocation] = useState({
    quarter: "",
    suburb: "",
    county: "",
    state: "",
    postcode: "",
    country: "",
  });

  const [error, setError] = useState("");
  const [openDropDown, setOpenDropDown] = useState(false);
  const {cartItem, setCartItem} = useCart() //for local storage

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setError("GeoLocation is not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();

          const address = {
            quarter: data.address?.quarter || "",
            suburb: data.address?.suburb || "",
            county: data.address?.county || "",
            state: data.address?.state || "",
            postcode: data.address?.postcode || "",
            country: data.address?.country || "",
          };

          setLocation(address);
          setError("");
          setOpenDropDown(false);
        } catch (err) {
          setError("Failed to fetch location");
        }
      },
      (err) => {
        setError(err.message);
      }
    );
  };

  //Load cart from local storage

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar
          getLocation={getLocation}
          setError={setError}
          location={location}
          openDropDown={openDropDown}
          setOpenDropDown={setOpenDropDown}
        />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<SingleProductDetails />} />
            <Route path="/category/:category" element={<CategoryProduct/>} />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart
                    location={location}
                    setLocation={setLocation}
                    getLocation={getLocation}
                  />
                </ProtectedRoute>
           
                  
               
              }
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
