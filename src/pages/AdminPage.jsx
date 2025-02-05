import { Link } from "react-router-dom";

const AdminPage = () => {
  
  return (
    <div className="flex justify-center items-start min-h-[80vh] bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Management Card */}
        <Link to="/user">
        <div 
          className="bg-white shadow-lg rounded-2xl p-6 cursor-pointer hover:shadow-xl transition"
        >
          <h2 className="text-xl font-semibold text-gray-800">User Management</h2>
          <p className="text-gray-600 mt-2">View and manage all registered users.</p>
        </div>
        
        </Link>

        {/* Manage Counters Card */}
        <Link to="/managecounter">
        <div 
          className="bg-white shadow-lg rounded-2xl p-6 cursor-pointer hover:shadow-xl transition"
          // onClick={() => navigate("/manageCounter")}
        >
          <h2 className="text-xl font-semibold text-gray-800">Manage Counters</h2>
          <p className="text-gray-600 mt-2">Add, edit, or remove counters.</p>
        </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminPage;
