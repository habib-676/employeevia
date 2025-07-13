const HoverUnderlineText = ({ children }) => {
  return (
    <span className="relative inline-block cursor-pointer group">
      {children}
      <span className="absolute left-1/2 -bottom-1 h-0.5 w-0 bg-blue-600 transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2"></span>
    </span>
  );
};

export default HoverUnderlineText;
