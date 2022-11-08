import PropTypes from "prop-types";
import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./Carousel.module.scss";

/**
 * @param {{images: string[]}} props
 * @returns
 */
export const Carousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleLeft = () => {
    const isFirstSlide = currentSlide === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentSlide - 1;
    setCurrentSlide(newIndex);
  };

  const handleRight = () => {
    const isLastSlide = currentSlide === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentSlide + 1;
    setCurrentSlide(newIndex);
  };

  return (
    <div className={styles.carousel_image_container}>
      <div onClick={handleLeft} className={styles.left_arrow}>
        ❮
      </div>
      <Link to={`/bike/${images[currentSlide].id}`}>
        <div
          className={styles.carousel__image}
          style={{ backgroundImage: `url(${images[currentSlide].image_url})` }}
        ></div>
      </Link>
      <div onClick={handleRight} className={styles.right_arrow}>
        ❱
      </div>
      <div className={styles.click_container}>
        {images.map((image, i) => (
          <div
            className={currentSlide === i ? styles.active : ""}
            key={image.id}
            onClick={() => setCurrentSlide(i)}
          >
            •
          </div>
        ))}
      </div>
    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};
