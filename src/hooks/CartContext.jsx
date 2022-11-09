import { useState, useEffect, createContext } from "react";

export const CartContext = createContext();

const getInitialState = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

/**
 * @param {{children: React.ReactNode}} props
 */
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};
