import { useAuth } from "../../../../../context/authContext";
import { useState } from "react";
function EditIssue(props){
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const {token} = useAuth();

    const oldTitle = props.issue.title;
    const oldDescription = props.issue.description;
    const issueId = props.issue.id;
    const [title, setTitle] = useState(oldTitle);
    const [description, setDescription] = useState(oldDescription);
    const [message, setMessage] = useState("");

    const handleChange = (e)=>{
        const {name, value} = e.target;
        if(name == "title"){
            setTitle(value);
        }
        else if(name == "description"){
            setDescription(value);
        }
    }

    const handleSubmit =async (e) =>{
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
            const response = await fetch(`${BASE_URL}/issue/edit`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body:JSON.stringify({
                    issueId:issueId,
                    title: title,
                    description: description,
                })
            });

            const result = await response.json();

            if(response.ok){
                console.log("message:",result.message);
                setMessage("edit issue successfully");
                return;
            }
            else if(response.status == 409){
                setMessage("edit issue failed");
                return;
            }
            else if(response.statue == 500){
                setMessage("edit issue failed, check server");
                return;
            }
        }catch(error){
            console.error('edit issue failed, error:', error);
            setMessage("edit issue failed");
        }
    }
    return(
        <div>
            <h3>edit issue</h3>
            <p>{message}</p>
            <form onSubmit={handleSubmit}>
                <label>title: </label>
                <input name="title" value={title} onChange={handleChange} required />
                <br />

                <label>description: </label>
                <input name="description" value={description} onChange={handleChange} required />
                <br />

                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default EditIssue;