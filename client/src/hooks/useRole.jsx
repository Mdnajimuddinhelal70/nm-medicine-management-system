import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email, 
    queryFn: async () => {
      if (user?.email) {
        const { data } = await axiosSecure(`/user/${user.email}`);
        return data.role;
      }
      return null;
    },
  });

  return [role, isLoading];
};

export default useRole;
