import axios from "axios";


const axiosPublic = axios.create({
<<<<<<< HEAD
  baseURL: "http://localhost:5000",
  withCredentials: true,
});
=======
    baseURL:'https://healthcare-management-server.vercel.app'
})
>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c
const useAxiosPublic = () => {
    return axiosPublic
};

export default useAxiosPublic;