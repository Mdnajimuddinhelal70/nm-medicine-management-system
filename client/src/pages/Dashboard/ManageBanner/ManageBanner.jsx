import { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const ManageBanner = () => {
  const axiosSecure = useAxiosSecure();
  const [advertises, setAdvertises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdvertises = async () => {
      try {
        const res = await axiosSecure.get("/advertise");
        setAdvertises(res.data);
      } catch (error) {
        toast.error("Failed to fetch advertisements");
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdvertises();
  }, [axiosSecure]);

  const handleToggle = async (id, addedToSlider) => {
    try {
      await axiosSecure.patch(`/advertise/${id}`, { addedToSlider });
      setAdvertises((prevAdvertises) =>
        prevAdvertises.map((ad) =>
          ad._id === id ? { ...ad, addedToSlider } : ad
        )
      );
      toast.success("Advertisement status updated! from Home Slider");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

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
    <div className="p-6">
      <Helmet>
        <title>Health || Banner Advertise</title>
      </Helmet>
      <h2 className="text-2xl font-semibold mb-4">Manage Banner Advertise</h2>
      <table className="min-w-full mt-4">
        <thead>
          <tr>
            <th>Medicine Image</th>
            <th>Description</th>
            <th>Seller Email</th>
            <th>Toggle Slider</th>
          </tr>
        </thead>
        <tbody>
          {advertises.map((ad) => (
            <tr key={ad._id}>
              <td>
                <img
                  src={ad?.medicineImage}
                  alt={ad?.medicineName}
                  className="h-12 w-16 rounded-md my-3"
                />
              </td>

              <td>{ad.description}</td>
              <td>{ad.sellerEmail}</td>
              <td>
                <Switch
                  checked={ad.addedToSlider}
                  onChange={() => handleToggle(ad._id, !ad.addedToSlider)}
                  className={`${
                    ad.addedToSlider ? "bg-blue-600" : "bg-gray-200"
                  } relative inline-flex items-center h-6 rounded-full w-11`}
                >
                  <span
                    className={`${
                      ad.addedToSlider ? "translate-x-6" : "translate-x-1"
                    } inline-block w-4 h-4 transform bg-white rounded-full`}
                  />
                </Switch>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageBanner;
