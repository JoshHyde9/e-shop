import PropTypes from "prop-types";
import { useState } from "react";

import { Quantity } from "../Quanity";
import { Icon } from "../Icon/Icon";

import styles from "./CartItem.module.scss";
import { useEffect } from "react";

/**
 * @param {{bike: {id: string, brand: string, name: string, colours: string[], sizes: string[], price: number, quantity: number, image_url: string}}} props
 */
export const CartItem = ({ bike, removeFromCart, localCart, updateCart }) => {
  const [totalPrice, setTotalPrice] = useState();
  const [quantity, setQuantiy] = useState();

  useEffect(() => {
    if (localCart) {
      setTotalPrice(localCart.quantity * bike.price);
      setQuantiy(localCart.quantity);
    }
  }, []);

  useEffect(() => {
    if (localCart) {
      setTotalPrice(quantity * bike.price);

      if (quantity <= 0) {
        removeFromCart(bike.id);
      }
    }
  }, [quantity]);

  if (!localCart) {
    return <h1 className="error">Items added to your cart will appear here</h1>;
  }

  return (
    <div className={styles.cart__item}>
      <div className={styles.image}>
        <img src={bike.image_url} alt={bike.name} />
      </div>
      <div className={styles.cart__info}>
        <h1 className={styles.name}>{bike.name}</h1>
        <h2 className={styles.brand}>{bike.brand}</h2>
        <h2>${bike.price.toLocaleString()}</h2>
        {quantity && (
          <Quantity
            bikeId={bike.id}
            quantity={quantity}
            setQuantity={setQuantiy}
            updateCart={updateCart}
          />
        )}
      </div>
      <div className={styles.cart_util}>
        <div
          onClick={() => removeFromCart(bike.id)}
          className={styles.removeFromCart}
        >
          <Icon icon="outOfStock" strokeColour="red" size="30" />
        </div>
        {totalPrice && (
          <p className={styles.total}>Total: ${totalPrice.toLocaleString()}</p>
        )}
      </div>
    </div>
  );
};

CartItem.propTypes = {
  bike: PropTypes.shape({
    brand: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    colours: PropTypes.arrayOf(PropTypes.string).isRequired,
    sizes: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number,
    image_url: PropTypes.string.isRequired,
  }),
};
