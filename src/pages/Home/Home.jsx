import Services from "./Services/Services";
import Slider from "./Slider/Slider";
const servicesPromise = fetch("services.json").then((res) => res.json());
const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <Services servicesPromise={servicesPromise}></Services>
    </div>
  );
};

export default Home;
