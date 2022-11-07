import { useState, useEffect, createContext } from "react";

export const FavouritesContext = createContext();

const getInitialState = () => {
  const favourites = localStorage.getItem("favourites");
  return favourites ? JSON.parse(favourites) : [];
};

export const FavouritesProvider = ({ children }) => {
  const [favourites, setFavourites] = useState(getInitialState);

  const toggleFavourite = (bikeId) => {
    const index = favourites.indexOf(bikeId);

    const newFavourites = favourites.slice();

    if (index > -1) {
      newFavourites.splice(index, 1);
    } else {
      newFavourites.push(bikeId);
    }

    setFavourites(newFavourites);
    localStorage.setItem("favourites", JSON.stringify(newFavourites));
  };

  const isFavourite = (bikeId) => {
    return favourites.indexOf(bikeId) > -1 ? true : false;
  };

  useEffect(() => {
    localStorage.setItem("favourites", JSON.stringify(favourites));
  }, [favourites]);

  return (
    <FavouritesContext.Provider
      value={[favourites, setFavourites, toggleFavourite, isFavourite]}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
