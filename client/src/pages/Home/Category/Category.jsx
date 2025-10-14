import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import CategoryItems from "./CategoryItems";

const Category = () => {
  const [medicines, setMedicines] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic
      .get("/myMedicine")
      .then((res) => {
        const data = res.data;
        const categoryData = data.reduce((acc, item) => {
          const found = acc.find((cat) => cat.category === item.category);
          if (found) {
            found.noOfMedicines += 1;
          } else {
            acc.push({
              ...item,
              noOfMedicines: 1,
            });
          }
          return acc;
        }, []);
        setMedicines(categoryData);
      })
      .catch((error) => {
        console.error("Error fetching medicines:", error);
      });
  }, [axiosPublic]);

  return (
    <>
      <Helmet>
        <title>Health || Cart</title>
      </Helmet>

      {medicines.length > 0 ? (
        <>
          <h1 className="text-4xl font-bold ml-16 mt-16 text-fuchsia-900">
            Explore Our Category-wise Medicine
          </h1>
          <div className="container md:grid grid-cols-3 gap-4 mt-8 mb-10 mx-auto">
            {medicines.map((item, index) => (
              <CategoryItems key={index} item={item} index={index} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center text-lg text-gray-600 mt-10">
          <p>No medicines found</p>
        </div>
      )}
    </>
  );
};

export default Category;
