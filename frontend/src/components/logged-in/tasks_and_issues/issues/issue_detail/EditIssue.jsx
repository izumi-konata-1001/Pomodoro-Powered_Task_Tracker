// EditIssue.jsx
import { useAuth } from "../../../../../context/authContext";
import { useState } from "react";

function EditIssue({ issue, onSave, onCancel }) {
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const { token } = useAuth();

  const [title, setTitle] = useState(issue.title);
  const [description, setDescription] = useState(issue.description);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setMessage("Title cannot be empty.");
      return;
    } else if (!description.trim()) {
      setMessage("Description must not be empty.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/issue/edit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          issueId: issue.id,
          title: title,
          description: description,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Issue edited successfully.");
        if (onSave) onSave(); // Close modal and refresh
      } else {
        setMessage(result.error || "Edit failed.");
      }
    } catch (error) {
      console.error("Edit failed:", error);
      setMessage("An error occurred.");
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Edit Issue</h2>
      {message && <p className="text-sm text-red-500 mb-2">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Title:</label>
          <input
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium">Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            rows={4}
            required
          />
        </div>

        <div className="flex justify-end space-x-3 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditIssue;