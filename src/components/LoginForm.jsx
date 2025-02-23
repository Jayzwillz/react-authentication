import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.email || !formData.password) {
      setMessage("All fields are required!");
      setIsSuccess(false);
      return;
    }
  
    try {
      const response = await axios.post(
        "https://circle-22-auth.onrender.com/api/auth/login",
        formData
      );
    
      const { token, user } = response.data;
    
      // Check if a registration date exists; otherwise, set current date
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      const memberSince = storedUser.createdAt || new Date().toISOString();
    
      const updatedUser = { ...user, createdAt: memberSince };
    
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    
      setMessage("Login successful! Redirecting...");
      setIsSuccess(true);
    
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed.");
      setIsSuccess(false);
    }
  };       
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br text-white px-4">
      <div className="bg-gray-800/80 shadow-2xl shadow-gray-900 border border-gray-700 p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {message && (
          <p className={`text-center p-2 rounded ${isSuccess ? "text-green-400 bg-green-900/40" : "text-red-400 bg-red-900/40"}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-700/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-700/80 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition-all text-white font-semibold py-3 rounded-lg shadow-md shadow-green-800 cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <a href="/" className="text-purple-400 hover:text-purple-500 transition">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
