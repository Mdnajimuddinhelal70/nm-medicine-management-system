import { useState } from "react";

const CategoryModal = ({ category, onClose, onSave }) => {
  const [categoryName, setCategoryName] = useState(category?.name || "");
  const [categoryImageUrl, setCategoryImageUrl] = useState(category?.image || "");

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedCategory = {
      ...category,
      name: categoryName,
      image: categoryImageUrl,
    };

    onSave(updatedCategory);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="bg-white p-4 rounded-md shadow-md w-1/3">
        <h3 className="text-lg font-bold mb-4">
          {category ? "Edit Category" : "Add Category"}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Category Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Category Image URL
            </label>
            <input
              type="text"
              value={categoryImageUrl}
              onChange={(e) => setCategoryImageUrl(e.target.value)}
              required
              className="border px-2 py-1 rounded w-full"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoryModal;
