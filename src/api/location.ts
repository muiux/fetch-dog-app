import { useMutation } from "@tanstack/react-query";
import { Coordinates } from "../types";
import { axiosInstance } from "./axios";

export const useLocationsByZipCodes = () => {
  return useMutation({
    mutationFn: (zipCodes: string[]) =>
      axiosInstance.post("/locations", zipCodes),
  });
};

export const useSearchLocations = () => {
  return useMutation({
    mutationFn: (filters: {
      city?: string;
      states?: string[];
      geoBoundingBox?: {
        top?: Coordinates;
        left?: Coordinates;
        bottom?: Coordinates;
        right?: Coordinates;
        bottom_left?: Coordinates;
        top_left?: Coordinates;
        bottom_right?: Coordinates;
        top_right?: Coordinates;
      };
      size?: number;
      from?: number;
    }) => axiosInstance.post("/locations/search", filters),
  });
};
