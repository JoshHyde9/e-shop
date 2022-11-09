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

  const removeFromCart = (bikeId) => {
    const element = cart.find(({ id }) => id === bikeId);
    const index = cart.indexOf(element);

    const newCart = cart.slice();
    newCart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(newCart));
    setCart(newCart);
  };

  const updateCart = (bikeId, quantity) => {
    const bike = cart.find(({ id }) => id === bikeId);
    const bikeIndex = cart.indexOf(bike);

    bike.quantity = quantity;

    const newCart = [...cart];
    newCart[bikeIndex];
    setCart(newCart);
  };

  return (
    <CartContext.Provider value={[cart, setCart, removeFromCart, updateCart]}>
      {children}
    </CartContext.Provider>
  );
};
