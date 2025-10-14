import axios from "axios";

const axiosPublic = axios.create({
  // Local development URL
  baseURL: "https://medicine-management-server.vercel.app",

  // Production URL
  // baseURL: "https://healthcare-management-server.vercel.app",

  withCredentials: true, // send cookies if needed
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
