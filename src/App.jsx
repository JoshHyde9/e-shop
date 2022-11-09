import { Routes, Route } from "react-router-dom";

// Pages
import { Home } from "./pages/Home/Home";
import { Bike } from "./pages/Bike/Bike";
import { Brand } from "./pages/Brand/Brand";
import { BrandName } from "./pages/Brand/BrandName/BrandName";
import { Favourites } from "./pages/Favourites/Favourites";
import { Cart } from "./pages/Cart/Cart";

// Context
import { FavouritesProvider } from "./hooks/FavouritesContext";
import { CartProvider } from "./hooks/CartContext";

export const App = () => {
  return (
    <CartProvider>
      <FavouritesProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bike/:bikeId" element={<Bike />} />
          <Route path="/brand" element={<Brand />} />
          <Route path="/brand/:brandName" element={<BrandName />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </FavouritesProvider>
    </CartProvider>
  );
};
