import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);

  const { data: stats } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  return (
    <div className="p-6">
      <Helmet>
        <title>Health || Admin Home</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4">
        Hi, Welcome {user?.displayName}
      </h1>
      <div className="flex flex-col md:flex-row md:space-x-4">
        <div className="stats shadow bg-white p-4 rounded-md w-full md:w-1/3 mb-4 md:mb-0">
          <div className="stat place-items-center">
            <div className="stat-title text-sm md:text-base">Total Revenue</div>
            <div className="stat-value text-xl md:text-2xl">${stats?.revenue}</div>
            <div className="stat-desc text-xs md:text-sm">From January 1st to February 1st</div>
          </div>
        </div>

        <div className="stats shadow bg-white p-4 rounded-md w-full md:w-1/3 mb-4 md:mb-0">
          <div className="stat place-items-center">
            <div className="stat-title text-sm md:text-base">Total Paid</div>
            <div className="stat-value text-xl md:text-2xl text-secondary">{stats?.totalPaid}</div>
            <div className="stat-desc text-xs md:text-sm text-secondary">↗︎ 40 (2%)</div>
          </div>
        </div>

        <div className="stats shadow bg-white p-4 rounded-md w-full md:w-1/3">
          <div className="stat place-items-center">
            <div className="stat-title text-sm md:text-base">Total Pending</div>
            <div className="stat-value text-xl md:text-2xl">{stats?.totalPending}</div>
            <div className="stat-desc text-xs md:text-sm">↘︎ 90 (14%)</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
