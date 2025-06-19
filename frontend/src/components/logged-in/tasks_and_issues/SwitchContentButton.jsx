import { useNavigate } from "react-router-dom";

function SwitchButton(){
    const navigate = useNavigate();
    const handleAllTasks = () =>{
        navigate('/tasks_and_issues/all_tasks');
    }
    const handleAllIssues = () =>{
        navigate('/tasks_and_issues/all_issues');
    }
  return (
    <div className="flex justify-center gap-4 mb-6">
      <button
        type="button"
        onClick={handleAllTasks}
        className="bg-brand-primary text-white px-4 py-2 rounded hover:bg-brand-dark transition"
      >
        All Tasks
      </button>
      <button
        type="button"
        onClick={handleAllIssues}
        className="bg-brand-primary text-white px-4 py-2 rounded hover:bg-brand-dark transition"
      >
        All Issues
      </button>
    </div>
  );
}

export default SwitchButton;