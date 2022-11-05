import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Db
import { getBikeById } from "../../services/bike";

// Util
import { fixURLParam } from "../../utils/parseURLParam";

// Styles
import styles from "./Bike.module.scss";

export const Bike = () => {
  const { bikeId } = useParams();

  const [bike, setBike] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const getBike = async () => {
      const data = await getBikeById(bikeId);

      if (!data) {
        return setError("Bike not found.");
      }

      const urlBikeBrand = fixURLParam(data.brand);

      setBike({ url: urlBikeBrand, ...data });
    };

    getBike();
  }, []);

  if (error) {
    return <h1>error</h1>;
  }

  return (
    <div className={styles.bike_layout}>
      <div className={styles.image_container}>
        <img className={styles.image} src={bike.image_url} alt={bike.name} />
      </div>
      <div>
        <Link to={`/brand/${bike.url}`}>
          <p className={styles.brand}>{bike.brand}</p>
        </Link>

        <div>
          <h1>{bike.name}</h1>
          <p>${bike.price && bike.price.toLocaleString()}</p>
          <p>Shop quantity: {bike.quantity}</p>
        </div>

        {/* TODO: Turn selection into component */}
        <div className={styles.option}>
          <label htmlFor="size">Size: </label>
          <select name="" id="">
            {bike.sizes &&
              bike.sizes.map((size, i) => (
                <option key={i} value={size}>
                  {size}
                </option>
              ))}
          </select>
        </div>

        {/* TODO: Turn selection into component */}
        <div className={styles.option}>
          <label htmlFor="colour">Colour: </label>
          <select name="" id="">
            {bike.colours &&
              bike.colours.map((colour, i) => (
                <option key={i} value={colour}>
                  {colour}
                </option>
              ))}
          </select>

          {/* Cart */}
          <div className={styles.cart}>
            {/* TODO: Turn input into a component */}
            <input type="number" defaultValue={1} />
            <button>Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};
