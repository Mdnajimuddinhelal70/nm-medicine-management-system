import axios from "axios";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";
import RoleSelection from "../../components/SocialLogin/QuickLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Register = () => {
  const [error, setError] = useState("");
  const { createUser, updateUserProfile, googleSignIn } =
    useContext(AuthContext);
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
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
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
                    navigate(from, { replace: true });
                    toast.success("User Registration Successful");
                  }
                });
              })
              .catch((error) => {
                toast.error("Profile update error:", error.message);
              });
          })
          .catch((error) => {
            toast.error("User creation error:", error.message);
          });
      }
    } catch (error) {
      toast.error("Image upload failed. Please try again!");
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

        axiosPublic
          .post("/users", userInfo)
          .then((res) => {
            if (res.data.insertedId || res.data.acknowledged) {
              toast.success("Google Sign-In Successful");
              navigate(from, { replace: true });
            }
          })
          .catch((error) => {
            toast.error("Something went wrong while saving user data.");
          });
      })
      .catch((error) => {
        toast.error("Google Sign-In Failed. Try again!", error.message);
      });
  };

  return (
    <div className="hero min-h-screen flex items-center justify-center">
      <div className="card w-[700px] max-w-xl bg-white shadow-2xl rounded-lg overflow-hidden">
        <div className="p-6 bg-gradient-to-r from-indigo-900 via-sky-500 to-emerald-500">
          <h2 className="text-xl font-bold text-center mb-6 text-white">
            User Registration
          </h2>
          <RoleSelection />
          <form onSubmit={handleRegister} className="space-y-4 px-6">
            {/* Username */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lime-400 text-lg">
                  Username
                </span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Image Upload */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lime-400 text-lg">
                  Upload Photo
                </span>
              </label>
              <input
                type="file"
                name="photo"
                className="file-input file-input-bordered w-full bg-black text-white"
                required
              />
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lime-400 text-lg">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Password */}
            <div className="form-control relative">
              <label className="label">
                <span className="label-text text-lime-400 text-lg">
                  Password
                </span>
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="input input-bordered w-full border-gray-300 focus:ring-2 focus:ring-blue-500 pr-12"
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 mt-9"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </button>
            </div>

            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

            {/* Submit */}
            <div className="form-control mt-6">
              <input
                className="btn btn-outline w-full"
                type="submit"
                value="Register"
              />
            </div>

            {/* Google Login */}
            <div>
              <button
                type="button"
                className="btn btn-outline w-full mt-2 flex items-center justify-center gap-2"
                onClick={handleGoogleLogin}
              >
                <FaGoogle /> Sign in with Google
              </button>
            </div>

            {/* Already Have Account */}
            <p className="text-center mt-4 text-white">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-200 font-bold">
                Sign In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
