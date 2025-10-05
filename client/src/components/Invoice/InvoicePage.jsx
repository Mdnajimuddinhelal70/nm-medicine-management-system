import { useContext, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../Providers/AuthProvider";
import logo from "../../assets/research.png";
import { FaPrint } from "react-icons/fa";

const InvoicePage = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/inv-payments/${user?.email}`);
      return res.data;
    },
  });

  useEffect(() => {
    // console.log("Payments Data:", payments);
  }, [payments]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-3xl mx-auto p-8 shadow-lg mt-10 mb-10 bg-violet-500">
     
      <div className="flex justify-between items-center mb-8">
        <div>
          <img src={logo} alt="Website Logo" className="h-16" />
        </div>
        <button
          onClick={handlePrint}
          className="flex items-center px-4 py-2 bg-pink-500 text-white font-semibold rounded-md hover:bg-pink-700 transition duration-300"
        >
          <FaPrint className="mr-2" /> Print Invoice
        </button>
      </div>

      {/* User Details */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Invoice</h2>
        <p className="text-lg mt-2">
          <strong>Name:</strong> {user?.displayName || "Anonymous"}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {user?.email || "N/A"}
        </p>
        <p className="text-lg">
          <strong>Date:</strong> {new Date().toLocaleDateString()}
        </p>
      </div>

      {/* Payment Table */}
      <div className="overflow-x-auto mb-8">
        <table className="table-auto w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">#</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Transaction ID</th>
              <th className="border px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr key={payment._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">${payment.price}</td>
                <td className="border px-4 py-2">{payment.transactionId}</td>
                <td className="border px-4 py-2">{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <p className="text-center text-black bg-orange-500 py-3">Thank you for your purchase!</p>
    </div>
  );
};

export default InvoicePage;
