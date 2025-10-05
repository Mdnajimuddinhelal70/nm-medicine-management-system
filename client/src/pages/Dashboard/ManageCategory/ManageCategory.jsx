import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import CategoryModal from "../../Dashboard/ManageCategory/CategoryModal";
import { Helmet } from "react-helmet-async";

const ManageCategory = () => {
  const axiosSecure = useAxiosSecure();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch all categories
  const { isLoading } = useQuery({
    queryKey: ["myMedicine"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/myMedicine");
      setCategories(data);
      return data;
    },
  });

  const handleDelete = async (id) => {
    try {
      await axiosSecure.delete(`/myMedicine/${id}`);
      setCategories((prevCategories) =>
        prevCategories.filter((category) => category._id !== id)
      );

      Swal.fire("Deleted!", "Category has been deleted.", "success");
    } catch (error) {
      Swal.fire("Error!", "Failed to delete category.", "error");
    }
  };

  const handleUpdate = async (updatedCategory) => {
    try {
      const { _id, ...categoryWithoutId } = updatedCategory;

      await axiosSecure.patch(`/myMedicine/${_id}`, categoryWithoutId);

      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category._id === _id
            ? { ...category, ...categoryWithoutId }
            : category
        )
      );

      Swal.fire("Updated!", "Category has been updated.", "success");
    } catch (error) {
      Swal.fire("Error!", "Failed to update category.", "error");
    }
  };

  const handleOpenModal = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
    setShowModal(false);
  };

  const handleSave = (updatedCategory) => {
    handleUpdate(updatedCategory);
    handleCloseModal();
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
    <div className="p-4 md:p-6">
      <Helmet>
        <title>Health || Manage Category</title>
      </Helmet>
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Manage Categories</h2>
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-4"
      >
        Add Category
      </button>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-md">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Image URL</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Name</th>
              <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-2 text-sm">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">{category.name}</td>
                <td className="px-4 py-2 text-sm flex gap-2">
                  <button
                    onClick={() => handleOpenModal(category)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <CategoryModal
          category={selectedCategory}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ManageCategory;
