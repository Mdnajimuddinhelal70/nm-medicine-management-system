<<<<<<< HEAD
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log("login data:", data);
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form className="w-full max-w-md" onSubmit={handleSubmit(onSubmit)}>
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt="logo"
            />

            <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">
              Sign In
            </h1>

            {/* Email */}
            <div className="relative flex flex-col mt-8">
              <div className="relative flex items-center">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>

                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                  className={`block w-full py-3 pl-11 pr-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  placeholder="Email address"
                  aria-invalid={errors.email ? "true" : "false"}
                />
              </div>
              <p className="h-4 mt-1 text-xs text-red-500">
                {errors.email?.message}
              </p>
            </div>

            {/* Password */}
            <div className="relative flex flex-col mt-4">
              <div className="relative flex items-center">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>

                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={`block w-full px-10 py-3 pl-11 pr-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  placeholder="Password"
                  aria-invalid={errors.password ? "true" : "false"}
                />
              </div>
              <p className="h-4 mt-1 text-xs text-red-500">
                {errors.password?.message}
              </p>
            </div>

            {/* Submit + Other Options */}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Sign in
              </button>

              <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
                or sign in with
              </p>

              <SocialLogin />
              <div className="mt-6 text-center">
                <Link
                  to="/register"
                  className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                >
                  Don’t have an account yet? Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
=======
import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
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
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User Login successfull",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        // console.log(error);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        navigate(from, { replace: true });
  
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          role: 'user',
        };
  
        axiosPublic.post('/users', userInfo)
          .then(res => {
            
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Logged in successfully!',
              showConfirmButton: false,
              timer: 1500
            });
          })
          .catch(error => {
           
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong! Please try again.',
            });
          });
      })
      .catch(error => {
       
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Google sign-in failed. Please try again.',
        });
      });
  };
  

  return (
    <div className="hero min-h-screen flex items-center justify-center">
      <div className="card w-full max-w-xl bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="p-8 lg:p-10 bg-gradient-to-r from-indigo-500 from-10% via-sky-400 via-30% to-emerald-500 to-90% ...">
          <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
            Welcome Back !
          </h2>
          <Helmet>
            <title>Volunteer || Login</title>
            <link rel="canonical" href="https://www.tacobell.com/" />
          </Helmet>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition duration-200"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-gray-700">Password</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition duration-200"
                required
              />
              <div className="absolute inset-y-0 right-0 flex items-center px-2">
                <button
                  type="button"
                  className="focus:outline-none mr-12 mt-4"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="form-control mt-6">
              <input
                className="btn btn-outline w-full transition duration-200"
                type="submit"
                value="Login"
              />
            </div>
            <div>
              <button
                className="btn btn-outline w-full"
                onClick={handleGoogleLogin}
              >
                Google
                <FaGoogle />
              </button>
            </div>
            <p className="text-center mt-4 text-2xl text-black">
              <small>
                New here? go to
                <Link to="/register" className="text-blue-800 font-bold ml-3">
                  Sign-Up
                </Link>
              </small>
            </p>
          </form>
        </div>
      </div>
>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c
    </div>
  );
};

export default Login;
