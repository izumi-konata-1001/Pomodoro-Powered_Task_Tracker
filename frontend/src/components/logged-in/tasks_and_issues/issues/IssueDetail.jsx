// IssueDetail.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/authContext';
import { useParams } from "react-router-dom";

import TaskList from './issue_detail/TaskList';
import EditIssue from './issue_detail/EditIssue';
import EditTaskList from './issue_detail/EditTaskList';
import BackButton from '../../../common/BackButton';

function IssueDetail() {
  const { issue_id } = useParams();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { token } = useAuth();
  const [issue, setIssue] = useState("");
  const [tasks, setTasks] = useState("");
  const [message, setMessage] = useState("");
  const [showEditTaskList, setShowEditTaskList] = useState(false);
  const [showEditIssue, setShowEditIssue] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  const fetchIssue = async () => {
    try {
      const response = await fetch(`${BASE_URL}/issue/detail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token} `,
        },
        body: JSON.stringify({
          issueId: issue_id,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setIssue(result.issue);
        setTasks(result.tasks);
        setMessage("get issue detail successfully");
      } else if (response.status === 404) {
        setMessage("issue detail not found");
      } else if (response.status === 500) {
        setMessage("fetch issue detail failed, please check server");
      }
    } catch (error) {
      console.error("fetch issue detail failed:", error);
    }
  };

  useEffect(() => {
    if (token && issue_id) {
      fetchIssue();
    }
  }, [token, issue_id, refreshTrigger]);

  const triggerRefresh = ()=>{
    setRefreshTrigger(prev => !prev);
  }

  return (
    <div className="flex justify-center mt-8">
      <div className="w-full max-w-3xl px-6 text-left relative">
        <BackButton />
        <h1 className="text-2xl font-bold mb-4">Issue Detail</h1>
        <h3 className="text-green-600 mb-4">{message}</h3>

        {issue ? (
          <div>
            <button
              onClick={() => setShowEditIssue(true)}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit Issue
            </button>

            {showEditIssue && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
                  <EditIssue
                    issue={issue}
                    onSave={() => {
                      setShowEditIssue(false);
                      fetchIssue();
                    }}
                    onCancel={() => setShowEditIssue(false)}
                  />
                </div>
              </div>
            )}

            <h3 className="text-lg font-semibold mt-4">Title: {issue.title}</h3>
            <p>Create time: {issue.created_at}</p>
            <p>Update time: {issue.updated_at}</p>
            <p>Description: {issue.description}</p>

            <TaskList tasks={tasks} token={token} issueId={issue.id} onTriggerRefresh={triggerRefresh} />

            <button
              onClick={() => setShowEditTaskList(!showEditTaskList)}
              className="mt-6 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              {showEditTaskList ? "Close Edit Task List" : "Open Edit Task List"}
            </button>

            {showEditTaskList && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl relative">
                <EditTaskList
                    tasks={tasks}
                    issueId={issue_id}
                    token={token}
                    onSave={() => {
                    setShowEditTaskList(false);
                    fetchIssue();
                    }}
                    onCancel={() => setShowEditTaskList(false)}
                />
                </div>
            </div>
            )}
          </div>
        ) : (
          <p className="text-red-500">Issue not found</p>
        )}
      </div>
    </div>
  );
}

export default IssueDetail;