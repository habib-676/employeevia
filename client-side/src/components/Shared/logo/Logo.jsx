import { Link } from "react-router";
import logo from "../../../assets/employvia.png";

const Logo = () => {
  return (
    <Link to={"/"}>
      <div className="flex items-center gap-2">
        <img className="w-4 md:w-7" src={logo} alt="" />
        <p className="font-bold text-[17px] md:text-lg lg:text-xl">
          Employee<span className="text-accent">Via</span>
        </p>
      </div>
    </Link>
  );
};

export default Logo;
