import React, { useContext } from "react";
import { ContextApi } from "../AuthProvider/AuthContext";
import { useNavigate } from "react-router-dom";
import useAxiosPublic from "../AuthProvider/useAxiosPublic";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const { googleSignIn } = useContext(ContextApi);
  const axiosPublic = useAxiosPublic();

  const handleLogin = () => {
    googleSignIn().then((result) => {
      const userInfo = {
        name: result.user?.displayName,
        email: result.user?.email,
      };
      axiosPublic.post("/users", userInfo).then(() => {
        Swal.fire({
          title: "Success!",
          text: "Your Sign Up Successful",
          icon: "success",
        });
        navigate("/dashboard");
      });
    });
  }


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        <div className="w-16 h-16 bg-blue-500 text-white flex items-center justify-center rounded-full mx-auto mb-4 text-2xl font-bold">
          TM
        </div>
        <h1 className="text-2xl font-bold mb-2">Welcome to Task Manager</h1>
        <p className="text-gray-600 mb-6">
          Effortlessly organize, track, and collaborate on your daily tasks.
        </p>

        <div className="flex flex-col gap-3 text-left">
          <div className="flex items-center gap-2">
            <span className="text-blue-500 font-bold">✔</span>
            <span>Plan and prioritize tasks efficiently</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-500 font-bold">✔</span>
            <span>Monitor real-time progress</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-500 font-bold">✔</span>
            <span>Seamless team collaboration</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-blue-500 font-bold">✔</span>
            <span>Stay productive with reminders & notifications</span>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <button onClick={handleLogin} className="bg-gray-900 flex items-center text-white py-2 px-4 rounded-lg shadow-lg hover:bg-gray-800 transition">
            <img
              className="w-5 h-5 mr-2"
              src="https://img.icons8.com/?size=100&id=17949&format=png&color=ffffff"
              alt="Google Icon"
            />
            Login With Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
