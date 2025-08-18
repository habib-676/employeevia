import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../../assets/banners/banner-1.jpg";
import banner2 from "../../../assets/banners/banner-2.jpg";
import banner3 from "../../../assets/banners/banner-3.jpg";
import banner4 from "../../../assets/banners/banner-4.jpg";
import { Link } from "react-router";

const Slider = () => {
  return (
    <div className="w-full relative">
  <Carousel
    autoPlay
    infiniteLoop
    showThumbs={false}
    showStatus={false}
    showIndicators={false}
    dynamicHeight={false}
    swipeable={true}
    emulateTouch={true}
  >
    {[banner1, banner2, banner3, banner4].map((img, idx) => (
      <div key={idx} className="relative w-full">
        <div className="w-full h-[45vh] sm:h-[55vh] md:h-[60vh] lg:h-[70vh]">
          <img
            src={img}
            alt={`Banner ${idx + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black/50 flex items-center justify-center px-2 sm:px-4">
          <div className="text-center text-white max-w-2xl">
            <h2 className="text-base sm:text-xl md:text-3xl font-bold mb-2 leading-snug">
              Empowering Work, Simplifying Management
            </h2>
            <p className="text-xs sm:text-sm md:text-lg max-w-md mx-auto text-primary-content/60">
              A smart platform for employees to update their workflow and for HR
              to effortlessly manage contracts, payments, and productivity — all
              in one place.
            </p>
            <Link to={"/dashboard"}>
              <button className="relative mt-3 sm:mt-4 overflow-hidden px-3 sm:px-6 py-2 sm:py-3 text-xs sm:text-base text-white font-semibold bg-secondary rounded group">
                <span className="relative z-10">Get Started</span>
                <span className="absolute inset-0 w-full h-full bg-white opacity-20 rotate-45 translate-x-full translate-y-full transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0"></span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    ))}
  </Carousel>
</div>

  );
};

export default Slider;
