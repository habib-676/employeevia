import useAuth from "../../../hooks/useAuth";
import Logo from "../logo/Logo";
import avatarImg from "../../../assets/placeholder.jpg";
import { Link, NavLink } from "react-router";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import HoverUnderlineText from "../Animation/HoverUnderlineText";
import toast from "react-hot-toast";
const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    logOut();
    toast.success("Successfully Logged Out");
  };
  return (
    <div className="pt-5 border-b border-gray-300 shadow-2xs pb-3 flex items-center justify-between bg-base-200 xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="border border-primary rounded-3xl py-2 px-10">
        <Logo />
      </div>
      <div className="border border-primary hidden md:flex font-medium justify-between flex-1 rounded-3xl py-2 px-5">
        <div className="flex gap-10 ml-7">
          <NavLink to={'contact-us'}>
            <HoverUnderlineText>Contact us</HoverUnderlineText>
          </NavLink>
          <NavLink to="dashboard">
            <HoverUnderlineText>Dashboard</HoverUnderlineText>
          </NavLink>
        </div>
        {user ? (
          <p onClick={handleLogOut}>
            <HoverUnderlineText>Logout</HoverUnderlineText>
          </p>
        ) : (
          <Link to={"auth/register"}>
            <HoverUnderlineText>Sign up</HoverUnderlineText>
          </Link>
        )}
      </div>
      <div className="relative">
        <div className="flex flex-row items-center gap-3">
          {/* Dropdown btn */}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className="p-4 md:py-1 md:px-2 border border-primary flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
          >
            <AiOutlineMenu />
            <div className="hidden md:block">
              {/* Avatar */}
              <img
                className="rounded-full"
                referrerPolicy="no-referrer"
                src={user && user.photoURL ? user.photoURL : avatarImg}
                alt="profile"
                height="50"
                width="50"
              />
            </div>
          </div>
        </div>
        {isOpen && (
          <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
            <div className="flex flex-col cursor-pointer">
              <Link
                to="/"
                className="block md:hidden px-4 py-3 hover:bg-accent hover:text-white  transition-all duration-300 font-semibold"
              >
                <HoverUnderlineText>Home</HoverUnderlineText>
              </Link>

              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="px-4 py-3 hover:bg-accent hover:text-white  transition-all duration-300 font-semibold"
                  >
                    <HoverUnderlineText> Dashboard</HoverUnderlineText>
                  </Link>
                  <div
                    onClick={handleLogOut}
                    className="px-4 py-3 hover:bg-accent hover:text-white  transition-all duration-300 font-semibold cursor-pointer"
                  >
                    <HoverUnderlineText> Logout</HoverUnderlineText>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className="px-4 py-3 hover:bg-accent hover:text-white  transition-all duration-300 font-semibold"
                  >
                    <HoverUnderlineText>Login</HoverUnderlineText>
                  </Link>
                  <Link
                    to="/auth/register"
                    className="px-4 py-3 hover:bg-accent hover:text-white  transition-all duration-300 font-semibold"
                  >
                    <HoverUnderlineText>Sign Up</HoverUnderlineText>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
