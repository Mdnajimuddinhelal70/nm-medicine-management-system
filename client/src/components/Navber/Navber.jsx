import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import goodImg from "../../assets/logo/good.png";
import "./Navber.css";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleToggle = (e) => {
    setTheme(e.target.checked ? "dark" : "light");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  const handleLogOut = () => {
    logOut();
  };

  return (
    <nav className="navbar shadow-lg p-4 bg-gradient-to-r from-pink-400 via-indigo-500 to-yellow-400 flex flex-wrap items-center justify-between">
      <div className="flex items-center space-x-2">
        <img src={goodImg} alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
        <Link to="/" className="p-1 md:p-2 rounded-md bg-gray-900">
          <h1 className="text-base md:text-lg lg:text-2xl font-extrabold text-yellow-500 bg-clip-text text-transparent text-center">
            HEALTHCARE MANAGEMENT
          </h1>
        </Link>
      </div>

      <div className="hidden lg:flex navbar-center">
        <ul className="menu menu-horizontal space-x-4">
          <li>
            <Link
              to="/"
              className="text-gray-700 text-lg md:text-xl font-bold hover:text-gray-900"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/shopPage"
              className="text-gray-700 text-lg md:text-xl font-bold hover:text-gray-900"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/carts"
              className="text-gray-700 text-lg md:text-xl font-bold hover:text-gray-900"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-700 text-lg md:text-xl font-bold hover:text-gray-900"
            >
              About Us
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center space-x-4">
        <label className="swap swap-rotate">
          <input
            onChange={handleToggle}
            type="checkbox"
            checked={theme === "dark"}
          />
          <svg
            className="swap-off fill-current w-6 h-6 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
          </svg>
          <svg
            className="swap-on fill-current w-6 h-6 text-gray-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
          </svg>
        </label>

        {user ? (
          <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-8 md:w-10 rounded-full">
                <img alt="User avatar" src={user?.photoURL} />
              </div>
            </button>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-48"
            >
              <li>
                <Link
                  to="/updateProfile"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Update Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogOut}
                  className="text-gray-700 hover:text-gray-900"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <Link
            to="/login"
            className="btn btn-accent text-base md:text-lg bg-yellow-700 hover:bg-yellow-800 border-0 text-white"
          >
            Join Us
          </Link>
        )}
      </div>

      <div className="lg:hidden navbar-end">
        <button
          className="btn btn-square btn-ghost"
          onClick={() =>
            document.getElementById("mobile-menu").classList.toggle("hidden")
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 7.5h16.5m-16.5 7.5h16.5"
            />
          </svg>
        </button>
      </div>

      <div
        id="mobile-menu"
        className="hidden lg:hidden mt-4 p-4 shadow-lg rounded-lg bg-white"
      >
        <ul className="flex flex-col space-y-2">
          <li>
            <Link
              to="/"
              className="text-gray-700 text-lg md:text-xl font-bold hover:text-gray-900"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/shopPage"
              className="text-gray-700 text-lg md:text-xl font-bold hover:text-gray-900"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              to="/carts"
              className="text-gray-700 text-lg md:text-xl font-bold hover:text-gray-900"
            >
              Cart
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="text-gray-700 text-lg md:text-xl font-bold hover:text-gray-900"
            >
              About Us
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
