import React from "react";
import Container from "../Container/Container";
import Logo from "../logo/Logo";
import { Link, NavLink } from "react-router";
const Navbar = () => {
  return (
    <Container>
      <div className="pt-5 flex items-center justify-between">
        <div className="border rounded-3xl py-2 px-10">
          <Logo />
        </div>
        <div className="border flex font-medium justify-between flex-1 rounded-3xl py-2 px-5">
          <div className="flex gap-10 ml-7">
            <NavLink>Contact us</NavLink>
            <NavLink>Dashboard</NavLink>
          </div>
          <Link>Sign up</Link>
        </div>
        <div className="border rounded-3xl py-2 px-5">Image</div>
      </div>
    </Container>
  );
};

export default Navbar;
