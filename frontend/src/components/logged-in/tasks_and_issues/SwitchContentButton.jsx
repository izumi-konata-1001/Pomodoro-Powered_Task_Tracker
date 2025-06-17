import { useNavigate } from "react-router-dom";

function SwitchButton(){
    const navigate = useNavigate();
    const handleAllTasks = () =>{
        navigate('/tasks_and_issues/all_tasks');
    }
    const handleAllIssues = () =>{
        navigate('/tasks_and_issues/all_issues');
    }
    return(
        <div>
            <button type="button" onClick={handleAllTasks}>all tasks</button>
            <button type="button" onClick={handleAllIssues}>all issues</button>
        </div>
    )
}

export default SwitchButton;