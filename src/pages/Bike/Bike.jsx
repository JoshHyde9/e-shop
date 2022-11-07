import { useContext } from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Components
import { Icon } from "../../components/Icon/Icon";
import { Quantity } from "../../components/Quanity";

import { FavouritesContext } from "../../hooks/FavouritesContext";

// Db
import { getBikeById } from "../../services/bike";

// Util
import { fixURLParam } from "../../utils/parseURLParam";

// Styles
import styles from "./Bike.module.scss";

export const Bike = () => {
  const { bikeId } = useParams();
  const [, , toggleFavourite, isFavourite] = useContext(FavouritesContext);

  const [data, setData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const getBike = async () => {
      const data = await getBikeById(bikeId);

      if (!data) {
        return setError("Bike not found.");
      }

      const urlBikeBrand = fixURLParam(data.brand);

      setData({ url: urlBikeBrand, bike: data });
    };

    getBike();
  }, []);

  if (!data.bike) {
    return <h1 className="error">{error}</h1>;
  }

  const { bike } = data;
  return (
    <div className={styles.bike_layout}>
      <div className={styles.image_container}>
        <div
          className={styles.favourite}
          onClick={() => toggleFavourite(bike.id)}
        >
          <Icon
            icon="favourite"
            size="32"
            strokeColour="#ff0000"
            fillColour={isFavourite(bike.id) ? "red" : "none"}
          />
        </div>
        <img className={styles.image} src={bike.image_url} alt={bike.name} />
      </div>
      <div className={styles.bike_container}>
        <Link className={styles.brand} to={`/brand/${data.url}`}>
          <p>{bike.brand}</p>
        </Link>

        <div className={styles.bike_container__info}>
          <h1>{bike.name}</h1>
          <p className={styles.price}>${bike.price.toLocaleString()}</p>
          <p>Shop quantity: {bike.quantity}</p>
        </div>

        {bike.quantity > 0 ? (
          <>
            <div className={styles.option}>
              <label htmlFor="size">Size: </label>
              <select className="select" name="size">
                <option hidden>Size</option>
                {bike.sizes.map((size, i) => (
                  <option key={i} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.option}>
              <label htmlFor="colour">Colour: </label>
              <select className="select" name="colour">
                <option hidden>Colour</option>
                {bike.colours.map((colour, i) => (
                  <option key={i} value={colour}>
                    {colour}
                  </option>
                ))}
              </select>

              {/* Cart */}
              <div className={styles.cart}>
                <Quantity quantity={quantity} setQuantity={setQuantity} />
                <button className="btn">Add to cart</button>
              </div>
            </div>
          </>
        ) : (
          <div className={styles.out_of_stock}>
            <Icon icon="outOfStock" strokeColour="#ff0000" size="32" />
            <p>Out of stock</p>
          </div>
        )}
      </div>
    </div>
  );
};
