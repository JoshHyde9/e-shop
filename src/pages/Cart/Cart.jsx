import { useState, useEffect, useContext } from "react";

// Context
import { CartContext } from "../../hooks/CartContext";

// Db
import { getAllCartItems } from "../../services/cart";

// Components
import { CartItem } from "../../components/CartItem/CartItem";

import styles from "./Cart.module.scss";

export const Cart = () => {
  const [cart, , removeFromCart, updateCart] = useContext(CartContext);

  const [dbCart, setDBCart] = useState([]);

  useEffect(() => {
    const getCartItems = async () => {
      const data = await getAllCartItems(cart);

      setDBCart(data);
    };

    getCartItems();
  }, [cart]);

  if (!dbCart || dbCart.length <= 0) {
    return <h1 className="error">Items added to your cart will appear here</h1>;
  }

  return (
    <div className={styles.cart_container}>
      {dbCart.map((bike) => {
        const element = cart.find(({ id }) => id === bike.id);
        const index = cart.indexOf(element);

        return (
          <CartItem
            key={bike.id}
            bike={bike}
            localCart={cart[index]}
            removeFromCart={removeFromCart}
            updateCart={updateCart}
          />
        );
      })}
    </div>
  );
};
