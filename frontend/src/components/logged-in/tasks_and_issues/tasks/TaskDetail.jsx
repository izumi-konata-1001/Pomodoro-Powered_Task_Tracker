import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../../context/authContext";
import BackButton from "../../../common/BackButton";

import EditTask from "./EditTask";
import IssueBelongto from "./IssueBelongto";

function TaskDetail() {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { token } = useAuth();
  const [task, setTask] = useState(null);
  const [message, setMessage] = useState("");
  const { task_id } = useParams();
  const [showEdit, setShowEdit] = useState(false);

  const fetchTask = async () => {
    try {
      const response = await fetch(`${BASE_URL}/task/detail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ taskId: task_id })
      });

      const result = await response.json();

      if (response.ok) {
        setTask(result.task);
        setMessage("Get task detail successfully");
      } else {
        setMessage(result.error || "Task not found");
      }
    } catch (error) {
      setMessage("Failed to fetch task detail");
      console.error('Fetch task detail error:', error);
    }
  };

  useEffect(() => {
    if (task_id && token) {
      fetchTask();
    }
  }, [token, task_id]);

  const handleSaveSuccess = () => {
    setShowEdit(false);
    fetchTask();
  };

return (
  <>
    {showEdit && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        
          <EditTask task={task} onCancel={() => setShowEdit(false)} onSaveSuccess={handleSaveSuccess} />
        
      </div>
    )}

    <div className="bg-white p-6 rounded shadow space-y-4 text-left w-full max-w-2xl mx-auto mt-8">
      <BackButton />
      <h1 className="text-3xl font-bold text-brand-dark">Task Detail</h1>
      <p className="text-sm text-gray-700">{message}</p>

      {task ? (
        <>
          <p><strong>Title:</strong> {task.title}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Status:</strong> {task.completed ? 'Done' : 'Not done'}</p>

          {task.issue_id ? (
            <IssueBelongto task={task} />
          ) : (
            <p><strong>Issue:</strong> Not belong to any issue</p>
          )}
          <p><strong>Create Time:</strong> {task.created_at}</p>
          <p><strong>Update Time:</strong> {task.updated_at}</p>

          <button
            onClick={() => setShowEdit(true)}
            className="mt-4 bg-brand-primary text-white px-4 py-2 rounded hover:bg-brand-dark transition"
          >
            Edit Task
          </button>
        </>
      ) : (
        <p>No task found</p>
      )}
    </div>
  </>
);
}

export default TaskDetail;