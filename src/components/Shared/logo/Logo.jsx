import logo from "../../../assets/employvia.png";

const Logo = () => {
  return (
    <div className="flex items-center  gap-3">
      <img className="w-7" src={logo} alt="" />
      <p className="font-bold text-xl">
        Employee<span className="text-accent">Via</span>
      </p>
    </div>
  );
};

export default Logo;
