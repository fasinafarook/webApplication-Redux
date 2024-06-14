  import { Link } from "react-router-dom";
  import { useSelector } from "react-redux";
  import { BsPerson } from "react-icons/bs";

  const Hero = () => {
    const { userInfo } = useSelector((state) => state.auth);
    return (
      <div className="py-32 bg-[#254336]">
        <div className="container mx-auto flex justify-center bg-[#254336]">
          <div className="p-8 flex flex-col items-center bg-gray-300 hover:bg-[#DBD3F8] transition-colors duration-300 rounded-lg shadow-lg w-2/4">
            <h1 className="text-4xl font-bold text-center mb-4">Welcome</h1>
            {userInfo ? (
              <>
                <h1 className="text-2xl">{userInfo.name}</h1>
                <Link to="/profile" className="mt-4">
                  <button className="bg-blue-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
                    <span>Go to Profile</span>
                    <BsPerson className="ml-2" />
                  </button>
                </Link>
              </>
            ) : (
              <>
                <p className="text-lg text-center mb-6">
                  
                </p>
                <div class="flex space-x-4">
                  <a
                    href="/login"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Sign In
                  </a>
                  <a
                    href="/signup"
                    class="bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded"
                  >
                    Sign Up
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  export default Hero;
