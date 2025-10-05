const AbtDetails = () => {
  return (
    <div className="bg-white rounded-lg shadow-md dark:bg-gray-800 mt-12 flex flex-col md:flex-row gap-10 mb-20 overflow-hidden">
      {/* Left Side: Image */}
      <div className="md:w-1/2">
        <img
          className="object-cover w-full h-full rounded-md"
          src="https://i.ibb.co.com/dK136s7/voluter3.jpg"
          alt="Article"
        />
      </div>

      {/* Right Side: Text */}
      <div className="p-6 md:w-1/2 flex flex-col justify-center">
        <h1 className="text-center md:text-left text-5xl text-green-800 font-extrabold font-sans mb-6">
          WHO <span className="text-pink-600">WE</span>{" "}
          <span className="text-sky-600">ARE.</span>
        </h1>
        <div>
          <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
            Product
          </span>
          <a
            href="#"
            className="block mt-2 text-xl font-semibold text-gray-800 transition-colors duration-300 transform dark:text-white hover:text-gray-600 hover:underline"
            tabIndex="0"
            role="link"
          >
            I Built A Successful Blog In One Year
          </a>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            From consulting and à la carte services to turnkey practice
            management, Medical Management Services will help you solve the
            puzzles that keep your practice from experiencing optimal cash
            flow...
          </p>
        </div>

        {/* Author Info */}
        <div className="mt-6 flex items-center">
          <img
            className="object-cover h-10 w-10 rounded-full"
            src="https://i.ibb.co.com/47x6v3F/najim.jpg"
            alt="Avatar"
          />
          <a
            href="#"
            className="ml-4 font-semibold text-gray-700 dark:text-gray-200"
            tabIndex="0"
            role="link"
          >
            Najim Uddin
          </a>
          <span className="ml-2 text-xs text-gray-600 dark:text-gray-300">
            21 SEP 2023
          </span>
        </div>
      </div>
    </div>
  );
};

export default AbtDetails;
