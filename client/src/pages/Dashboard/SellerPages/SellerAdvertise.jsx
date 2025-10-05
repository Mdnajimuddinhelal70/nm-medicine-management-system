import React, { useState, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import { Helmet } from "react-helmet-async";
import axios from "axios";

const SellerAdvertise = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    medicineImage: "",
    description: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const { data: advertisements, isLoading } = useQuery({
    queryKey: ["advertisements", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/advertisements?sellerEmail=${user?.email}`
      );
      return res.data;
    },
  });

  const mutation = useMutation({
    mutationFn: (newAd) => axiosSecure.post("/advertisements", newAd),
    onSuccess: () => {
      queryClient.invalidateQueries(["advertisements", user?.email]);
      setIsModalOpen(false);
    },
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      return alert("Please select an image file!");
    }

    const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;
    const uploadFormData = new FormData();
    uploadFormData.append("image", imageFile);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        uploadFormData
      );

      if (data.success) {
        const imageUrl = data.data.display_url;

        const newAdvertisement = {
          sellerEmail: user.email,
          medicineImage: imageUrl,
          description: formData.description,
        };

        mutation.mutate(newAdvertisement);
      }
    } catch (error) {
      console.error("Image upload error:", error);
      alert("Image upload failed. Please try again!");
    }
  };

  const handleInputChange = (e) => {
    if (e.target.name === "medicineImage") {
      setImageFile(e.target.files[0]);
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
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
        <title>Health || Seller Advertise</title>
      </Helmet>
      <h2 className="text-2xl font-semibold mb-4">Advertisements</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Add Advertisement
      </button>

      {isLoading ? (
        <span className="loading loading-bars loading-lg"></span>
      ) : (
        <div className="overflow-x-auto mt-10">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="text-left px-6 py-3 text-gray-600 font-medium">
                  Medicine Image
                </th>
                <th className="text-left px-6 py-3 text-gray-600 font-medium">
                  Description
                </th>
                <th className="text-left px-6 py-3 text-gray-600 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {advertisements?.map((ad) => (
                <tr key={ad._id} className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img
                      src={ad.medicineImage}
                      alt="Medicine"
                      className="w-16 h-10 rounded-lg"
                    />
                  </td>
                  <td className="px-6 py-4">{ad.description}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        ad.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {ad.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
            <h3 className="text-lg font-semibold mb-4">Add Advertisement</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="file"
                  name="medicineImage"
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="border px-2 py-1 rounded w-full"
                ></textarea>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Add Advertisement
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 ml-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerAdvertise;
