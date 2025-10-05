import healthImg from "../../../assets/logo/health.jpg";
import healthImg1 from "../../../assets/logo/medical_13633072.png";
import healthImg2 from "../../../assets/logo/communicate_2343694.png";
import healthImg3 from "../../../assets/logo/support_706208.png";
import healthImg4 from "../../../assets/logo/responsibility_17201138.png";

const Health = () => {
  return (
    <div className="p-8 bg-gray-100 my-16">
      <h1 className="text-center text-4xl text-yellow-900 font-extrabold mb-8">
        New Patients at Good Health Chiropractic & Acupuncture
      </h1>
      <div className="md:flex items-center mb-12">
        <div className="md:w-1/2 p-4">
          <p className="text-gray-800 text-lg leading-relaxed">
            If you’re coming in to see us for the first time, we’d like you to
            know exactly what to expect. We make every effort to ensure our
            patients feel welcome and comfortable; we want your time with us to
            be positive and uplifting. Welcome!
          </p>
        </div>
        <div className="md:w-1/2 p-4 flex justify-center">
          <img
            src={healthImg}
            alt="Health"
            className="rounded-lg shadow-lg w-3/4"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 items-center ml-30 my-16">
        <div className="flex flex-col items-center">
          <img
            src={healthImg1}
            alt="Medical"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-24 md:w-20"
          />
          <p className="mt-2 text-2xl font-semibold text-gray-700">Dr, Helal</p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={healthImg2}
            alt="Communicate"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-24 md:w-20"
          />
          <p className="mt-2 text-2xl font-semibold text-gray-700">
          Contact Us 
          </p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={healthImg3}
            alt="Support"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-24 md:w-20"
          />
          <p className="mt-2 text-2xl font-semibold text-gray-700">Patients</p>
        </div>
        <div className="flex flex-col items-center">
          <img
            src={healthImg4}
            alt="Responsibility"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 w-24 md:w-20"
          />
          <p className="mt-2 text-2xl font-semibold text-gray-700">Our Services</p>
        </div>
      </div>
    </div>
  );
};

export default Health;
