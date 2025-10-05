<<<<<<< HEAD
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import useAuth from "../../hooks/useAuth";

const Register = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  const { createUser } = useAuth();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // optional: watch file to show filename (not required)
  const fileWatch = watch("file");

  return (
    <div className="items-center justify-center">
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md">
            <div className="flex justify-center mx-auto">
              <img
                className="w-auto h-7 sm:h-8"
                src="https://merakiui.com/images/logo.svg"
                alt="logo"
              />
            </div>

            <div className="flex items-center justify-center mt-6">
              <Link
                to="/login"
                className="w-1/3 pb-4 font-medium text-center text-gray-500 capitalize border-b dark:border-gray-400 dark:text-gray-300"
              >
                sign in
              </Link>

              <Link
                to="/register"
                className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-blue-500 dark:border-blue-400 dark:text-white"
              >
                sign up
              </Link>
            </div>

            {/* Username */}
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </span>

                <input
                  type="text"
                  {...register("Username", {
                    required: "Username is required",
                  })}
                  className={`block w-full py-3 pl-11 pr-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
                    errors.Username ? "border-red-500" : ""
                  }`}
                  placeholder="Username"
                  aria-invalid={errors.Username ? "true" : "false"}
                />
              </div>
              {/* fixed height error area */}
              <p className="h-4 mt-1 text-xs text-red-500">
                {errors.Username?.message}
              </p>
            </div>

            {/* File upload */}
            <div className="mt-4">
              <label
                htmlFor="dropzone-file"
                className="flex items-center px-3 py-3 mx-auto text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>

                <h2 className="mx-3 text-gray-400">Profile Photo</h2>

                <input
                  id="dropzone-file"
                  type="file"
                  {...register("file", {
                    required: "File uploading is required",
                  })}
                  className="hidden"
                />
              </label>
              <p className="h-4 mt-1 text-xs text-red-500">
                {errors.file?.message}
              </p>

              {/* optional: show selected filename */}
              {fileWatch && fileWatch.length > 0 && (
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                  Selected: {fileWatch[0].name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="relative flex flex-col mt-6">
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
                  className={`block w-full py-3 pl-11 pr-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
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
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    maxLength: {
                      value: 15,
                      message: "Password must be at most 15 characters",
                    },
                  })}
                  className={`block w-full px-10 py-3 pl-11 pr-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40 ${
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

            <div className="mt-6">
              <button
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Sign Up
              </button>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                >
                  Already have an account?
                </Link>
              </div>
              <SocialLogin />
            </div>
          </form>
        </div>
      </section>
=======
import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import axios from "axios";

const Register = () => {
  const [error, setError] = useState("");
  const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = async (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photo = form.photo.files[0];
    const email = form.email.value;
    const password = form.password.value;

    const formData = new FormData();
    formData.append("image", photo);

    try {
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );

      if (data.success) {
        const photoUrl = data.data.display_url;

        createUser(email, password)
          .then(() => {
            updateUserProfile(name, photoUrl)
              .then(() => {
                const userInfo = {
                  name,
                  email,
                  role: "user",
                };

                axiosPublic.post("/users", userInfo).then((res) => {
                  if (res.data.insertedId) {
                    // console.log(res.data.insertedId)
                    navigate(from, { replace: true });
                    Swal.fire({
                      position: "top-end",
                      icon: "success",
                      title: "User Registration Successful",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                  }
                });
              })
              .catch((error) => {
                console.error("Profile update error:", error.message);
              });
          })
          .catch((error) => {
            console.error("User creation error:", error.message);
          });
      }
    } catch (error) {
      console.error("Image upload error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Image upload failed. Please try again!",
      });
    }
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const userInfo = {
          name: result.user?.displayName,
          email: result.user?.email,
          role: "user",
        };
  
        axiosPublic.post("/users", userInfo)
          .then((res) => {
            console.log("API Response:", res.data);
            if (res.data.insertedId || res.data.acknowledged) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Google Sign-In Successful",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(from, { replace: true });
            } else {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Google Sign-In Successful",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(from, { replace: true });
            }
          })
          .catch((error) => {
            console.error("User info post error:", error.message);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong while saving user data.",
            });
          });
      })
      .catch((error) => {
        console.error("Google Sign-In error:", error.message);
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed",
          text: "Please try again!",
        });
      });
  };
  

  return (
    <div className="hero min-h-screen h-14 mt-16 mb-12 flex items-center justify-center">
      <div className="card w-[700px] max-w-xl bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="p-4 lg:p-4 bg-gradient-to-r from-indigo-900 via-sky-500 to-emerald-500">
          <h2 className="text-xl font-bold text-center mb-6 text-gray-800">
            User Registration!
          </h2>
          <form onSubmit={handleRegister} className="space-y-2 px-10">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-lime-400">Username</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition duration-200"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-lime-400 font-medium">
                  Upload Image
                </span>
              </label>
              <input
                type="file"
                name="photo"
                className="file-input file-input-bordered w-full transition duration-200 bg-black text-white"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text text-xl text-lime-400">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition duration-200"
                required
              />
            </div>
            <div className="form-control relative">
              <label className="label">
                <span className="label-text text-xl text-lime-400">Password</span>
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-blue-500 transition duration-200 pr-12"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none mt-9"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            <div className="form-control mt-6">
              <input
                className="btn btn-outline w-full transition duration-200"
                type="submit"
                value="Register"
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
                Already have an account?
                <Link to="/login" className="text-blue-800 font-bold ml-4">
                  Sign-In
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

export default Register;
