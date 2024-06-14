import { FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAdminLogoutMutation } from "../../slices/adminSlice/adminApiSlice";
import { adminLogout } from "../../slices/adminSlice/adminAuthSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const [logoutAdmin] = useAdminLogoutMutation();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await logoutAdmin().unwrap();
    dispatch(adminLogout());
  };

  return (
    <nav className="left-0 w-full h-14 bg-gradient-to-r from-gray-400 to-gray-700 shadow-lg">
      <div className="container flex flex-auto items-center h-full justify-between px-6">
        <div className="text-xl font-semibold text-white">USER MANAGEMENT</div>

        <ul className="flex space-x-5">
          {/* {userInfo ? ( */}
          <>
            <Link to="/admin/dashboard">
              <li className="flex items-center">
                <FaUser className="text-white mr-2 cursor-pointer hover:text-gray-200" />
                <span className="text-white hover:text-gray-200 cursor-pointer">
                  Dashboard
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
          {/* ) : ( */}
          <></>
          {/* )} */}
        </ul>
      </div>
    </nav>
  );
};

export default AdminHeader;
