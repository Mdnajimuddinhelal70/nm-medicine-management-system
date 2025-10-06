import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import CategoryItems from "./CategoryItems";

const Category = () => {
  const [medicines, setMedicines] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/myMedicine")
      .then((res) => res.json())
      .then((data) => {
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
      });
  }, []);

  return (
    <>
      <Helmet>
        <title>Health || Cart</title>
      </Helmet>
      <h1 className="text-4xl font-bold ml-16 mt-16 text-fuchsia-900">
        Explore Our Category-wise Medicine
      </h1>
      <div className="container md:grid grid-cols-3 gap-4 mt-8 mb-10 mx-auto">
        {medicines.map((item, index) => (
          <CategoryItems key={index} item={item} index={index} />
        ))}
      </div>
    </>
  );
};

export default Category;
