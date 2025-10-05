import { useContext } from "react";
import { FaHome, FaUsers, FaBoxOpen, FaMoneyBillWave, FaChartLine, FaBullhorn } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const AdminMenu = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full">
      <ul className="flex-1 space-y-2">
        <li>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md flex items-center gap-2 ${
                isActive ? "bg-gray-500 text-white" : "hover:bg-gray-300"
              }`
            }
          >
            <FaHome />
            Admin Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/manageUsers"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md ${
                isActive ? "bg-gray-500 text-white" : "hover:bg-gray-300"
              }`
            }
          >
            <FaUsers />
            Manage Users
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/manageCategory"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md ${
                isActive ? "bg-gray-500 text-white" : "hover:bg-gray-300"
              }`
            }
          >
            <FaBoxOpen />
            Manage Category
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/paymentManagement"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md ${
                isActive ? "bg-gray-500 text-white" : "hover:bg-gray-300"
              }`
            }
          >
            <FaMoneyBillWave />
            Payment Management
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/salesReport"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md ${
                isActive ? "bg-gray-500 text-white" : "hover:bg-gray-300"
              }`
            }
          >
            <FaChartLine />
            Sales Report
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/dashboard/manageBanner"
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-md ${
                isActive ? "bg-gray-500 text-white" : "hover:bg-gray-300"
              }`
            }
          >
            <FaBullhorn />
            Manage Banner Advertise
          </NavLink>
        </li>
      </ul>
      
      <div className="border-t border-gray-300 mt-4 pt-4">
        <ul>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md flex items-center gap-2 ${
                  isActive ? "bg-gray-500 text-white" : "hover:bg-gray-300"
                }`
              }
            >
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/shopPage"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md flex items-center gap-2 ${
                  isActive ? "bg-gray-500 text-white" : "hover:bg-gray-300"
                }`
              }
            >
              <FaBoxOpen />
              Shop Page
            </NavLink>
          </li>
        </ul>
        
        <button
          onClick={handleLogout}
          className="mt-4 w-full bg-fuchsia-500 text-white px-4 py-2 rounded-md hover:bg-pink-950"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default AdminMenu;
