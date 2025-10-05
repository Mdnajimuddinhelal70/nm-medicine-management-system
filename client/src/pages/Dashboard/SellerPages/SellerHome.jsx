import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const SellerHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: stats } = useQuery({
    queryKey: ["seller-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/seller-stats");
      return res.data;
    },
  });

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
          <div className="text-lg font-semibold text-gray-700 mb-2">Total Revenue</div>
          <div className="text-2xl font-bold text-gray-900">${stats?.revenue}</div>
        </div>

        <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <div className="text-lg font-semibold text-gray-700 mb-2">Total Paid</div>
          <div className="text-2xl font-bold text-green-600">${stats?.totalPaid}</div>
        </div>

        <div className="flex-1 bg-gray-50 p-4 rounded-lg shadow-md flex flex-col items-center">
          <div className="text-lg font-semibold text-gray-700 mb-2">Total Pending</div>
          <div className="text-2xl font-bold text-red-600">${stats?.totalPending}</div>
        </div>
      </div>
    </div>
  );
};

export default SellerHome;
