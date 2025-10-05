import { useContext } from "react";
import { FaHome, FaSalesforce } from "react-icons/fa";
import { FaCarTunnel } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const SellerMenu = () => {

  const {logOut} = useContext(AuthContext)
  const navigate = useNavigate()
   const handleLogout = () => {
     logOut()
     navigate('/login')
   }
  return (
    <>
      <li>
        <NavLink
          to="/dashboard/sellerHome"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md flex items-center gap-2 ${
              isActive ? "bg-gray-500" : "hover:bg-gray-300"
            }`
          }
        >
          <FaHome />
          Seller Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/manageMedicines"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md ${
              isActive ? "bg-gray-500" : "hover:bg-gray-300"
            }`
          }
        >
          <FaCarTunnel />
          Manage Medicines
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/paymentHistory"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md ${
              isActive ? "bg-gray-500" : "hover:bg-gray-300"
            }`
          }
        >
          <FaSalesforce />
          Payment History
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/sellerAdvertise"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-2 rounded-md ${
              isActive ? "bg-gray-500" : "hover:bg-gray-300"
            }`
          }
        >
          <FaSalesforce />
          Ask For Advertisement
        </NavLink>
      </li>
      <div className="divider divider-primary"></div>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md flex items-center gap-2 ${
              isActive ? "bg-gray-500" : "hover:bg-gray-300"
            }`
          }
        >
          <NavLink/>
           Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/shopPage"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md flex items-center gap-2 ${
              isActive ? "bg-gray-500" : "hover:bg-gray-300"
            }`
          }
        >
          <NavLink />
          Shop Page
        </NavLink>
      </li>
      <div className="">
        <button
        onClick={handleLogout}
        className="bg-fuchsia-300-500 text-white px-4 py-2 rounded-md hover:bg-pink-950">
         Log Out
        </button>
      </div>
    </>
  );
};

export default SellerMenu;
