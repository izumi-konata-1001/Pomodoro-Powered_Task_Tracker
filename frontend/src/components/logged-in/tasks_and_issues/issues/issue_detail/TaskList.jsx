function TaskList(props){
    const tasks = props.tasks;
    return(
        <div>
            <h3>task list</h3>

            {!tasks || tasks.length === 0 ? (
                <p>tasks: no tasks</p>
            ):(
                tasks.map((task) =>(
                    <li>
                        <label>step: {task.step_number}</label>
                        <br />
                        <label>task title: {task.title}</label>
                    </li>
                ))
            )}
        </div>
    )
}

export default TaskList;