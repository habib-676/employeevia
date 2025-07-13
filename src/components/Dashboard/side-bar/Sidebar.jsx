import { FaMoneyBillWave, FaRegFileAlt, FaSignOutAlt } from "react-icons/fa";
import { NavLink } from "react-router";
import { IoMdClose } from "react-icons/io";
import Logo from "../../Shared/logo/Logo";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-30 z-30 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={`fixed md:static z-50 top-0 left-0 h-screen w-64 bg-base-100 shadow-md p-4 md:px-10 md:py-6 transition-transform duration-300 transform
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        {/* Close Button (mobile only) */}
        <div className="flex justify-between items-center mb-6 md:hidden">
          <Logo />
          <button onClick={toggleSidebar}>
            <IoMdClose size={24} />
          </button>
        </div>

        {/* Logo (desktop) */}
        <div className="hidden md:block mb-6 ">
          <Logo></Logo>
        </div>

        <nav className="space-y-4">
          <NavLink
            to="work-sheet"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600"
          >
            <FaRegFileAlt /> Worksheet
          </NavLink>
          <NavLink
            to="payment-history"
            className="flex items-center gap-3 text-gray-700 hover:text-blue-600"
          >
            <FaMoneyBillWave /> Payment History
          </NavLink>
          <NavLink className="flex items-center gap-3 text-gray-700 hover:text-red-500">
            <FaSignOutAlt /> Logout
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
