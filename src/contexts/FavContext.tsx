import React, { useState, ReactNode } from "react";
import { FavContext } from "../hooks/useFavContext";

export interface FavContextProps {
  favorites: string[];
  addFavorite: (id: string) => void;
  removeFavorite: (id: string) => void;
}

export const FavProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const addFavorite = (id: string) => {
    setFavorites((prevFavorites) => [...prevFavorites, id]);
  };

  const removeFavorite = (id: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((favId) => favId !== id)
    );
  };

  return (
    <FavContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavContext.Provider>
  );
};
