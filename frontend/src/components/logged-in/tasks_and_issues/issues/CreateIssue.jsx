import { useAuth } from "../../../../context/authContext";
import { useState } from "react";
function CreateIssue(){
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const {token} = useAuth();
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


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
            const response = await fetch(`${BASE_URL}/issue/create`,{
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
                setMessage("create issue successfully");
                console.log("create issue successfully, message:", result.message);
                return;
            }
            else if(response.status == 409){
                setMessage("create issue failed.");
                console.error("create issue failed, error: ", result.error);
                return;
            }
            else if(response.status == 500){
                setMessage("create issue failed,please check server");
                console.error("create issue failed, error:", error);
            }
        }catch(error){
            setMessage("create issue failed, please check server.");
            console.error("create issue failed, error: ", error);
        }
    }

    return(
        <div>
            <h1>create issue</h1>
            <h3>{message}</h3>

            <form onSubmit={handleSubmit}>
                <label>issue title: </label>
                <input name="title" value={title} onChange={handleChange} required />
                <br />

                <label>issue description: </label>
                <input name="description" value={description} onChange={handleChange} required />
                <br />

                <button type="submit">create issue</button>
            </form>
        </div>
    )
}

export default CreateIssue;