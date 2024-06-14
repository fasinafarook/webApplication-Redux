import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/user/Loader";
import { setCredentials } from "../../slices/userSlice/authSlice";
import { useUpdateUserMutation } from "../../slices/userSlice/usersApiSlice";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import Header from "../../components/user/Header";
import editProfileValidate from "../../validations/editProfileValidate.js";

const Profile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.setName, userInfo.setEmail]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const validationError = editProfileValidate(
      name,
      currentPassword,
      password,
      confirmPassword
    );
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("currentPassword", currentPassword);
      formData.append("password", password);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const res = await updateProfile(formData).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Profile Updated");
    } catch (err) {
      if (err?.data?.error === "Current password is incorrect") {
        toast.error("Current password is incorrect");
      } else {
        toast.error(err?.data?.message || err.error);
      }
      console.log(err);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto my-16  shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-indigo-600">Profile</h1>
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={userInfo.imageUrl}
              alt="Profile Image"
              className="h-32 w-32 rounded-full object-cover"
            />
            <label
              htmlFor="profile-image-input"
              className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md text-indigo-600 hover:text-indigo-700 focus:outline-none cursor-pointer"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <input
                id="profile-image-input"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                name="image"
              />
            </label>
          </div>
        </div>
        <form encType="multipart/form-data" onSubmit={submitHandler}>
          <div className="my-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full pr-10 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <AiOutlineUser className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="my-4">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                readOnly
                className="block w-full pr-10 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <AiOutlineMail className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="my-4">
            <label className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="password"
                placeholder="Enter password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="block w-full pr-10 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <AiOutlineLock className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="my-4">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pr-10 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <AiOutlineLock className="h-5 w-5" />
              </div>
            </div>
          </div>

          <div className="my-4">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full pr-10 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <AiOutlineLock className="h-5 w-5" />
              </div>
            </div>
          </div>

          {isLoading && <Loader />}

          <button
            type="submit"
            className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#254336] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;
