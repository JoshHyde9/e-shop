import { useEffect, useState } from "react";
import { useContext } from "react";

import { Card } from "../../components/Card/Card";

import { FavouritesContext } from "../../hooks/FavouritesContext";
import { getAllFavourites } from "../../services/bike";

import styles from "./Favourites.module.scss";

export const Favourites = () => {
  const [favourites, , handleFavourite, isFavourite] =
    useContext(FavouritesContext);

  const [dbFavourites, setdbFavourites] = useState([]);

  useEffect(() => {
    const getFavourites = async () => {
      const data = await getAllFavourites(favourites);

      setdbFavourites(data);
    };

    getFavourites();
  }, [favourites]);

  return !dbFavourites ? (
    <h1 className="error">
      Pressing the heart icon will make favourited items appear here.
    </h1>
  ) : (
    <div className={styles.gallery}>
      {dbFavourites.map((bike) => (
        <Card
          key={bike.id}
          bike={bike}
          handleFavourite={handleFavourite}
          favourited={isFavourite}
        />
      ))}
    </div>
  );
};
