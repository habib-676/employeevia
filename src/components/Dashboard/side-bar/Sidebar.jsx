import {
  FaMoneyBillWave,
  FaRegFileAlt,
  FaSignOutAlt,
  FaUsers,
} from "react-icons/fa";
import { NavLink } from "react-router";
import { IoMdClose } from "react-icons/io";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiProgress2Fill } from "react-icons/ri";
import { FaPeopleGroup } from "react-icons/fa6";
import Logo from "../../Shared/logo/Logo";
import useAuth from "../../../hooks/useAuth";
import HoverUnderlineText from "../../Shared/Animation/HoverUnderlineText";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { logOut } = useAuth();
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
        className={`fixed md:sticky z-50 top-0 left-0 h-screen w-64 bg-base-100 shadow-md p-4 md:px-10 md:py-6 transition-transform duration-300 transform
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
            className="flex items-center gap-3 text-secondary-content hover:text-secondary"
          >
            <FaRegFileAlt /> <HoverUnderlineText>Worksheet</HoverUnderlineText>
          </NavLink>
          <NavLink
            to="payment-history"
            className="flex items-center gap-3 text-secondary-content hover:text-secondary"
          >
            <FaMoneyBillWave />{" "}
            <HoverUnderlineText>Payment History</HoverUnderlineText>
          </NavLink>
          {/* hr */}
          <NavLink
            to="employee-list"
            className="flex items-center gap-3 text-secondary-content hover:text-secondary"
          >
            <FaUsers /> <HoverUnderlineText>Employee List</HoverUnderlineText>
          </NavLink>
          <NavLink
            to="progress"
            className="flex items-center gap-3 text-secondary-content hover:text-secondary"
          >
            <RiProgress2Fill />
            <HoverUnderlineText>Progress</HoverUnderlineText>
          </NavLink>
          <NavLink
            to="all-employee-list"
            className="flex items-center gap-3 text-secondary-content hover:text-secondary"
          >
            <FaPeopleGroup />
            <HoverUnderlineText>All employee list</HoverUnderlineText>
          </NavLink>
          <NavLink
            to="payroll"
            className="flex items-center gap-3 text-secondary-content hover:text-secondary"
          >
            <GiTakeMyMoney />
            <HoverUnderlineText>Payroll</HoverUnderlineText>
          </NavLink>

          {/* logout */}
          <NavLink
            to={"/"}
            onClick={logOut}
            className="flex items-center gap-3 text-secondary-content hover:text-red-500"
          >
            <FaSignOutAlt /> <HoverUnderlineText>Logout</HoverUnderlineText>
          </NavLink>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
