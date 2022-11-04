import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Database
import { getAllBrands } from "../../services/brand";

// Util
import { fixURLParam } from "../../utils/parseURLParam";

// Styles
import homeStyles from "../Home/Home.module.scss";
import brandStyles from "./Brand.module.scss";

export const Brand = () => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getAllBrands();
      setBrands(data);
    };

    getData();
  }, []);

  return (
    <div className={homeStyles.gallery}>
      {brands.map((brand) => {
        const fixedBrandParam = fixURLParam(brand.name);
        return (
          <Link key={brand.id} to={`/brand/${fixedBrandParam}`}>
            <div className={brandStyles.gallery__item}>
              <div className={brandStyles.image__container}>
                <img
                  className={brandStyles.image}
                  src={brand.image_url}
                  alt={brand.name}
                />
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};
