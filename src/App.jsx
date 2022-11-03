import { Routes, Route } from "react-router-dom";

// Pages
import { Home } from "./pages/Home/Home";
import { Bike } from "./pages/Bike";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/bike/:bikeId" element={<Bike />} />
    </Routes>
  );
};
