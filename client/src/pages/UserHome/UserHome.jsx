import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const UserHome = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: paymentData, isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payment-history?email=${user?.email}`);
      return res.data;
    },
  });

  const paymentHistory = paymentData?.paymentHistory || [];
  const paidTotal = paymentData?.paidTotal || 0;
  const pendingTotal = paymentData?.pendingTotal || 0;

  return (
    <div className="p-6 space-y-6 bg-white shadow-md rounded-lg">
      <Helmet>
        <title>Health || User Home</title>
      </Helmet>
      <h2 className="text-3xl font-bold text-gray-800">Your Payment History</h2>

      <div className="flex flex-col md:flex-row md:justify-between mb-6 space-y-4 md:space-y-0">
        <div className="flex flex-col items-start">
          <h4 className="text-xl font-semibold text-green-600">
            Paid Total: ${paidTotal}
          </h4>
        </div>
        <div className="flex flex-col items-start">
          <h4 className="text-xl font-semibold text-red-600">
            Pending Total: ${pendingTotal}
          </h4>
        </div>
      </div>

      {/* Display Payment History */}
      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-full table-auto bg-gray-50 rounded-lg shadow-lg">
            <thead className="bg-gray-800 text-white hidden md:table-header-group">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-sm md:text-base">Transaction ID</th>
                <th className="px-4 py-2 text-left font-semibold text-sm md:text-base">Status</th>
                <th className="px-4 py-2 text-left font-semibold text-sm md:text-base">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((payment, idx) => (
                <tr
                  key={payment._id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } hover:bg-gray-200`}
                >
                  <td className="px-4 py-2 text-gray-800 text-sm md:text-base">{payment.transactionId}</td>
                  <td
                    className={`px-4 py-2 font-semibold text-sm md:text-base ${
                      payment.status === "paid"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {payment.status}
                  </td>
                  <td className="px-4 py-2 text-gray-800 text-sm md:text-base">{payment.price}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Responsive Card Layout for Mobile */}
          <div className="md:hidden space-y-4">
            {paymentHistory.map((payment) => (
              <div
                key={payment._id}
                className="bg-gray-50 p-4 rounded-lg shadow-md border border-gray-200"
              >
                <h4 className="text-lg font-semibold text-gray-800">Transaction ID: {payment.transactionId}</h4>
                <p className={`font-semibold ${
                    payment.status === "paid"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {payment.status}
                </p>
                <p className="text-gray-800">Total Price: {payment.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserHome;
