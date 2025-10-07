import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const { loginUser, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    loginUser(email, password)
      .then(() => {
        toast.success("Logged in successfull.");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        toast.error("Something went wrong!");
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        navigate(from, { replace: true });

        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          role: "user",
        };

        axiosPublic
          .post("/users", userInfo)
          .then(() => {
            toast.success("Logged in successfull.");
          })
          .catch(() => {
            toast.error("Something went wrong! Please try again.");
          });
      })
      .catch(() => {
        toast.error("Google Login Failed");
      });
  };

  return (
    <div className="hero min-h-screen flex items-center justify-center">
      <Helmet>
        <title>Volunteer || Login</title>
      </Helmet>

      <div className="card w-full max-w-xl bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="p-8 lg:p-10 bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-500">
          <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
            Welcome Back!
          </h2>

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Email Input */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
            </div>

            {/* Password Input */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text text-gray-700">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 mt-8 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Login Button */}
            <div className="form-control mt-6">
              <input
                className="btn btn-outline w-full transition duration-200"
                type="submit"
                value="Login"
              />
            </div>

            {/* Google Sign-in */}
            <div>
              <button
                type="button"
                className="btn btn-outline w-full mt-2 flex items-center justify-center gap-2"
                onClick={handleGoogleLogin}
              >
                <FaGoogle /> Sign in with Google
              </button>
            </div>

            {/* Sign Up Link */}
            <p className="text-center mt-4 text-black">
              New here?{" "}
              <Link to="/register" className="text-blue-800 font-bold ml-2">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
