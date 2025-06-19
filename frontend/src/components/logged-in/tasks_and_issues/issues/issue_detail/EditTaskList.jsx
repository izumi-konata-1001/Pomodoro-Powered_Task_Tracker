import { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function SortableItem({ task }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: "10px",
    marginBottom: "8px",
    backgroundColor: "#f0f0f0",
    borderRadius: "6px",
    cursor: "grab"
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {task.title}
    </div>
  );
}

function EditTaskList({ tasks, issueId, token, onSave, onCancel }) {
  const [orderedTasks, setOrderedTasks] = useState(tasks);
  const [message, setMessage] = useState("");
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      const oldIndex = orderedTasks.findIndex(t => t.id === active.id);
      const newIndex = orderedTasks.findIndex(t => t.id === over.id);
      setOrderedTasks(arrayMove(orderedTasks, oldIndex, newIndex));
    }
  };

  const handleSave = async () => {
    const taskNewOrder = orderedTasks.map((task, index) => ({
      taskId: task.id,
      stepNumber: index + 1
    }));

    try {
      const response = await fetch(`${BASE_URL}/issue/edit_task_order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          issueId: issueId,
          taskNewOrder: taskNewOrder
        })
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Task order updated successfully.");
        if (onSave) onSave(); // ✅ 提交后关闭并刷新
      } else {
        setMessage(result.error || "Failed to update order.");
      }
    } catch (error) {
      console.error("Error updating task order:", error);
      setMessage("Server error");
    }
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Edit Task Order</h3>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={orderedTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {orderedTasks.map(task => (
            <SortableItem key={task.id} task={task} />
          ))}
        </SortableContext>
      </DndContext>

      <div className="flex justify-end gap-4 mt-6">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={handleSave}
        >
          Save
        </button>
      </div>

      {message && <p className="mt-2 text-sm text-gray-600">{message}</p>}
    </div>
  );
}

export default EditTaskList;