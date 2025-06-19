import { useAuth } from "../../../../../context/authContext";
import AddTask from "./AddTask";
import { useState,useEffect } from "react";

function TaskList(props) {
  const issueId = props.issueId;
  const tasks = props.tasks;
  const onRefresh = props.onRefresh;
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { token } = useAuth();
  const [freeTasks, setFreeTasks] = useState([]);

  const handleRemove = async (taskId) => {
    try {
      const response = await fetch(`${BASE_URL}/task/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          taskId: taskId,
          issueId: issueId,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('task remove successfully');
        if (onRefresh) {
          onRefresh();
          fetchFreeTasks();
        }
      } else {
        console.error('Failed to remove task,error:', result.error);
      }
    } catch (error) {
      console.error('Error removing task,error:', error);
    }
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

    useEffect(()=>{
        fetchFreeTasks();
    },[token])

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Task List</h3>

      {!tasks || tasks.length === 0 ? (
        <p className="text-gray-500">No more tasks in this issue</p>
      ) : (
        <div className="space-y-3">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="flex items-center justify-between p-3 bg-brand-light border border-brand-dark rounded-lg shadow-sm hover:shadow-md transition"
            >
              <div>
                <p className="text-sm"><span className="font-medium">Step:</span> {task.step_number}</p>
                <p className="text-sm"><span className="font-medium">Title:</span> {task.title}</p>
                <p className="text-sm">
                  <span className="font-medium">Status:</span>{' '}
                  {task.completed ? (
                    <span className="text-green-600 font-semibold">Completed</span>
                  ) : (
                    <span className="text-yellow-600 font-semibold">Incomplete</span>
                  )}
                </p>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(task.id)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <div>
        <AddTask issueId={issueId} onRefresh={onRefresh} refreshFreeTasks={fetchFreeTasks} freeTasks={freeTasks}/>
      </div>
    </div>
  );
}

export default TaskList;