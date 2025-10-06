import { Link } from "react-router-dom";
import "../../../styles.css";

const CategoryItems = ({ item, index }) => {
  const { category, image, noOfMedicines } = item;

  return (
    <Link to={`/categoryDetails/${category}`}>
      <div
        className={`bg-white rounded-lg shadow-md overflow-hidden w-72 mx-auto transform transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-xl ${
          index % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right"
        }`}
      >
        <figure className="relative">
          <img
            src={image}
            alt={category}
            className="w-full h-32 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent text-white p-3 transition-opacity duration-300 ease-in-out opacity-90 hover:opacity-100">
            <h2 className="text-xl font-semibold">{category}</h2>
          </div>
        </figure>
        <div className="p-4">
          <p className="text-gray-600 text-sm">
            Total Medicines: {noOfMedicines}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CategoryItems;
