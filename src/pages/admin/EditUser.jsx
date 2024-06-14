import AdminHeader from "../../components/admin/AdminHeader";
import { useParams } from "react-router-dom";
import {
  useGetSingleUserMutation,
  useUpdateUserDataMutation,
} from "../../slices/adminSlice/adminApiSlice";
import { useEffect, useState } from "react";
import { AiOutlineLock, AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { toast } from "react-toastify";
import editUserValidate from "../../validations/editUserValidate";

const EditUser = () => {
  const { userId } = useParams();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const [getSingleUser, { isLoading }] = useGetSingleUserMutation();
  const [updateUserData] = useUpdateUserDataMutation();

  useEffect(() => {
    const fetchSingleUser = async () => {
      try {
        const { data } = await getSingleUser(userId);
        console.log(data);
        setId(data._id);
        setName(data.name);
        setEmail(data.email);
        setImageUrl(data.imageUrl);
      } catch (err) {
        console.error("Error fetching user data", err);
      }
    };
    fetchSingleUser();
  }, [userId]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    // Extract form data
    const formData = new FormData();
    formData.append("userId", id);
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    const validationError = editUserValidate(name, password, confirmPassword);
    if (validationError) {
      toast.error(validationError);
    } else {
      try {
        const res = await updateUserData(formData).unwrap();
        toast.success("Profile Updated");
        setName(res.name);
        setImageUrl(res.imageUrl);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
        console.log(err);
      }
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="max-w-md mx-auto my-16 bg-[#254336] shadow-md rounded-md p-6">
        <h1 className="text-2xl font-bold mb-4 text-indigo-600">
          Edit User Details
        </h1>
        <div className="flex justify-center mb-6">
          <div className="relative">
            <img
              src={imageUrl}
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


          <button
            type="submit"
            className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default EditUser;
