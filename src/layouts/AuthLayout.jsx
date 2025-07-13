import { Outlet } from "react-router";
import Logo from "../components/Shared/logo/Logo";
import animation from "../assets/lottie/ZdEhEfP1gb.json";
import Lottie from "lottie-react";

const AuthLayout = () => {
  return (
    <div className="max-w-11/12 mx-auto grid grid-cols-2 gap-10">
      <aside className="">
        <Lottie animationData={animation} loop={true} />
      </aside>
      <div className="mt-10">
        <nav className="flex items-center justify-center mb-5">
          <Logo></Logo>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
