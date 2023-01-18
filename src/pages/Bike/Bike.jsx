import { useContext } from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

// Components
import { Icon } from "../../components/Icon/Icon";
import { Quantity } from "../../components/Quanity";
import { Selection } from "../../components/Selection/Selection";
import { CartContext } from "../../hooks/CartContext";

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
  const [cart, setCart] = useContext(CartContext);

  const [data, setData] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  const [colour, setColour] = useState("");
  const [size, setSize] = useState("");
  const [cartError, setCartError] = useState({ size: "", colour: "" });

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

  if (quantity <= 0) {
    setQuantity(1);
  }

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
          {bike.quantity && <p>Shop quantity: {bike.quantity}</p>}
        </div>

        {bike.quantity > 0 ? (
          <>
            <div className={styles.option}>
              <Selection
                handleOption={setSize}
                label="Size"
                array={bike.sizes}
              />
              {cartError.size && (
                <p className={styles.option_error}>{cartError.size}</p>
              )}
            </div>

            <div className={styles.option}>
              <Selection
                handleOption={setColour}
                label="Colour"
                array={bike.colours}
              />
              {cartError.colour && (
                <p className={styles.option_error}>{cartError.colour}</p>
              )}
            </div>

            {/* Cart */}
            <div className={styles.cart}>
              <Quantity quantity={quantity} setQuantity={setQuantity} />
              <button
                onClick={() => {
                  if (colour.trim() === "" && size.trim() === "") {
                    return setCartError({
                      size: "Please select a size.",
                      colour: "Please select a colour.",
                    });
                  }

                  if (colour.trim() === "") {
                    return setCartError({
                      colour: "Please select a colour.",
                    });
                  }

                  if (size.trim() === "") {
                    return setCartError({
                      size: "Please select a size.",
                    });
                  }

                  const newCart = cart.slice();

                  // If the item is already in the cart, update the quantity
                  const item = cart.find(({ id }) => id === bike.id);
                  const index = cart.indexOf(item);

                  if (item) {
                    item.quantity = item.quantity + 1;
                    newCart[index] = item;
                    setCart(newCart);
                    return setCartError({ size: "", colour: "" });
                  } else {
                    // If the item is not alreaddy in the cart
                    newCart.push({ id: bike.id, quantity });
                    setCart(newCart);
                    return setCartError({ size: "", colour: "" });
                  }
                }}
                className="btn"
              >
                Add to cart
              </button>
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
