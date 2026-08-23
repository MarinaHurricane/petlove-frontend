import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../lib/store/authStore";
import { getUserInfo } from "../../lib/api/user";
import { useEffect } from "react";

export const AuthInitializer = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const logout = useAuthStore((state) => state.logout);

  const { data, isError } = useQuery({
    queryKey: ["user"],
    queryFn: getUserInfo,
    retry: false,
  });

  useEffect(() => {
    if (data) {
      setUser(data);
    }

    if (isError) {
      logout();
    }
  }, [data, isError, setUser, logout]);

  return null;
};
