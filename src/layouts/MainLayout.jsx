import Navbar from "../components/Shared/Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../components/Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="relative">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className=" min-h-[calc(100vh-68px)]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
