import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { CSVLink } from "react-csv";
import useAxiosSecure from "./../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const SalesReport = () => {
  const axiosSecure = useAxiosSecure();
  const [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });

  const { data: sales = [] } = useQuery({
    queryKey: ["sales-report"],
    queryFn: async () => {
      const res = await axiosSecure.get("/sales-reports");
      return res.data;
    },
  });

  // Date range filter
  const filteredSales = sales.filter((sale) => {
    const saleDate = moment(sale.date);
    const startDate = dateRange.startDate ? moment(dateRange.startDate) : null;
    const endDate = dateRange.endDate ? moment(dateRange.endDate) : null;

    return (
      (!startDate || saleDate.isSameOrAfter(startDate)) &&
      (!endDate || saleDate.isSameOrBefore(endDate))
    );
  });

  // Columns for DataTable
  const columns = [
    {
      name: "Medicine Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Seller Email",
      selector: (row) => row.sellerEmail,
      sortable: true,
    },
    {
      name: "Buyer Email",
      selector: (row) => row.buyerEmail,
      sortable: true,
    },
    {
      name: "Total Price",
      selector: (row) => `$${row.totalPrice}`,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => moment(row.date).format("YYYY-MM-DD"),
      sortable: true,
    },
  ];

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Sales Report</h2>
      <Helmet>
        <title>Health || Sales Report</title>
      </Helmet>
      <div className="mb-4 flex gap-4">
        <div>
          <label className="block text-gray-700">Start Date:</label>
          <input
            type="date"
            value={dateRange.startDate}
            onChange={(e) =>
              setDateRange({ ...dateRange, startDate: e.target.value })
            }
            className="input input-bordered"
          />
        </div>
        <div>
          <label className="block text-gray-700">End Date:</label>
          <input
            type="date"
            value={dateRange.endDate}
            onChange={(e) =>
              setDateRange({ ...dateRange, endDate: e.target.value })
            }
            className="input input-bordered"
          />
        </div>
      </div>

      {/* DataTable */}
      <DataTable
        columns={columns}
        data={filteredSales}
        pagination
        highlightOnHover
      />

      {/* CSV Download Button */}
      <div className="mt-4">
        <CSVLink
          data={filteredSales}
          filename="sales-report.csv"
          className="btn btn-primary"
        >
          Download CSV
        </CSVLink>
      </div>
    </div>
  );
};

export default SalesReport;
