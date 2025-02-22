import React, { useState } from "react";
import useAxiosPublic from "../AuthProvider/useAxiosPublic";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const categories = [
  { id: "todo", title: "🎯 To do" },
  { id: "doing", title: "🌟 Doing" },
  { id: "done", title: "✅ Done" },
];

const axiosPublic = useAxiosPublic();
const Home = () => {
  const [category, setCategory] = useState("todo");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [isModalOpen1, setIsModalOpen1] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const openModal1 = () => setIsModalOpen1(true);
  const closeModal1 = () => setIsModalOpen1(false);

  // to-do data fetching using tanstack query
  const { data: tasks = [], refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await axiosPublic.get("/tasks");
      return res.data;
    },
  });

  const handleForm = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const res = await axiosPublic.post("/tasks", data);
    if (res.data.insertedId) {
      Swal.fire({
        title: "Done!",
        text: `Your Task Added Successfully!`,
        icon: "success",
      });
      form.reset();
      closeModal();
      refetch();
    }
  };

  const handleUpdateForm = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    console.log(data)

    const res = await axiosPublic.patch(`/task/update/${updateId}`,data)
    if(res.data.modifiedCount > 0){
      Swal.fire({
              title: "Done!",
              text: `Your Task Updated Successfully!`,
              icon: "success"
            });
      form.reset();
      closeModal1();
      refetch();      
    }
  }

  const handleUpdate = (id) => {
    openModal1();
    setUpdateId(id)
  };

  const handleDelete = async(id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.delete(`/delete/${id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Task Deleted Successfull`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    });
  };

  return (
    <div className="container mx-auto py-4">
      <h1 className="text-3xl font-bold text-purple-600 text-center mb-2">
        Your Task Management App
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Efficiently organize, track, and manage your tasks with ease. Add new
        tasks, categorize them, and stay productive!
      </p>

      {/* Add Task Button */}
      <div className="flex items-center space-x-2 mb-6">
        <button
          onClick={openModal}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          + Add Task
        </button>
      </div>

      {/* Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            <form onSubmit={handleForm}>
              <input
                type="text"
                name="title"
                placeholder="Title (max 50 characters)"
                maxLength={50}
                className="border p-2 rounded w-full mb-3"
                required
              />
              <textarea
                placeholder="Description (max 200 characters)"
                name="description"
                maxLength={200}
                className="border p-2 rounded w-full mb-3"
              ></textarea>
              <select
                className="border p-2 rounded w-full mb-3"
                name="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button className="bg-purple-500 text-white px-4 py-2 rounded">
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {isModalOpen1 && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Update Your Task</h2>
            <form onSubmit={handleUpdateForm}>
              <input
                type="text"
                name="title"
                placeholder="Title (max 50 characters)"
                maxLength={50}
                className="border p-2 rounded w-full mb-3"
                required
              />
              <textarea
                placeholder="Description (max 200 characters)"
                name="description"
                maxLength={200}
                className="border p-2 rounded w-full mb-3"
              ></textarea>
              <select
                className="border p-2 rounded w-full mb-3"
                name="category"
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.title}
                  </option>
                ))}
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={closeModal1}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button className="bg-purple-500 text-white px-4 py-2 rounded">
                  Update Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div className="">
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">🎯 To do</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 py-2">
            {tasks
              .filter((task) => task.category === "todo") // Filter tasks where category is "todo"
              .map((task) => (
                <div
                  key={task._id}
                  className="bg-white p-4 shadow-lg rounded-lg border-l-4 border-r-4 border-blue-500"
                >
                  {/* Task Title & Description */}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {task.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={() => handleUpdate(task._id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="">
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">🌟 Doing</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 py-2">
            {tasks
              .filter((task) => task.category === "doing") // Filter tasks where category is "todo"
              .map((task) => (
                <div
                  key={task._id}
                  className="bg-white p-4 shadow-lg rounded-lg border-r-4 border-l-4 border-blue-500"
                >
                  {/* Task Title & Description */}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {task.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={() => handleUpdate(task._id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>

        <div className="">
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">✅ Done</h2>
          </div>
          <div className="grid grid-cols-1 gap-3 py-2">
            {tasks
              .filter((task) => task.category === "done") // Filter tasks where category is "todo"
              .map((task) => (
                <div
                  key={task._id}
                  className="bg-white p-4 shadow-lg rounded-lg border-r-4 border-l-4 border-blue-500"
                >
                  {/* Task Title & Description */}
                  <h3 className="text-lg font-semibold text-gray-800">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {task.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex justify-between items-center mt-2">
                    <button
                      onClick={() => handleUpdate(task._id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
