import { useEffect, useState, useContext } from "react";

// Database
import { getAllBiikes } from "../../services/bike";

// Components
import { Card } from "../../components/Card/Card";
import { Carousel } from "../../components/Carousel/Carousel";

// Context
import { FavouritesContext } from "../../hooks/FavouritesContext";

// Styles
import styles from "./Home.module.scss";

export const Home = () => {
  const [, , toggleFavourite, isFavourite] = useContext(FavouritesContext);

  const [bikes, setBikes] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);

  useEffect(() => {
    const getData = async () => {
      // Get all of the bikes from the db
      const data = await getAllBiikes();
      setBikes(data);
    };
    getData();
  }, []);

  useEffect(() => {
    // Grab the first 4 items and push to carousel image array state
    const items = bikes.slice(0, 4);
    setCarouselImages(items);
  }, [bikes]);

  return (
    <div>
      <div className={styles.carousel_container}>
        {carouselImages.length > 0 && <Carousel images={carouselImages} />}
      </div>
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
    </div>
  );
};
