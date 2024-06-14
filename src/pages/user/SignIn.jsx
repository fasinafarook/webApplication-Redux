import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../slices/userSlice/usersApiSlice";
import { setCredentials } from "../../slices/userSlice/authSlice";
import { toast } from "react-toastify";
import Loader from "../../components/user/Loader";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Email cannot be empty");
      return;
    }

    if (!password.trim()) {
      toast.error("Password cannot be empty");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 bg-[#254336] rounded-lg shadow-md overflow-hidden">
      <h1 className="text-2xl font-bold mb-4 text-center py-4 bg-gray-600 text-white">
        Sign In
      </h1>

      <form onSubmit={submitHandler} className="px-6 py-4">
        <div className="my-4">
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="my-4">
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        {isLoading && <Loader color={"#36d7b7"} />}{" "}
        <button
          type="submit"
          className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out"
        >
          Sign In
        </button>
      </form>

      <div className="py-3 text-center">
        <p className="text-sm text-gray-600">
          New Customer?{" "}
          <Link
            to={`/signup`}
            className="text-indigo-600 hover:text-indigo-800 transition duration-300 ease-in-out"
          >
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
