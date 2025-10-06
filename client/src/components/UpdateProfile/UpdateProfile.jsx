import axios from "axios";
import { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../Providers/AuthProvider";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [error, setError] = useState("");
  const [photoFile, setPhotoFile] = useState(null);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const promises = [];
      let photoURL = user?.photoURL;

      // Upload new image if selected
      if (photoFile) {
        const formData = new FormData();
        formData.append("image", photoFile);

        const { data } = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMGBB_API_KEY
          }`,
          formData
        );

        if (data.success) {
          photoURL = data.data.display_url;
        } else {
          throw new Error("Image upload failed");
        }
      }

      // Update Firebase profile
      if (displayName !== user?.displayName || photoURL !== user?.photoURL) {
        promises.push(updateUserProfile(displayName, photoURL));
      }

      // Update email if changed
      if (email !== user?.email) {
        promises.push(user.updateEmail(email));
      }

      await Promise.all(promises);

      toast.success("Profile updated successfully!");
    } catch (error) {
      if (error.code === "auth/requires-recent-login") {
        setError("Please re-authenticate and try again.");
        toast.error("Please re-authenticate and try again.");
      } else {
        setError(error.message);
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Update Your Profile
      </h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="displayName" className="mb-2 text-gray-600">
            Username:
          </label>
          <input
            id="displayName"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="mb-2 text-gray-600">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="photoFile" className="mb-2 text-gray-600">
            Upload Photo:
          </label>
          <input
            id="photoFile"
            type="file"
            onChange={(e) => setPhotoFile(e.target.files[0])}
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update Profile
        </button>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default UpdateProfile;
