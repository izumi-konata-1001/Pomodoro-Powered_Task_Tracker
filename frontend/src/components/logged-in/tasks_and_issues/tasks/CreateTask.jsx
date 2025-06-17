import { useState } from "react"
import { useAuth } from "../../../../context/authContext"

function CreateTask(){
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const {token} = useAuth();
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [complete, setComplete] = useState(false);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        if(name == "title"){
            setTitle(value);
        }
        else if(name == "description"){
            setDescription(value);
        }
    }   

    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(!title){
            setMessage("title cannot be null");
            return;
        }
        else if(!description){
            setMessage("description must more than one word");
            return;
        }
        try{
            const response = await fetch(`${BASE_URL}/task/create`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body:JSON.stringify({
                    title: title,
                    description: description
                })
            });
            
            const result = await response.json();
            if(response.ok){
                setMessage("create task successfully");
                console.log("create task successfully, message:", result.message);
                return;
            }
            else if(response.status == 409){
                setMessage("create task failed.");
                console.error("create task failed, error: ", result.error);
                return;
            }
            else if(response.status == 500){
                setMessage("create task failed,please check server");
                console.error("create task failed, error:", error);
            }
        }catch(error){
            setMessage("create task failed, please check server.");
            console.error("create task failed, error: ", error);
        }
    }

    return(
        <div>
            <h1>create task</h1>
            <h3>{message}</h3>

            <form onSubmit={handleSubmit}>
                <label>task title: </label>
                <input name="title" value={title} onChange={handleChange} required />
                <br />

                <label>task description: </label>
                <input name="description" value={description} onChange={handleChange} required />
                <br />

                <label>
                    Complete:
                <input
                    type="radio"
                    name="completed"
                    value="true"
                    checked={complete === true}
                    onChange={() => setComplete(true)}
                />
                True
                </label>

                <label>
                <input
                    type="radio"
                    name="completed"
                    value="false"
                    checked={complete === false}
                    onChange={() => setComplete(false)}
                />
                False
                </label>
                <br />

                <button type="submit">create task</button>
            </form>
        </div>
    )
}

export default CreateTask