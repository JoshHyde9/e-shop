import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";
import NavBar from "./components/Layout/Navbar";

import { CartProvider } from "./hooks/CartContext";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <NavBar />
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
