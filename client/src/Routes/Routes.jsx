import { createBrowserRouter } from "react-router-dom";
import InvoicePage from "../components/Invoice/InvoicePage";
import NotFound from "../components/NotFound/NotFound";
import UpdateProfile from "../components/UpdateProfile/UpdateProfile";
import Dashboard from "../layout/Dashboard";
import Main from "../Main/Main";
import About from "../pages/About/About";
import Carts from "../pages/Carts/Carts";
import Payment from "../pages/CheckoutForm/Payment";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import ManageBanner from "../pages/Dashboard/ManageBanner/ManageBanner";
import ManageCategory from "../pages/Dashboard/ManageCategory/ManageCategory";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import PaymentManagement from "../pages/Dashboard/PaymentManagement/PaymentManagement";
import SalesReport from "../pages/Dashboard/SalesReport/SalesReport";
import ManageMedicine from "../pages/Dashboard/SellerPages/ManageMedicine";
import PaymentHistory from "../pages/Dashboard/SellerPages/PaymentHistory";
import SellerAdvertise from "../pages/Dashboard/SellerPages/SellerAdvertise";
import SellerHome from "../pages/Dashboard/SellerPages/SellerHome";
import CategoryDetails from "../pages/Home/Category/CategoryDetails";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import ShopPage from "../pages/ShopPage/ShopPage";
import UserHome from "../pages/UserHome/UserHome";
import PrivateRoute from "./PrivateRoute";

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
        path: "adminHome",
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
