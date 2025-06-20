import { useState } from "react";
import { useAuth } from "../../../../context/authContext";
import BackButton from "../../../common/BackButton";
function CreateTask() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { token } = useAuth();
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [complete, setComplete] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setMessage("Title cannot be empty.");
      return;
    } else if (!description) {
      setMessage("Description must not be empty.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/task/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title,
          description: description,
          complete: complete,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("✅ Task created successfully!");
        console.log("create task successfully, message:", result.message);
        setTitle("");
        setDescription("");
        setComplete(false);
      } else if (response.status === 409) {
        setMessage("❌ Task creation failed.");
        console.error("create task failed, error: ", result.error);
      } else {
        setMessage("❌ Server error, please try again.");
      }
    } catch (error) {
      setMessage("❌ Network/server error.");
      console.error("create task failed, error: ", error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
        <BackButton />
      <h1 className="text-2xl font-bold mb-4 text-brand-dark">Create Task</h1>
      {message && (
        <div className="mb-4 text-sm text-center text-red-500">{message}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Task Title</label>
          <input
            name="title"
            value={title}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-brand-primary"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <input
            name="description"
            value={description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-brand-primary"
          />
        </div>

        <div>
          <span className="block text-sm font-medium mb-1">Completed?</span>
          <label className="mr-4">
            <input
              type="radio"
              name="completed"
              value="true"
              checked={complete === true}
              onChange={() => setComplete(true)}
              className="mr-1"
            />
            Yes
          </label>

          <label>
            <input
              type="radio"
              name="completed"
              value="false"
              checked={complete === false}
              onChange={() => setComplete(false)}
              className="mr-1"
            />
            No
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-brand-primary text-white py-2 px-4 rounded hover:bg-brand-dark transition"
        >
          Create Task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;