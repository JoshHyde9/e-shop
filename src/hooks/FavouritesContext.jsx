import { useState, useEffect, createContext } from "react";

export const FavouritesContext = createContext();

const getInitialState = () => {
  const favourites = localStorage.getItem("favourites");
  return favourites ? JSON.parse(favourites) : [];
};

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  return (
    <FavouritesContext.Provider value={[favourites, setFavourites]}>
      {children}
    </FavouritesContext.Provider>
  );
};
