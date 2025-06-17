import { useEffect,useState } from "react";
import { useParams} from "react-router-dom";
import { useAuth } from "../../../../context/authContext";
import BackButton from "../../../common/BackButton";
function TaskDetail(){
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const {token} = useAuth();
    const [task, setTask] = useState("");
    const [message, setMessage] = useState("");
    const {task_id} = useParams();

    console.log("task id:", task_id);
    const fetchTask = async () =>{
        try{
            console.log("task id:", task_id);
            const response = await fetch(`${BASE_URL}/task/detail`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`,
                },
                body:JSON.stringify({
                    taskId:task_id,
                })
            });

            const result = await response.json();

            if(response.ok){
                setTask(result.task);
                setMessage("get task detail successfully");
                console.log('fetch task detail successfully,message:', result.message);
                return;
            }
            else if(response.status == 404){
                setMessage("task no found");
                console.error("task detail get failed, error:",result.error);
                return;
            }
            else if(response.status == 500){
                setMessage("task detail get failed, please check server.");
                console.error("error:", result.error);
                return;
            }
        }catch(error){
            setMessage("get task detail failed, please check server");
            console.error('fetch task detail failed,error:', error);
        }
    }

    useEffect(() =>{
        if(task_id && token){
            fetchTask();
        }
    },[token, task_id])


    return(
        <div>
            <BackButton />
            <h1>taskDetail</h1>
            <h3>{message}</h3>

            {task?(
                <div>
                    <p>Title:{task.title}</p>
                    <p>Decription: {task.description}</p>
                    <p>Status: {task.completed}</p>
                    <p>issue:{task.issue_id}</p>
                    <p>create time: {task.created_at}</p>
                    <p>update time: {task.updated_at}</p>
                </div>
            ):(
                <p>no task found</p>
            )}
        </div>
    )
}

export default TaskDetail;