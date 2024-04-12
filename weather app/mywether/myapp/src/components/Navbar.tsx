
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className=" bg-green-400 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <img className="w-10 h-10" src="/logop.png" alt="" />
          <Link to="/" className="ml-2 font-bold text-white text-xl sm:text-3xl hover:text-gray-300 transition-colors duration-300">
            weather
          </Link>
        </div>
        <div>
          <Link to="/search" target="_blank" className="inline-block bg-cyan-500 text-white px-4 py-2 rounded-md text-sm sm:text-md hover:bg-cyan-600 transition-colors duration-300">
            Weather Search
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;