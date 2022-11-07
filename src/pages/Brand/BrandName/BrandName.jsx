import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";

import { FavouritesContext } from "../../../hooks/FavouritesContext";

// Database
import { getBrandItemsByName } from "../../../services/brand";

// Components
import { Card } from "../../../components/Card/Card";

// Component styles
import styles from "../../Home/Home.module.scss";

export const BrandName = () => {
  const { brandName } = useParams();

  const [, , toggleFavourite, isFavourite] = useContext(FavouritesContext);

  const [brandItems, setBrandItems] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getBrand = async () => {
      const data = await getBrandItemsByName(brandName);

      if (!data) {
        return setError("Brand does not exist");
      }

      setBrandItems(data);
    };

    getBrand();
  }, []);
  return (
    <>
      {error ? (
        <h1 className="error">Brand not found.</h1>
      ) : (
        <div className={styles.gallery}>
          {brandItems.map((bike) => (
            <Card
              key={bike.id}
              bike={bike}
              handleFavourite={toggleFavourite}
              favourited={isFavourite}
            />
          ))}
        </div>
      )}
    </>
  );
};
