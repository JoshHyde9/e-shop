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

  const [data, setData] = useState({});
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

        {/* TODO: Turn selection into component */}
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

        {/* TODO: Turn selection into component */}
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
            {/* TODO: Turn input into a component */}
            <div className="qty-input">
              <button className="qty-count qty-count--minus" type="button">
                -
              </button>
              <input
                className="product-qty"
                name="quantity"
                type="number"
                defaultValue={1}
              />
              <button className="qty-count qty-count--add" type="button">
                +
              </button>
            </div>
            <button className="btn">Add to cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};
