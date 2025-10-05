import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './../Providers/AuthProvider';

const axiosSecure = axios.create({
<<<<<<< HEAD
   baseURL: "http://localhost:5000",
  // baseURL: "https://healthcare-management-server.vercel.app",
  withCredentials: true
=======
  baseURL: "https://healthcare-management-server.vercel.app",
>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const {logOut} = useContext(AuthContext)
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem("access-token");
      // console.log("request stoppet by interceptors", token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    });


    axiosSecure.interceptors.response.use(function(response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // console.log('status error in the interceptors', status)
        if(status === 401 || status === 403){
           await logOut()
            navigate('/login')
        }
        return Promise.reject(error)
    })


  return axiosSecure;
};

export default useAxiosSecure;
