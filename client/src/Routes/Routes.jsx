import { createBrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import UpdateProfile from "../components/UpdateProfile/UpdateProfile";
import CategoryDetails from "../pages/Home/Category/CategoryDetails";
import Carts from "../pages/Carts/Carts";
import ShopPage from "../pages/ShopPage/ShopPage";
import Payment from "../pages/CheckoutForm/Payment";
import InvoicePage from "../components/Invoice/InvoicePage";
import Dashboard from "../layout/Dashboard";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import ManageCategory from "../pages/Dashboard/ManageCategory/ManageCategory";
import PaymentManagement from "../pages/Dashboard/PaymentManagement/PaymentManagement";
import SalesReport from "../pages/Dashboard/SalesReport/SalesReport";
import ManageBanner from "../pages/Dashboard/ManageBanner/ManageBanner";
import SellerHome from "../pages/Dashboard/SellerPages/SellerHome";
import ManageMedicine from "../pages/Dashboard/SellerPages/ManageMedicine";
import PaymentHistory from "../pages/Dashboard/SellerPages/PaymentHistory";
import SellerAdvertise from "../pages/Dashboard/SellerPages/SellerAdvertise";
import UserHome from "../pages/UserHome/UserHome";
import NotFound from "../components/NotFound/NotFound";
import PrivateRoute from "./PrivateRoute";
import About from "../pages/About/About";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFound />,
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/updateProfile",
        element: <UpdateProfile />,
      },
      {
        path: "/categoryDetails/:categoryName",
        element: <CategoryDetails />,
      },
      {
        path: "/carts",
        element: (
          <PrivateRoute>
            <Carts />
          </PrivateRoute>
        ),
      },
      {
        path: "/shopPage",
        element: (
          <PrivateRoute>
            <ShopPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/invoice",
        element: <InvoicePage />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard />,
    children: [
      {
       path: 'adminHome',
        element: <AdminHome />,
      },
      {
        path: "manageUsers",
        element: <ManageUsers />,
      },
      {
        path: "manageCategory",
        element: <ManageCategory />,
      },
      {
        path: "paymentManagement",
        element: <PaymentManagement />,
      },
      {
        path: "salesReport",
        element: <SalesReport />,
      },
      {
        path: "manageBanner",
        element: <ManageBanner />,
      },

      
      // Seller list from here
      {
        path: "sellerHome",
        element: <SellerHome />,
      },
      {
        path: "manageMedicines",
        element: <ManageMedicine />,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
      {
        path: "sellerAdvertise",
        element: <SellerAdvertise />,
      },
      //user start here
      {
        path: "userHome",
        element: <UserHome />,
      },
    ],
  },
]);
