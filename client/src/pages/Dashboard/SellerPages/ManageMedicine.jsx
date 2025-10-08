import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ManageMedicine = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    image: "",
  });
  const [file, setFile] = useState(null);

  // Fetch medicines
  const { data: medicines = [] } = useQuery({
    queryKey: ["myMedicine", user?.email],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/myMedicine?sellerEmail=${user?.email}`
      );
      return data;
    },
  });

  // Handle form inputs
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Upload image to imgbb
  const uploadImage = async () => {
    if (!file) return "";
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      formData
    );
    return data.data.display_url;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = file ? await uploadImage() : form.image;
      const newMedicine = { ...form, image: imageUrl, sellerEmail: user.email };
      await axiosPublic.post("/myMedicine", newMedicine);

      Swal.fire("Success!", "Medicine added!", "success");
      queryClient.invalidateQueries(["myMedicine", user?.email]);
      setForm({
        name: "",
        image: "",
        category: "",
        price: "",
        type: "",
        dosage: "",
        noOfMedicines: "",
        company: "",
        quantity: "",
      });
      setFile(null);
      setShowForm(false);
    } catch {
      Swal.fire("Error!", "Failed to add medicine!", "error");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Manage Medicines</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-cyan-500 text-white px-4 py-2 rounded-md"
        >
          Add
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Image</th>
              <th className="py-2 px-3">Category</th>
              <th className="py-2 px-3">Price</th>
              <th className="py-2 px-3">description</th>
              <th className="py-2 px-3">type</th>
              <th className="py-2 px-3">dosage</th>
              <th className="py-2 px-3">noOfMedicines</th>
              <th className="py-2 px-3">company</th>
              <th className="py-2 px-3">quantity</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((m) => (
              <tr key={m._id} className="border-b">
                <td className="p-2">
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-2">{m.name}</td>
                <td className="p-2">{m.category}</td>
                <td className="p-2">${m.price}</td>
                <td className="p-2">{m.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-80 shadow-md">
            <h3 className="text-lg font-semibold mb-3">Add Medicine</h3>
            <form onSubmit={handleSubmit} className="space-y-3">
              {[
                "name",
                "category",
                "price",
                "type",
                "dosage",
                "noOfMedicines",
                "company",
                "quantity",
              ].map((field) => (
                <input
                  key={field}
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  placeholder={field[0].toUpperCase() + field.slice(1)}
                  type={
                    field === "price" ||
                    field === "quantity" ||
                    field === "dosage" ||
                    field === "noOfMedicines"
                      ? "number"
                      : "text"
                  }
                  className="border w-full px-3 py-2 rounded"
                  required
                />
              ))}
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 px-3 py-1 rounded"
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

export default ManageMedicine;
