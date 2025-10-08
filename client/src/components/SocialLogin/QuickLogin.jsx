import { useContext } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const QuickLogin = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  // আগে থেকে তৈরি ইউজারের password
  const users = {
    "admin70@gmail.com": "najim12",
    "seller@gmail.com": "najim12",
    "buyer@gmail.com": "najim12",
  };

  const handleQuickLogin = async (email) => {
    const password = users[email]; // password fetch
    if (!password) {
      toast.error("User not found!");
      return;
    }

    try {
      await loginUser(email, password);
      toast.success(`${email} logged in successfully!`);
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Quick login error:", error);
      toast.error("Login failed!");
    }
  };

  return (
    <div className="flex justify-center gap-4 mb-6">
      <button
        onClick={() => handleQuickLogin("admin70@gmail.com")}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Admin
      </button>
      <button
        onClick={() => handleQuickLogin("seller@gmail.com")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Seller
      </button>
      <button
        onClick={() => handleQuickLogin("buyer@gmail.com")}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        Buyer
      </button>
    </div>
  );
};

export default QuickLogin;
