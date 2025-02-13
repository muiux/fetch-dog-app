import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./axios";
import { SearchDogsRequest } from "../types";

const QUERY_KEY = "dogs";

export const useBreeds = () => {
  return useQuery({
    queryKey: [QUERY_KEY, "breeds"],
    queryFn: async () => {
      const response = await axiosInstance.get("/dogs/breeds");
      return response.data as string[];
    },
  });
};

export const useSearchDogs = (params: SearchDogsRequest) => {
  return useQuery({
    queryKey: [QUERY_KEY, params],
    queryFn: async () => {
      const response = await axiosInstance.get("/dogs/search", { params });
      return response.data;
    },
    staleTime: 5000, // Keep previous data for 5 seconds while loading new page data
  });
};

export const useDogDetails = <T>(ids: string[]) => {
  return useQuery({
    queryKey: [QUERY_KEY, "details", ids],
    queryFn: async () => {
      const response = await axiosInstance.post("/dogs", ids);
      return response.data as T;
    },
    enabled: 0 < ids.length && ids.length <= 100, // Only fetch if IDs are provided
  });
};

export const useGenerateMatch = () => {
  return useMutation({
    mutationFn: (dogIds: string[]) =>
      axiosInstance
        .post("/dogs/match", dogIds)
        .then((response) => response.data)
        .then((response) => response.match),
  });
};
