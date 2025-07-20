import { useState } from "react";
import { Outlet } from "react-router";
import TopNav from "../components/Dashboard/topNav/TopNav";
import Sidebar from "../components/Dashboard/side-bar/Sidebar";
import Footer from "../components/Shared/Footer/Footer";

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen relative flex ">
      {/* Sidebar */}
      <div className="">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <TopNav toggleSidebar={toggleSidebar} />
        <main className="p-4 md:px-10 md:py-6 flex-1 overflow-y-auto">
          <div className="min-h-[80vh] mb-10">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
