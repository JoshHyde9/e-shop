import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { fixURLParam } from "../../utils/parseURLParam";
import { Icon } from "../Icon/Icon";

import styles from "./Card.module.scss";

/**
 * @param {{bike: {id: string, brand: string, name: string, colours: string[], sizes: string[], price: number, quantity: number, image_url: string}}, handleFavourite: (bikeId: string) => any, favourited: (bikeId: string) => boolean} props
 */
export const Card = ({ bike, handleFavourite, favourited }) => {
  const brandParam = fixURLParam(bike.brand);

  return (
    <div className={styles.gallery_item}>
      <div
        className={styles.favourite}
        onClick={() => handleFavourite(bike.id)}
      >
        <Icon
          icon="favourite"
          size="40px"
          strokeColour="#ff0000"
          fillColour={favourited(bike.id) ? "red" : "none"}
        />
      </div>

      <Link to={`/bike/${bike.id}`}>
        <img className={styles.image} src={bike.image_url} alt={bike.name} />
      </Link>

      <div className={styles.more__info}>
        <Link to={`/brand/${brandParam}`}>
          <h3 className={styles.brand}>{bike.brand}</h3>
        </Link>
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
  handleFavourite: PropTypes.func.isRequired,
  favourited: PropTypes.func.isRequired,
};
