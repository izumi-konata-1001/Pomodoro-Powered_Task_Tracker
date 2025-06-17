import { useState,useEffect } from "react";
import { useAuth } from "../../../../context/authContext";
import { useNavigate } from "react-router-dom";
import SwitchContentButton from "../SwitchContentButton";

function AllGroups(){
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const {token} = useAuth();
    const navigate = useNavigate();
    const [issues, setIssues] = useState("");
    const [order, setOrder] = useState("DESC");
    const [message, setMessage] = useState("");

    const fetchIssues = async () =>{
        try{
            const response = await fetch(`${BASE_URL}/issue/user_issues`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${token}`
                },
                body:JSON.stringify({
                    order:order,
                }),
            })

            const result = await response.json();
            if(response.ok){
                setIssues(result.issues);
                setMessage("load issues successfully");
                console.log("fetch issues successfully, message:", result.message);
            }
            else if(response.status == 404){
                console.error('no more issues, error:', result.error);
                setMessage("no found issue");
            }
            else if(response.status == 500){
                console.error("fetch issue error, error:", error);
                setMessage("fetch issues failed")
            }
        }catch(error){
            setMessage("fetch issues error, please check server");
            console.error('fetch issue error, error:', error);
        }
    }

    const toggleOrder = () =>{
        setOrder((prevOrder) => {
            return prevOrder === "DESC" ? "ASC" : "DESC"
        });
    }

    useEffect(() => {
        if(token){
            fetchIssues();
        }
    },[token,order])
    
    const goDetail = (issueId) =>{
        navigate(`/tasks_and_issues/issue_detail/${issueId}`)
    }

    return(
        <div>
            <SwitchContentButton />
            <h1>all issues</h1>
            <h3>{message}</h3>

            {
                order === "DESC" ?(
                    <button type="button" onClick={toggleOrder}>ASC</button>
                ) : (
                    <button type="button" onClick={toggleOrder}>DESC</button>
                )
            }

            {issues.length === 0 ?(
                <p>no issues found</p>
            ): (
                <ul>
                    {issues.map((issue) =>(
                        <li key={issue.id}>
                            <h4>title: {issue.title}</h4>
                            <p>description: {issue.description}</p>
                            <p>create time: {issue.created_at}</p>
                            <button type="button" onClick={()=> goDetail(issue.id)}>view detail</button>
                        </li>
                    ))}
                </ul>
            )
            }
        </div>
    )
}

export default AllGroups;