import { useState } from "react";
import { useAuth } from "../../../../context/authContext";

function IssueBelongto({ task }) {
    const oldIssueId = task.issue_id;
    const [issueId, setIssueId] = useState(oldIssueId);
    const taskId = task.id;
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { token } = useAuth();

    const handleRemove = async () => {
        try {
            const response = await fetch(`${BASE_URL}/task/remove`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    taskId: taskId,
                    issueId: issueId,
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setIssueId(null); // 清除 issue 显示
            } else {
                console.log("handle remove failed, error", result.error);
            }
        } catch (error) {
            console.error("handle remove failed, error:", error);
        }
    };

    return (
        <div className="mt-4 flex items-center gap-4">
            <span className="text-gray-700 font-medium">
                Issue ID: {issueId ? issueId : "Not linked"}
            </span>
            {issueId && (
                <button
                    type="button"
                    onClick={handleRemove}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                    Remove
                </button>
            )}
        </div>
    );
}

export default IssueBelongto;