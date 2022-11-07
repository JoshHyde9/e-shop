import { useEffect, useState, useContext } from "react";

// Database
import { getAllBiikes } from "../../services/bike";

// Components
import { Card } from "../../components/Card/Card";

// Context
import { FavouritesContext } from "../../hooks/FavouritesContext";

// Styles
import styles from "./Home.module.scss";

export const Home = () => {
  const [, , toggleFavourite, isFavourite] = useContext(FavouritesContext);

  const [bikes, setBikes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllBiikes();
      setBikes(data);
    };
    getData();
  }, []);

  return (
    <div className={styles.gallery}>
      {bikes.map((bike) => (
        <Card
          key={bike.id}
          bike={bike}
          handleFavourite={toggleFavourite}
          favourited={isFavourite}
        />
      ))}
    </div>
  );
};
