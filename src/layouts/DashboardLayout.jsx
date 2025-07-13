import { useState } from "react";
import { Outlet } from "react-router";
import TopNav from "../components/Dashboard/topNav/TopNav";
import Sidebar from "../components/Dashboard/side-bar/Sidebar";

const DashboardLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex ">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <TopNav toggleSidebar={toggleSidebar} />
        <main className="p-4 md:px-10 md:py-6 flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
