import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { FaEye } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const ShopPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useContext(AuthContext);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const axiosSecure = useAxiosSecure();

  const { data: shop = [] } = useQuery({
    queryKey: ["shop", searchQuery, sortOption],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/myMedicineUp?search=${searchQuery}&sort=${sortOption}`
      );
      return res.data;
    },
  });

  const toggleModal = (medicine) => {
    setSelectedMedicine(medicine);
    setIsModalOpen(!isModalOpen);
  };

  const handleSelect = (medicine) => {
    if (user && user.email) {
      const shopItem = {
        medicineId: medicine._id,
        email: user.email,
        company: medicine.company,
        image: medicine.image,
        price: medicine.price,
        quantity: medicine.quantity,
      };
      axiosSecure.post("/carts", shopItem).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${medicine.name} selected to the cart`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-10">
      <Helmet>
        <title>Health || Shop page</title>
      </Helmet>
      <h1 className="text-2xl font-bold mb-4 text-center">Shop Page</h1>

      <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-4">
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded-md w-full md:w-1/2 lg:w-1/3"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border px-4 py-2 rounded-md w-full md:w-1/2 lg:w-1/3"
        >
          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Image</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Category</th>
              <th className="py-2 px-4 border-b text-left">Price</th>
              <th className="py-2 px-4 border-b text-left">Type</th>
              <th className="py-2 px-4 border-b text-left">Dosage</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shop.map((medicine) => (
              <tr key={medicine._id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">
                  <img
                    src={medicine.image || "https://via.placeholder.com/50"}
                    alt={medicine.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="py-2 px-4 border-b">{medicine.name}</td>
                <td className="py-2 px-4 border-b">{medicine.category}</td>
                <td className="py-2 px-4 border-b">${medicine.price}</td>
                <td className="py-2 px-4 border-b">{medicine.type}</td>
                <td className="py-2 px-4 border-b">{medicine.dosage}</td>
                <td className="py-2 px-4 border-b flex items-center justify-between">
                  <button
                    className="btn btn-sm bg-yellow-300 text-black mr-2"
                    onClick={() => toggleModal(medicine)}
                  >
                    <FaEye />
                  </button>
                  <button
                    onClick={() => handleSelect(medicine)}
                    className="btn btn-sm bg-fuchsia-500 text-white"
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden">
        {shop.map((medicine) => (
          <div key={medicine._id} className="bg-white border border-gray-200 rounded-lg mb-4 p-4">
            <img
              src={medicine.image || "https://via.placeholder.com/150"}
              alt={medicine.name}
              className="w-full h-32 object-cover rounded-md mb-4"
            />
            <h2 className="text-lg font-bold mb-2">{medicine.name}</h2>
            <p><strong>Category:</strong> {medicine.category}</p>
            <p><strong>Price:</strong>{medicine.price}</p>
            <p><strong>Type:</strong> {medicine.type}</p>
            <p><strong>Dosage:</strong> {medicine.dosage}</p>
            <div className="flex justify-between mt-4">
              <button
                className="btn btn-sm bg-yellow-300 text-black"
                onClick={() => toggleModal(medicine)}
              >
                <FaEye />
              </button>
              <button
                onClick={() => handleSelect(medicine)}
                className="btn btn-sm bg-fuchsia-500 text-white"
              >
                Select
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedMedicine && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Medicine Details</h2>
            <img
              src={selectedMedicine.image || "https://via.placeholder.com/150"}
              alt={selectedMedicine.name}
              className="mb-4 w-full h-48 object-cover rounded-md"
            />
            <p><strong>Name:</strong> {selectedMedicine.name}</p>
            <p><strong>Description:</strong> {selectedMedicine.description}</p>
            <p><strong>Category:</strong> {selectedMedicine.category}</p>
            <p><strong>Price:</strong> ${selectedMedicine.price}</p>
            <p><strong>Type:</strong> {selectedMedicine.type}</p>
            <p><strong>Dosage:</strong> {selectedMedicine.dosage}</p>
            <button
              className="btn bg-sky-500 text-white mt-4 w-full"
              onClick={toggleModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-end mt-4">
        <button className="btn btn-ghost bg-slate-400">
          <Link to="/">Back</Link>
        </button>
      </div>
    </div>
  );
};

export default ShopPage;
