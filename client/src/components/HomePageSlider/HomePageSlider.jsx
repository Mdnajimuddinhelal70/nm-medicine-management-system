import { useState, useEffect } from "react";
import Slider from "react-slick";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const HomePageSlider = () => {
  const axiosSecure = useAxiosSecure();
  const [sliderItems, setSliderItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSliderItems = async () => {
      try {
        const res = await axiosSecure.get("/advertise");
        const filteredItems = res.data.filter((ad) => ad.addedToSlider);
        setSliderItems(filteredItems);
      } catch (error) {
        toast.error("Failed to load slider items");
      } finally {
        setIsLoading(false);
      }
    };
    fetchSliderItems();
  }, [axiosSecure]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    pauseOnHover: true,
    fade: true,
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-semibold text-gray-600 animate-pulse">
        <span className="loading loading-bars loading-lg"></span>
        </p>
      </div>
    );
  }
  return (
    <div className="slider-container mb-8 mt-10">
      <Slider {...settings}>
        {sliderItems.map((item) => (
          <div key={item._id} className="relative">
            <img
              src={item.medicineImage}
              alt={item.medicineName}
              className="w-full h-80 object-cover rounded-lg shadow-md"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-center p-4 rounded-lg">
              <h3 className="text-white text-2xl font-semibold mb-2">{item.medicineName}</h3>
              <p className="text-white text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HomePageSlider;
