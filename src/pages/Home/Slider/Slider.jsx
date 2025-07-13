import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import banner1 from "../../../assets/banners/banner-1.jpg";
import banner2 from "../../../assets/banners/banner-2.jpg";
import banner3 from "../../../assets/banners/banner-3.jpg";
import banner4 from "../../../assets/banners/banner-4.jpg";

const Slider = () => {
  return (
    <div className="h-[60vh]">
      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        dynamicHeight={false}
      >
        {[banner1, banner2, banner3, banner4].map((img, idx) => (
          <div key={idx} className="h-full flex flex-col justify-between">
            <div className="flex-1">
              <img
                src={img}
                alt={`Banner ${idx + 1}`}
                className="h-full w-full"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <div className="text-center text-white px-4">
                  <h2 className="text-2xl md:text-4xl font-bold mb-2">
                    Empowering Work, Simplifying Management
                  </h2>
                  <p className="text-sm md:text-lg max-w-xl mx-auto">
                    A smart platform for employees to update their workflow and
                    for HR to effortlessly manage contracts, payments, and
                    productivity — all in one place.
                  </p>
                  <div className="flex justify-center items-center">
                    <div className="mt-4 ">
                      <button className="btn relative overflow-hidden bg-primary text-white border-none transition-all duration-500 hover:text-white group">
                        <span className="absolute inset-0 bg-gradient-to-tr from-primary to-accent transform scale-x-0 origin-bottom-left transition-transform duration-500 group-hover:scale-x-100 z-0"></span>
                        <span className="relative z-10">Get Started</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default Slider;
