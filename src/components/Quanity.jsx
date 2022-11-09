import PropTypes from "prop-types";

/**
 * @param {{quantity: number, setQuantity: React.Dispatch<React.SetStateAction<number>>}} props
 * @returns JSX.Element
 */
export const Quantity = ({ quantity, setQuantity, updateCart, bikeId }) => {
  return (
    <div className="qty-input">
      <button
        onClick={() => {
          setQuantity(quantity - 1);
          if (!updateCart) return;
          updateCart(bikeId, quantity - 1);
        }}
        className="qty-count qty-count--minus"
        type="button"
      >
        -
      </button>
      <input
        className="product-qty"
        name="quantity"
        type="number"
        readOnly
        value={quantity}
      />
      <button
        onClick={() => {
          setQuantity(quantity + 1);
          if (!updateCart) return;
          updateCart(bikeId, quantity + 1);
        }}
        className="qty-count qty-count--add"
        type="button"
      >
        +
      </button>
    </div>
  );
};

Quantity.propTypes = {
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
};
