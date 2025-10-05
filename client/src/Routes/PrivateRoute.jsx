import { useContext } from "react";
<<<<<<< HEAD
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
=======
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
>>>>>>> 476d3e1138ce68e51f91bfc76883b93e11f10e5c


const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    if(loading){
        return <progress className="progress w-56"></progress>
    }
    if(user){
        return children;
    }
    return <Navigate to='/login' state={{from: location }}></Navigate>
};

export default PrivateRoute;