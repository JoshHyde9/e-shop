import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Icon } from "../Icon/Icon";

import styles from "./Card.module.scss";

/**
 * @param {{bike: {brand: string, name: string, colours: string[], sizes: string[], price: number, quantity: number, image_url: string}}} props
 */
export const Card = ({ bike }) => {
  return (
    <div className={styles.gallery_item}>
      <div className={styles.favourite}>
        <Icon icon="favourite" size="40px" strokeColour="#ff0000" />
      </div>

      <Link to={`/bike/${bike.id}`}>
        <img className={styles.image} src={bike.image_url} alt={bike.name} />
      </Link>
      <div className={styles.more__info}>
        <h3 className={styles.brand}>{bike.brand}</h3>
        <h4 className={styles.name}>{bike.name}</h4>

        <p>${bike.price.toLocaleString()}</p>
        <div className={styles.util}>
          <div className={styles.icon}>
            {bike.quantity > 0 ? (
              <>
                <Icon icon="inStock" size="30px" strokeColour="#00a300" />
                <p>In Stock</p>
              </>
            ) : (
              <>
                <Icon icon="outOfStock" size="30px" strokeColour="#e1341e" />
                <p>Out of stock</p>
              </>
            )}
          </div>
          <div>
            <Icon icon="addToCart" size="30px" strokeColour="#4d4d4d" />
          </div>
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
