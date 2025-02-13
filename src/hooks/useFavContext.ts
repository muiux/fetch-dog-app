import { createContext, useContext } from "react";
import { FavContextProps } from "../contexts/FavContext";

export const FavContext = createContext<FavContextProps | undefined>(undefined);

export const useFavContext = (): FavContextProps => {
  const context = useContext(FavContext);
  if (!context) {
    throw new Error("useFavContext must be used within a FavProvider");
  }
  return context;
};
