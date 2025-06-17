import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/authContext";
import SwitchContentButton from "../SwitchContentButton";

function AllTasks(){
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const navigate = useNavigate();
    const {token} = useAuth();
    const [message, setMessage] = useState("");
    const [order, setOrder] = useState("DESC");
    const [tasks, setTasks] = useState("");
    
    const goDetail = (taskId) =>{
        navigate(`/tasks_and_issues/task_detail/${taskId}`)
    }

    const fetchTasks = async () =>{
        try{
            const response = await fetch(`${BASE_URL}/task/user_tasks`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body:JSON.stringify({
                    order:order
                })
            });
            const result = await response.json();
            if(response.ok){
                console.log('fetch tasks successfully,message:', result.message);
                setTasks(result.tasks);
                setMessage('fetch tasks successfully')
            }
            else if(response.status == 404){
                console.error('no tasks found,error:',result.error);
                setMessage("tasks no found");
            }
            else if(response.status == 500){
                console.error("Internal server error,error:", result.error);
                setMessage("fetch tasks failed");
            }
        }catch(error){
            console.error("fetch tasks failed, error:", error);
            setMessage("fetch data failed, please check server");
        }
    }

    const toggleOrder = () =>{
        setOrder((prevOrder) => {
            return prevOrder === "DESC" ? "ASC" : "DESC"
        });
    }

    useEffect(()=>{
        if(token){
            fetchTasks();
        }
    },[token,order]);

    return(
        <div>
            <SwitchContentButton />
            <h1>all tasks</h1>
            <h3>{message}</h3>
            
            {
                order === "DESC" ?(
                    <button type="button" onClick={toggleOrder}>ASC</button>
                ) : (
                    <button type="button" onClick={toggleOrder}>DESC</button>
                )
            }
            {tasks.length === 0 ? (
                <p>no tasks found</p>
            ) : (
                <ul>
                    {tasks.map((task) => (
                        <li key={task.id}>
                            <h4>Title: {task.title}</h4>
                            <p>Status: {task.completed ? 'Done' : 'Not done'}</p>
                            <p>created at:{task.created_at}</p>
                            <br />
                            <button type="button" onClick={()=> goDetail(task.id)}>view detail</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default AllTasks;