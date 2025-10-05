<<<<<<< HEAD
import { useContext, useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import Modal from "react-modal";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProvider";
=======
import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "react-modal";
import { FaEye } from "react-icons/fa";
import { AuthContext } from "../../../Providers/AuthProvider";
import Swal from "sweetalert2";
>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c
import useAxiosSecure from "./../../../hooks/useAxiosSecure";

Modal.setAppElement("#root");

const CategoryDetails = () => {
  const { categoryName } = useParams();
  const { user } = useContext(AuthContext);
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const axiosSecure = useAxiosSecure();
<<<<<<< HEAD

  useEffect(() => {
    fetch("http://localhost:5000/myMedicine")
=======
   
  useEffect(() => {
    fetch("https://healthcare-management-server.vercel.app/myMedicine")
>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item) => item.category === categoryName);
        setFilteredMedicines(filtered);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [categoryName]);

  const handleShowModal = (medicine) => {
    setSelectedMedicine(medicine);
    setShowModal(true);
  };

  const handleHideModal = () => {
    setShowModal(false);
    setSelectedMedicine(null);
  };

  const handleAddToCart = (medicine) => {
    if (user && user.email) {
      const cartItem = {
        medicineId: medicine._id,
        email: user.email,
        company: medicine.company,
        image: medicine.image,
        price: medicine.price,
        quantity: medicine.quantity,
      };

      axiosSecure
        .post("/carts", cartItem)
        .then((res) => {
          if (res.data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${medicine.name} added to the cart`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          console.error("Error adding item to cart:", error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to add the item to the cart. Please try again.",
          });
        });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Not Logged In",
        text: "You need to log in to add items to the cart.",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Medicines in {categoryName} Category
      </h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Type
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Price
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredMedicines.map((medicine) => (
            <tr key={medicine._id}>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900 text-xl">
                {medicine.name}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-500">
                {medicine.type}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {medicine.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  className="text-black text-xl mr-4"
                  onClick={() => handleShowModal(medicine)}
                >
                  <FaEye />
                </button>
                <button
                  className="text-orange-400 text-xl"
                  onClick={() => handleAddToCart(medicine)}
                >
                  Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal
        isOpen={showModal}
        onRequestClose={handleHideModal}
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        contentLabel="Medicine Details"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
          <button
            onClick={handleHideModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
          {selectedMedicine && (
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {selectedMedicine.name}
              </h2>
              <img
                src={selectedMedicine.image}
                alt={selectedMedicine.name}
                className="w-full h-[150px] mb-4"
              />
              <p className="text-lg mb-2">{selectedMedicine.description}</p>
              <p className="text-lg font-semibold">
                Price: ${selectedMedicine.price}
              </p>
              <p className="text-lg">Dosage: {selectedMedicine.dosage}</p>
              <p className="text-lg">Type: {selectedMedicine.type}</p>
            </div>
          )}
          <button
            onClick={handleHideModal}
            className="btn bg-sky-500 text-white mt-4"
          >
            Close
          </button>
        </div>
      </Modal>

      <div className="flex justify-end p-4">
        <button className="btn btn-ghost bg-slate-400">
          <Link to="/">Back</Link>
        </button>
      </div>
    </div>
  );
};

export default CategoryDetails;
