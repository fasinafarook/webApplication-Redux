import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAdminLoginMutation } from "../../slices/adminSlice/adminApiSlice";
import {
  setAdminCredentials,
  adminLogout,
} from "../../slices/adminSlice/adminAuthSlice";
import { toast } from "react-toastify";
import Loader from "../../components/user/Loader";

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [adminLogin, { isLoading }] = useAdminLoginMutation();

  const { adminInfo } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (adminInfo) {
      navigate("/admin/home");
    }
  }, [navigate, adminInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Invalid email address");
      return;
    }

    if (!password.trim()) {
      toast.error("Password is required");
      return;
    }

    try {
      const res = await adminLogin({ email, password }).unwrap();
      dispatch(setAdminCredentials({ ...res }));
      navigate("/admin/home");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
};


  return (
    <div className="min-h-screen bg-[#254336] flex items-center justify-center">
      <div className="relative mx-auto my-24 w-full max-w-md bg-[#6B8A7A] px-6 pt-10 pb-8 shadow-2xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
        <div className="w-full">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-white">Admin</h1>
          </div>
          <div className="mt-5">
            <form onSubmit={submitHandler}>
              <div className="relative mt-6">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder="Email Address"
                  className="peer mt-1 w-full border-b-2 border-white bg-[#6B8A7A] text-white px-0 py-1 placeholder:text-transparent focus:border-[#254336] focus:outline-none"
                  autoComplete="off"
                />
                <label
                  htmlFor="email"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-white opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-white"
                >
                  Email Address
                </label>
              </div>
              <div className="relative mt-6">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="peer mt-1 w-full border-b-2 border-white bg-[#6B8A7A] text-white px-0 py-1 placeholder:text-transparent focus:border-[#254336] focus:outline-none"
                />
                <label
                  htmlFor="password"
                  className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-white opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-white"
                >
                  Password
                </label>
              </div>
              <div className="my-6">
                {isLoading && <Loader color={"#254336"} />}
                <button
                  type="submit"
                  className="w-full rounded-md bg-[#254336] px-3 py-4 text-white hover:bg-[#567568] focus:bg-[#567568] focus:outline-none transition duration-300 ease-in-out"
                >
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

