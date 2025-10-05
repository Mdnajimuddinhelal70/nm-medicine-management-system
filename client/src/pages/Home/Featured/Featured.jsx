import { Link } from "react-router-dom";
import featuredImg from "../../../assets//medi4.jpg";
import "./Featured.css";

const Featured = () => {
  return (
    <>
      <div className="flex items-center justify-center mt-10 px-4 md:px-8 lg:px-16">
        <h1 className="text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-green-900 w-full md:w-2/3 lg:w-1/2">
          Boost Your Well-Being at Good Health Chiropractic & Acupuncture
        </h1>
      </div>

      <div className="featuredItem my-12 text-white font-bold bg-fixed">
        <div className="flex flex-col md:flex-row justify-center items-center py-10 md:py-16 lg:py-20 px-4 md:px-16 lg:px-36 space-y-6 md:space-y-0">
          <div className="w-full md:w-1/2">
            <img
              className="opacity-70 w-full h-auto"
              src={featuredImg}
              alt="Featured"
            />
          </div>
          <div className="md:ml-10 w-full md:w-1/2">
            <p className="text-sm sm:text-base md:text-lg lg:text-xl">
              Medicine is a science and practice focused on diagnosing,
              treating, and preventing illnesses. It involves the use of drugs,
              surgery, therapy, and other methods to restore health. Modern
              medicine is based on evidence and research, offering various
              treatments for diseases. Medicines include antibiotics, vaccines,
              pain relievers,
            </p>
            <Link to="/shopPage">
              <button className="bg-green-900 hover:bg-green-500 mt-6 md:mt-10 py-2 px-4 rounded-md text-sm md:text-base lg:text-lg">
                GO FOR SHOP
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Featured;
