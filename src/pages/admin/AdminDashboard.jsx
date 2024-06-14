import { useState, useEffect } from "react";
import AdminHeader from "../../components/admin/AdminHeader";
import { toast } from "react-toastify";
import {
  useGetUsersMutation,
  useDeleteUserMutation,
} from "../../slices/adminSlice/adminApiSlice";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [getUsers, { isLoading }] = useGetUsersMutation();
  const [deleteUser] = useDeleteUserMutation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data);
      } catch (err) {
        toast.error("Fetch user data failed");
        console.log(err);
      }
    };
    fetchUserData();
  }, []);

  const handleDeleteUser = async (userId) => {
    // Display SweetAlert confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteUser(userId);
          setUsers(users.filter((user) => user._id !== userId));
          toast.success("User deleted successfully");
        } catch (err) {
          toast.error("Failed to delete user");
          console.log(err);
        }
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <AdminHeader />
      <div className="max-w-4xl mx-auto mt-8 ">
        <h2 className="text-xl font-bold mb-4">Users</h2>
        <div className="mb-4 flex justify-between items-center">
          <div>
            <input
              type="text"
              placeholder="Search by name or email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div>
            <Link to="/admin/add-user">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2">
                Add User
              </button>
            </Link>
          </div>
        </div>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td className="border border-gray-300 px-4 py-2">
                  <img
                    src={user.imageUrl}
                    alt={user.name}
                    className="w-8 h-8 rounded-full"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {user.email}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <Link to={`/admin/edit-user/${user._id}`}>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                      Edit
                    </button>
                  </Link>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleDeleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
