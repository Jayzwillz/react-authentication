import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!token || !storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
  }, [navigate]);

  // Format the "Member Since" date
  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not Available";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br text-white px-4">
      <div className="bg-gray-800/80 shadow-2xl shadow-gray-900 border border-gray-700 p-8 rounded-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>
        {user ? (
          <>
            <h3 className="text-lg font-semibold">
              Hello, {user.username} 👋
            </h3>
            <p className="text-gray-400 mt-2">Email: {user.email}</p>
            <p className="text-gray-400">Member Since: {formattedDate}</p>
          </>
        ) : (
          <p className="text-gray-500">Loading...</p>
        )}
        <button
          onClick={() => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            navigate("/login");
          }}
          className="mt-6 w-full bg-red-600 hover:bg-red-700 transition-all text-white font-semibold py-3 rounded-lg shadow-md shadow-red-800 cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
