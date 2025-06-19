import { useState } from "react";
import { useAuth } from "../../../../context/authContext";

function EditTask({ task, onCancel, onSaveSuccess }) {
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const { token } = useAuth();

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [completed, setCompleted] = useState(task.completed === 1);
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "title") setTitle(value);
        else if (name === "description") setDescription(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title.trim()) {
            setMessage("Title cannot be empty");
            return;
        }
        if (!description.trim()) {
            setMessage("Description cannot be empty");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/task/edit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: task.id,
                    title,
                    description,
                    completed,
                }),
            });

            const result = await response.json();
            if (response.ok) {
                setMessage("Edit successful");
                if (onSaveSuccess) onSaveSuccess();
            } else {
                setMessage(result.error || "Edit failed");
            }
        } catch (error) {
            console.error("Edit task error:", error);
            setMessage("Server error");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md space-y-4">
                <h3 className="text-xl font-bold text-brand-dark">Edit Task</h3>
                <p className="text-sm text-red-500">{message}</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-1">Title:</label>
                        <input
                            name="title"
                            value={title}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>

                    <div>
                        <label className="block mb-1">Description:</label>
                        <input
                            name="description"
                            value={description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="completed"
                                value="true"
                                checked={completed === true}
                                onChange={() => setCompleted(true)}
                            />
                            Complete
                        </label>
                        <label className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="completed"
                                value="false"
                                checked={completed === false}
                                onChange={() => setCompleted(false)}
                            />
                            Incomplete
                        </label>
                    </div>

                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 border rounded hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-dark"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditTask;