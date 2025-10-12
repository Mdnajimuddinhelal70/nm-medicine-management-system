import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";

const SellerHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["seller-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/seller-stats?email=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p>Data Loading...</p>;
  return (
    <div className="p-6 bg-white shadow-md rounded-lg space-y-6">
      <Helmet>
        <title>Health || Seller Home</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">
        Here are your revenue total paid and total pending
      </h1>
      <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
        <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <div className="text-lg font-semibold text-gray-700 mb-2">
            Total Revenue
          </div>
          <div className="text-2xl font-bold text-gray-900">
            ${stats?.revenue}
          </div>
        </div>

        <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <div className="text-lg font-semibold text-gray-700 mb-2">
            Total Paid
          </div>
          <div className="text-2xl font-bold text-green-600">
            ${stats?.totalPaid}
          </div>
        </div>

        <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <div className="text-lg font-semibold text-gray-700 mb-2">
            Total Pending
          </div>
          <div className="text-2xl font-bold text-red-600">
            ${stats?.totalPending}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
