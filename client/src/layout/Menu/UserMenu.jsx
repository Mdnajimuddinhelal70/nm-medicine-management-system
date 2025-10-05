import { useContext } from "react";
import { FaHome } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const UserMenu = () => {
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
          to="/dashboard/userHome"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md flex items-center gap-2 ${
              isActive ? "bg-gray-500" : "hover:bg-gray-300"
            }`
          }
        >
          <FaHome />
          User Home
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
          <NavLink />
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

export default UserMenu;
