import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Database
import { getBrandItemsByName } from "../../../services/brand";

// Components
import { Card } from "../../../components/Card/Card";

export const BrandName = () => {
  const { brandName } = useParams();

  const [brandItems, setBrandItems] = useState([]);

  useEffect(() => {
    const getBrand = async () => {
      const data = await getBrandItemsByName(brandName);

      setBrandItems(data);
    };

    getBrand();
  }, []);
  return (
    <div className="gallery">
      {brandItems.map((bike) => (
        <Card key={bike.id} bike={bike} />
      ))}
    </div>
  );
};
