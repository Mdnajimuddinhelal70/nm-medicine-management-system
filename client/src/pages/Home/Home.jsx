import { Helmet } from "react-helmet-async";
import HomePageSlider from "../../components/HomePageSlider/HomePageSlider";
import Category from "./Category/Category";
import Featured from "./Featured/Featured";
import Health from "./Health/Health";

const Home = () => {
  return (
    <> 
    <Helmet>
    <title>Health || Home</title>
  </Helmet>
    <div>
      <HomePageSlider />
      <Category />
      <Featured />
      <Health />
    </div>
    </>
  );
};

export default Home;
