import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "./axios";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: { name: string; email: string }) =>
      axiosInstance.post("/auth/login", data),
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      // You can handle post-logout logic here (e.g., redirect to login page)
      console.log("Logged out successfully");
      window.location.href = "/login";
    },
    onError: (error: unknown) => {
      console.error("Logout failed:", error);
    },
  });
};
