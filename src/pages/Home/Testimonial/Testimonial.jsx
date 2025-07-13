import { FaStar, FaRegStar } from "react-icons/fa";

const Testimonial = ({ test }) => {
  const { name, title, quote, rating, image } = test;
  // Create an array of 5 stars based on rating
  const stars = Array(5)
    .fill(0)
    .map((_, i) =>
      i < rating ? (
        <FaStar key={i} className="text-yellow-400" />
      ) : (
        <FaRegStar key={i} className="text-gray-300" />
      )
    );
  return (
    <div className="mt-10 shadow-md rounded-xl overflow-hidden hover:scale-105 transition-all duration-500">
      {/* Upper Section: Quote and Rating */}
      <div className="bg-gradient-to-tl from-indigo-400 text-white to-secondary p-4 rounded-t-xl text-sm ">
        <p className="mb-3">{quote}</p>
        <div className="flex gap-1">{stars}</div>
      </div>

      {/* Lower Section: Avatar and Info */}
      <div className="flex items-center gap-4 p-4">
        <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-300">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
