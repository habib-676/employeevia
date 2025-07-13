import Logo from "../logo/Logo";
import { Link, NavLink } from "react-router";
const Navbar = () => {
  return (
    <div className="pt-5 pb-3 flex items-center justify-between bg-base-200 xl:px-20 md:px-10 sm:px-2 px-4">
      <div className="border rounded-3xl py-2 px-10">
        <Logo />
      </div>
      <div className="border flex font-medium justify-between flex-1 rounded-3xl py-2 px-5">
        <div className="flex gap-10 ml-7">
          <NavLink>Contact us</NavLink>
          <NavLink to="dashboard">Dashboard</NavLink>
        </div>
        <Link to={'auth/register'}>Sign up</Link>
      </div>
      <div className="border rounded-3xl py-2 px-5">Image</div>
    </div>
  );
};

export default Navbar;
