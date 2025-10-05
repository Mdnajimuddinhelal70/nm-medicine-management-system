import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Dialog, Listbox } from "@headlessui/react";
import { Helmet } from "react-helmet-async";

const roles = ["admin", "seller", "user"];

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState("");

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  const handleRoleUpdate = async () => {
    if (selectedUser && selectedRole) {
      axiosSecure
        .patch(`/users/role/${selectedUser._id}`, { role: selectedRole })
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${selectedUser.name} is now a ${selectedRole}`,
              showConfirmButton: false,
              timer: 1500,
            });
            setSelectedUser(null);
            setSelectedRole("");
          }
        });
    }
  };

  return (
    <div className="p-4 md:p-6">
      <Helmet>
        <title>Health || Manage User</title>
      </Helmet>
      <div className="flex flex-col md:flex-row md:justify-between my-4">
        <h2 className="text-lg md:text-2xl font-semibold">All Users</h2>
        <h2 className="text-base md:text-2xl font-medium">Total users: {users.length}</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-2 py-1 md:px-4 md:py-2 text-left text-xs md:text-sm font-medium text-gray-600">#</th>
              <th className="px-2 py-1 md:px-4 md:py-2 text-left text-xs md:text-sm font-medium text-gray-600">Name</th>
              <th className="px-2 py-1 md:px-4 md:py-2 text-left text-xs md:text-sm font-medium text-gray-600">Email</th>
              <th className="px-2 py-1 md:px-4 md:py-2 text-left text-xs md:text-sm font-medium text-gray-600">Role</th>
              <th className="px-2 py-1 md:px-4 md:py-2 text-left text-xs md:text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user._id} className="border-b">
                <td className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">{index + 1}</td>
                <td className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">{user.name}</td>
                <td className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">{user.email}</td>
                <td className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">{user.role}</td>
                <td className="px-2 py-1 md:px-4 md:py-2 text-xs md:text-sm">
                  <button
                    onClick={() => {
                      setSelectedUser(user);
                      setSelectedRole(user.role);
                    }}
                    className="btn btn-md bg-slate-600 text-white flex items-center space-x-2"
                  >
                    <FaEdit className="text-white text-base md:text-xl" /> 
                    <span className="hidden md:inline">Update Role</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <Dialog
          open={true}
          onClose={() => setSelectedUser(null)}
          className="fixed inset-0 z-10 flex items-center justify-center p-4"
        >
          <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
            <Dialog.Title className="text-lg font-semibold mb-4">
              Update Role for {selectedUser.name}
            </Dialog.Title>
            <div className="mt-4">
              <Listbox value={selectedRole} onChange={setSelectedRole}>
                <Listbox.Button className="btn btn-outline w-full text-left">
                  {selectedRole || "Select Role"}
                </Listbox.Button>
                <Listbox.Options className="bg-white border rounded mt-2 shadow-lg">
                  {roles.map((role) => (
                    <Listbox.Option
                      key={role}
                      value={role}
                      className="cursor-pointer p-2 hover:bg-gray-200"
                    >
                      {role}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Listbox>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setSelectedUser(null)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button onClick={handleRoleUpdate} className="btn btn-primary">
                Update
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
};

export default ManageUsers;
