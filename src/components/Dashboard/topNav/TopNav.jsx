import { FaBars } from "react-icons/fa";
import { useState } from "react";
import Logo from "../../Shared/logo/Logo";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router";

const TopNav = ({ toggleSidebar }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logOut } = useAuth();

  return (
    <div className=" shadow-md xl:px-20 md:px-10 sm:px-2 px-4 py-3 flex items-center justify-between">
      {/* Hamburger (mobile only) */}
      <button onClick={toggleSidebar} className="md:hidden text-gray-600">
        <FaBars size={24} />
      </button>
      <div className="md:hidden ml-10">
        <Logo />
      </div>
      <div className="ml-auto relative">
        <img
          onClick={() => setDropdownOpen(!dropdownOpen)}
          src={user?.photoURL}
          alt="User"
          className="w-10 h-10 rounded-full cursor-pointer object-cover"
        />

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
            <Link
              to={"/"}
              onClick={() => logOut()}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopNav;
