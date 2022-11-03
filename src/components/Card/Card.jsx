import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import styles from "./Card.module.scss";

/**
 * @param {{bike: {brand: string, name: string, colours: string[], sizes: string[], price: number, quantity: number, image_url: string}}} props
 */
export const Card = ({ bike }) => {
  return (
    <div className={styles.gallery_item}>
      <p className={styles.favourite}>Favourite</p>
      <Link to={`/bike/${bike.id}`}>
        <img className={styles.image} src={bike.image_url} alt={bike.name} />
      </Link>
      <div className={styles.more__info}>
        <h3 className={styles.brand}>{bike.brand}</h3>
        <h4 className={styles.name}>{bike.name}</h4>

        <p>${bike.price.toLocaleString()}</p>
        <div className={styles.util}>
          <p>{bike.quantity > 0 ? "In stock" : "Out of stock"}</p>
          <p>Add to cart</p>
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
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
