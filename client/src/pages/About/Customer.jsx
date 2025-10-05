import { useState } from "react";
import customarData from "../../../public/customar.json";

const Customer = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [expanded, setExpanded] = useState(false);

  const handleShowMore = () => {
    setVisibleCount(customarData.length);
    setExpanded(true);
  };

  const handleShowLess = () => {
    setVisibleCount(3);
    setExpanded(false);
  };

  return (
    <div>
      <h1 className="text-center text-5xl font-extrabold font-sans text-cyan-400">
        What Our Client Say.
      </h1>
      <div className="container md:grid grid-cols-3 gap-3 p-10 my-12 rounded-md bg-cyan-400 mx-auto">
        {customarData.slice(0, visibleCount)?.map((item, index) => (
          <div
            key={item.name}
          
            className={`flex max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 my-3 transform transition-transform duration-500 hover:scale-105 hover:shadow-2xl 
              ${index % 2 === 0 ? 'animate-slideInLeft' : 'animate-slideInRight'}`}
          >
            <div
              className="w-1/3 bg-cover bg-center transition-all duration-500 h-full"
              style={{ backgroundImage: `url(${item?.image})` }}
            ></div>

            <div className="w-2/3 p-2 md:p-2 flex flex-col justify-between">
              <h1 className="text-lg font-bold text-gray-800 dark:text-white transition-colors duration-300 hover:text-gray-600 dark:hover:text-gray-400">
                {item?.name}
              </h1>

              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 transition-opacity duration-300 hover:opacity-80">
                {item.description}
              </p>

              <div className="flex mt-2 items-center">
                {[...Array(3)].map((_, index) => (
                  <svg
                    key={index}
                    className="w-4 h-4 text-gray-700 fill-current dark:text-gray-300 transition-colors duration-300 hover:text-yellow-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}

                {[...Array(2)].map((_, index) => (
                  <svg
                    key={index}
                    className="w-4 h-4 text-gray-500 fill-current transition-colors duration-300 hover:text-yellow-400"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center my-5">
        {!expanded && visibleCount < customarData.length && (
          <button
            onClick={handleShowMore}
            className="px-4 py-2 bg-cyan-400 text-pink-950 rounded-lg hover:bg-cyan-500 transition duration-300"
          >
            Show More
          </button>
        )}

        {expanded && (
          <button
            onClick={handleShowLess}
            className="px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-800 transition duration-300"
          >
            Show Less
          </button>
        )}
      </div>
    </div>
  );
};

export default Customer;
