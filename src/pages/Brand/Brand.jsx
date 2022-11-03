import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBrands } from "../../services/brand";
import { fixURLParam } from "../../utils/parseURLParam";

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
    <div>
      <h1>This is where all of the brands are</h1>
      {brands.map((brand) => {
        const fixedBrandParam = fixURLParam(brand.name);
        return (
          <div key={brand.id}>
            <Link to={`/brand/${fixedBrandParam}`}>
              <img src={brand.image_url} alt={brand.name} />
              <h3>{brand.name}</h3>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
