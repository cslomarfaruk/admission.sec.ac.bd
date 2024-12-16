export default function ApplicantCopyCard() {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-primary p-6 rounded-lg shadow-lg w-full max-w-md">
          {/* Title */}
          <h2 className="text-center text-lg text-white mb-4">
            Please enter you User ID and password
          </h2>
  
          {/* Input Fields */}
          <div className="grid grid-cols-2 gap-2 bg-white p-4 rounded-md">
            {/* User ID */}
            <div className="flex items-center">
              <label className="text-sm font-semibold text-primary">User ID:</label>
            </div>
            <input
              type="text"
              placeholder="Enter User ID"
              className="border border-gray-300 px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-primary"
            />
  
            {/* Password */}
            <div className="flex items-center">
              <label className="text-sm font-semibold text-primary">Password:</label>
            </div>
            <input
              type="password"
              placeholder="Enter Password"
              className="border border-gray-300 px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
  
          {/* Button */}
          <div className="flex justify-center mt-4">
            <button className="bg-teal-100 text-primary py-2 px-6 rounded-md shadow hover:bg-teal-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary">
              Show details
            </button>
          </div>
        </div>
      </div>
    );
  }
  