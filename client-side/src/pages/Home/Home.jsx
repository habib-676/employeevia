import Team from "./our-team/Team";
import Services from "./Services/Services";
import Slider from "./Slider/Slider";
import Stats from "./stats/Stats";
import Testimonials from "./Testimonial/Testimonials";
const servicesPromise = fetch("/services.json").then((res) => res.json());
const testimonialPromise = fetch("/testimonials.json").then((res) =>
  res.json()
);
const teamPromise = fetch("/team.json").then((res) => res.json());
const Home = () => {
  return (
    <div>
      <Slider></Slider>
      <Services servicesPromise={servicesPromise}></Services>
      <div>
        <Testimonials testimonialPromise={testimonialPromise}></Testimonials>
      </div>
      <div>
        <Stats />
      </div>
      <div>
        <Team teamPromise={teamPromise}></Team>
      </div>
    </div>
  );
};

export default Home;
