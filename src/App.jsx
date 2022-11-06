import { Routes, Route } from "react-router-dom";

// Pages
import { Home } from "./pages/Home/Home";
import { Bike } from "./pages/Bike/Bike";
import { Brand } from "./pages/Brand/Brand";
import { BrandName } from "./pages/Brand/BrandName/BrandName";
import { FavouritesProvider } from "./hooks/FavouritesContext";

export const App = () => {
  return (
    <FavouritesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bike/:bikeId" element={<Bike />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/brand/:brandName" element={<BrandName />} />
      </Routes>
    </FavouritesProvider>
  );
};
