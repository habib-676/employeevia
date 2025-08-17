import { Outlet } from "react-router";
import Logo from "../components/Shared/logo/Logo";
import animation from "../assets/lottie/ZdEhEfP1gb.json";
import Lottie from "lottie-react";
import Footer from "../components/Shared/Footer/Footer";

const AuthLayout = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 md:px-8">
      {/* Logo */}
      <nav className="flex items-center justify-start mt-6 mb-8">
        <div className="hover:scale-110 transition-all duration-200 hover:shadow-accent hover:shadow-2xl">
          <Logo />
        </div>
      </nav>

      {/* Main Content */}
      <div className="grid items-start md:grid-cols-2 gap-6 md:gap-8 lg:gap-16">
        {/* Left: Lottie Animation */}
        <aside className="flex justify-center md:justify-end">
          <Lottie
            animationData={animation}
            loop={true}
            className="w-64 sm:w-80 md:w-96 lg:w-full"
          />
        </aside>

        {/* Right: Form Outlet */}
        <div className="flex justify-center md:justify-start ">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12">
        <Footer />
      </div>
    </div>
  );
};

export default AuthLayout;
