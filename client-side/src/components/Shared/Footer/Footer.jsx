import React from "react";
import Logo from "../logo/Logo";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="footer xl:px-20 md:px-10 sm:px-2 px-4 sm:footer-horizontal bg-neutral text-neutral-content items-center p-4">
      <aside className=" md:grid-flow-col items-center gap-5">
        <Logo />
        <p className="text-xs">
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
      </aside>
      <nav className="grid-flow-col gap-4 md:place-self-center md:justify-self-end *:hover:text-accent *:hover:scale-120 *:transition-all *:duration-200">
        <Link to={"https://github.com/habib-676"} target="_blank">
          <FaGithub size={20} />
        </Link>
        <Link to={"https://www.linkedin.com/in/676-habib"} target="_blank">
          <FaLinkedin size={20} />
        </Link>
        <Link to={"https://www.facebook.com/habib676"} target="_blank">
          <FaFacebook size={20} />
        </Link>
      </nav>
    </footer>
  );
};

export default Footer;
