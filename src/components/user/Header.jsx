import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "../../slices/userSlice/usersApiSlice";
import { logout } from "../../slices/userSlice/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="left-0 w-full h-14 bg-gradient-to-r from-gray-400 to-gray-700 shadow-lg">
      <div className="container flex flex-auto items-center h-full justify-between px-6">
        <div className="text-xl font-semibold text-white">Home</div>

        <ul className="flex space-x-5">
          {userInfo ? (
            <>
              <Link to="/profile">
                <li className="flex items-center">
                  <FaUser className="text-white mr-2 cursor-pointer hover:text-gray-200" />
                  <span className="text-white hover:text-gray-200 cursor-pointer">
                    Profile
                  </span>
                </li>
              </Link>
              <li className="flex items-center" onClick={logoutHandler}>
                <FaSignOutAlt className="text-white mr-2 cursor-pointer hover:text-gray-200" />
                <span className="text-white hover:text-gray-200 cursor-pointer">
                  Logout
                </span>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Header;
