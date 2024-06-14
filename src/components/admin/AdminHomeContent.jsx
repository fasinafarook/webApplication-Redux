import { Link } from 'react-router-dom';

const AdminHomeContent = () => {
  return (
    <div className="bg-gray-200 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-[#254336] p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome, Admin!</h1>
        <p className="text-lg mb-6">This is the admin home page. You have access to manage the dashboard.</p>
        <Link to="/admin/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out inline-block">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AdminHomeContent;
