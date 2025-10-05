import { Outlet } from "react-router-dom";
import Navber from "../components/Navber/Navber";
import Footer from "../components/Footer/Footer";


const Main = () => {
    return (
        <div>
            <Navber />
           <div className="min-h-[calc(100vh-306px)]">
           <Outlet />
           </div>
            <Footer />
        </div>
    );
};

export default Main;