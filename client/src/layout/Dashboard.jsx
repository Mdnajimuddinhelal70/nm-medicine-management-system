import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useRole from "../hooks/useRole";
import AdminMenu from "./Menu/AdminMenu";
import SellerMenu from "./Menu/SellerMenu";
import UserMenu from "./Menu/UserMenu";
import { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";
import { HiX } from "react-icons/hi";

const Dashboard = () => {
  const [role, isLoading] = useRole(); 
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  console.log("Current Role:", role);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };


  useEffect(() => {
    if(!isLoading){
      if(role === 'admin'){
        navigate('/dashboard/adminHome')
      }else if(role === 'seller'){
        navigate('/dashboard/sellerHome')
      }else{
        navigate('/dashboard/userHome')
      }
    }
  },[role, isLoading, navigate])


  if (isLoading) {
    return <div>Loading...</div>;
  }




  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-zinc-400 text-white shadow-md flex flex-col ${
          isSidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 md:w-64 md:static md:overflow-y-auto md:h-screen`}
      >
        <nav className="mt-6">
          <ul
            className={`space-y-4 ${
              isSidebarOpen ? "block" : "hidden md:block"
            }`}
          >
            {role === "admin" && <AdminMenu />}
            {role === "seller" && <SellerMenu />}
            {role === "user" && <UserMenu />}
          </ul>
        </nav>
      </div>

      <button
        onClick={toggleSidebar}
        className="absolute top-4 left-4 z-50 md:hidden text-white bg-zinc-400 p-2 rounded-full"
      >
        {isSidebarOpen ? <HiX size={24} /> : <HiMenu size={24} />}
      </button>

      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-8"
        } md:ml-20 p-4 bg-gray-100 overflow-auto`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
