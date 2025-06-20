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
    const goCreateTask = () => {
        navigate('/tasks_and_issues/create_task');
    };

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
            <div className="text-center space-y-4">
            <SwitchContentButton />
            <h2 className="text-2xl font-semibold text-brand-dark">All Tasks</h2>
            <p className="text-gray-700">{message}</p>

            <button
                type="button"
                onClick={toggleOrder}
                className="mb-4 bg-brand-secondary text-brand-dark px-4 py-2 rounded hover:bg-brand-primary hover:text-white transition"
            >
                Order: {order === "DESC" ? "ASC" : "DESC"}
            </button>
            <br />
            <button
            type="button"
            onClick={goCreateTask}
            className="mb-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
            + Create New Task
            </button>

            {tasks.length === 0 ? (
                <p>No tasks found</p>
            ) : (
                <ul className="space-y-4">
                {tasks.map((task) => (
                    <li key={task.id} className="bg-white p-4 rounded shadow text-left">
                    <h3 className="text-lg font-bold">Title: {task.title}</h3>
                    <p>Status: {task.completed ? 'Done' : 'Not done'}</p>
                    <p>Created at: {task.created_at}</p>
                    <button
                        type="button"
                        onClick={() => goDetail(task.id)}
                        className="mt-2 bg-brand-primary text-white px-4 py-1 rounded hover:bg-brand-dark transition"
                    >
                        View Detail
                    </button>
                    </li>
                ))}
                </ul>
            )}
            </div>
    )
}

export default AllTasks;