import { useContext } from "react";
import { ContextApi } from "../AuthProvider/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useContext(ContextApi);
  const navigate = useNavigate();
  const handleLogout = () => {
    logOut();
    Swal.fire({
      title: "Done!",
      text: "Logout Successfull !",
      icon: "success",
    });
    navigate("/");
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      {/* Logo / Title */}
      <h1 className="text-xl font-bold text-purple-600">Task Manager</h1>

      {/* Profile & Logout */}
      <div className="flex items-center space-x-4">
        {/* User Profile */}
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt="User Profile"
            className="w-10 h-10 rounded-full border"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-gray-600 font-bold text-lg">
              {user?.displayName?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
        )}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition"
        >
          <FiLogOut className="text-lg" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Navbar;
