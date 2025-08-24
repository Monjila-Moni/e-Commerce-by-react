import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";
import { useLocalStorage } from "../hooks/useLocalStorage";

export const CartContext = createContext([]);

export const CartProvider = ({ children }) => {

  const [cartItem, setCartItem] = useLocalStorage('cartItem',[]);


  
  
  const addToCart = (product) => {
    // setCartItem((prev) => [...prev, product]);
    // toast.success("Product is added to cart")

    //increase the cart value but one value will not multiple time

    const itemInCart = cartItem.find((item) => item.id === product.id);
    if (itemInCart) {
      //increase qantity if already in cart not product
      const updatedCart = cartItem.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItem(updatedCart);
      toast.warn("This product is already in cart", {
        autoClose: 1000,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      //add new item with quantiy 1
      setCartItem([...cartItem, { ...product, quantity: 1 }]);
      toast.success("Product is added to cart", {
        autoClose: 1000,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const removeFromCart = (product) => {
    setCartItem(cartItem.filter((item) => item.id != product.id));
    toast.success("Product is deleted from cart!", {
        autoClose: 1000,
        pauseOnHover: true,
        draggable: true,
      });
  };
  const increaseQuantity = (product) => {
    setCartItem(
      cartItem.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
     toast.info("Increased product quantity!", {
        autoClose: 1000,
        pauseOnHover: true,
        draggable: true,
      })
  };
  const decreaseQuantity = (product) => {
    setCartItem(
      cartItem
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
    const item = cartItem.find((i) => i.id === product.id);
    
    if (item && item.quantity > 1){
      toast.info("Decreased product quantity!", {
        autoClose: 1000,
        pauseOnHover: true,
        draggable: true,
      })
    }
    
    
    if (item && item.quantity === 1) {
      toast.info("Product removed from cart!", {
        autoClose: 1000,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItem,
        setCartItem,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export const useCart = () => useContext(CartContext);
