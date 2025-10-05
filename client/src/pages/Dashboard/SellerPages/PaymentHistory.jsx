import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const PaymentHistory = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: paymentHistory, isLoading } = useQuery({
    queryKey: ["paymentHistory", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?sellerEmail=${user?.email}`);
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
          <span className="loading loading-bars loading-lg"></span>
        </p>
      </div>
    );
  }
  return (
    <div className="p-6 bg-white shadow-md rounded-md min-h-screen">
      <Helmet>
        <title>Health || Payment History</title>
      </Helmet>
      <h2 className="text-3xl font-bold mb-6 text-blue-900">Payment History</h2>

      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-100 rounded-md">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="py-3 px-4 text-left">Buyer Email</th>
                <th className="py-3 px-4 text-left">Price</th>
                <th className="py-3 px-4 text-left">Transaction ID</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory?.map((payment) => (
                <tr
                  key={payment._id}
                  className="bg-white border-b hover:bg-gray-100"
                >
                  <td className="py-3 px-4">{payment?.buyerEmail}</td>
                  <td className="py-3 px-4">${payment?.price.toFixed(2)}</td>
                  <td className="py-3 px-4">{payment?.transactionId}</td>
                  <td
                    className={`py-3 px-4 font-semibold ${
                      payment.status === "paid"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {payment.status}
                  </td>
                  <td className="py-3 px-4">
                    {new Date(payment.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden">
        {paymentHistory?.map((payment) => (
          <div
            key={payment._id}
            className="bg-white shadow-md rounded-lg mb-4 p-4 border"
          >
            <h3 className="text-lg font-semibold mb-2">{payment.buyerEmail}</h3>
            <p className="text-gray-600 mb-1">
              Price: ${payment.price.toFixed(2)}
            </p>
            <p className="text-gray-600 mb-1">
              Transaction ID: {payment.transactionId}
            </p>
            <p
              className={`font-semibold mb-1 ${
                payment.status === "paid" ? "text-green-500" : "text-red-500"
              }`}
            >
              Status: {payment.status}
            </p>
            <p className="text-gray-600">
              Date: {new Date(payment.date).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
