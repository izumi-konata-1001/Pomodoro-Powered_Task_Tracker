import { useState } from "react";

function EditTaskList(props){
    const tasks = props.tasks;
    const [selectedOption, setSelectedOption] = useState("");

    const handleChange = (e)=>{
        const {value} = e.target;
        setSelectedOption(value);
    }
    return(
        <div>
            <h3>edit task in issue</h3>

            <select id="task_select" value={selectedOption} onChange={handleChange}>
                <option>
                    
                </option>
            </select>

        </div>
    )
}

export default EditTaskList;