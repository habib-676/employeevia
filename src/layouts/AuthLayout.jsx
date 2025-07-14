import { Outlet } from "react-router";
import Logo from "../components/Shared/logo/Logo";
import animation from "../assets/lottie/ZdEhEfP1gb.json";
import Lottie from "lottie-react";
import Footer from "../components/Shared/Footer/Footer";

const AuthLayout = () => {
  return (
    <div>
      <div className="max-w-11/12 mx-auto grid items-center md:grid-cols-2 ">
        <aside className="">
          <nav className="flex items-center justify-start mt-6">
            <div className="hover:scale-110 transition-all duration-200 hover:shadow-accent hover:shadow-2xl">
              <Logo></Logo>
            </div>
          </nav>
          <Lottie
            animationData={animation}
            loop={true}
            className="w-xs md:w-md lg:w-full mx-auto"
          />
        </aside>
        <div className="mt-10">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthLayout;
