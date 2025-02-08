import { Link } from "react-router-dom";

const AdminPage = () => {
  return (
    <div className="flex justify-center items-start min-h-[80vh] bg-gray-100 px-4 py-8 lg:py-12">
      <div className="w-full max-w-4xl">
        <h1 className="text-2xl lg:text-3xl font-bold text-blue-950 mb-6 text-center">
          Admin <span className="text-[#228B22]">Dashboard</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {/* User Management Card */}
          <Link to="/user">
            <div className="bg-white shadow-lg rounded-2xl p-6 lg:p-8 cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#228B22]/10 rounded-full flex items-center justify-center group-hover:bg-[#228B22]/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#228B22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-[#228B22] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-blue-950 group-hover:text-[#228B22] transition-all duration-300">User Management</h2>
              <p className="text-gray-600 mt-2 text-sm lg:text-base">View and manage all registered users, roles, and permissions.</p>
            </div>
          </Link>

          {/* Manage Counters Card */}
          <Link to="/managecounter">
            <div className="bg-white shadow-lg rounded-2xl p-6 lg:p-8 cursor-pointer hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#228B22]/10 rounded-full flex items-center justify-center group-hover:bg-[#228B22]/20 transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#228B22]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  </svg>
                </div>
                <div className="w-8 h-8 bg-gray-50 rounded-full flex items-center justify-center group-hover:bg-[#228B22] transition-all duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <h2 className="text-xl font-semibold text-blue-950 group-hover:text-[#228B22] transition-all duration-300">Manage Counters</h2>
              <p className="text-gray-600 mt-2 text-sm lg:text-base">Add, edit, or remove counters and manage counter settings.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;



