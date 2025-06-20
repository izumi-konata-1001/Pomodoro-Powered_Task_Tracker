import { useAuth } from "../../../../../context/authContext";
import { useState, useEffect } from "react";

function AddTask(props) {
  const { issueId,handleRefresh,refreshFlag } = props;
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { token } = useAuth();
  const [selectTaskId, setSelectTaskId] = useState("");
  const [message, setMessage] = useState("");
  const [freeTasks, setFreeTasks] = useState([]);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!selectTaskId) {
      setMessage("⚠️ Please select a task first.");
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/issue/add_task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ issueId, taskId: selectTaskId }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Successfully added task:", result.message);
        setMessage("✅ Task added successfully!");
        setSelectTaskId("");
        if (handleRefresh){
            handleRefresh();
        }
        fetchFreeTasks();
      } else {
        setMessage("❌ Failed to add task.");
      }
    } catch (error) {
      console.error("Add task failed:", error);
      setMessage("❌ Server error.");
    }
  };

  const handleSelect = (e) => {
    setSelectTaskId(e.target.value);
  };

  const fetchFreeTasks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/task/free_tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setFreeTasks(result.tasks);
      } else {
        setFreeTasks([]);
        console.warn("No available free tasks");
      }
    } catch (error) {
      console.error("Error fetching free tasks:", error);
    }
  };

  useEffect(() => {
    fetchFreeTasks();
  }, [refreshFlag]);

  return (
    <div className="mt-6">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Add a Task to this Issue:
      </label>

      <div className="flex items-center gap-4">
        <select
          value={selectTaskId}
          onChange={handleSelect}
          className="block w-full max-w-xs border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
        >
          <option value="">-- Select a task --</option>
          {freeTasks.map((task) => (
            <option key={task.id} value={task.id}>
              {task.title}
            </option>
          ))}
        </select>

        <button
          type="submit"
          onClick={handleAdd}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </div>

      {message && (
        <p className="mt-2 text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
}

export default AddTask;