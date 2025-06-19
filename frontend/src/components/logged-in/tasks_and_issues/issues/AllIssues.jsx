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
<div className="text-center space-y-4">
  <SwitchContentButton />
  <h2 className="text-2xl font-semibold text-brand-dark">All Issues</h2>
  <p className="text-gray-700">{message}</p>

  <button
    type="button"
    onClick={toggleOrder}
    className="mb-4 bg-brand-secondary text-brand-dark px-4 py-2 rounded hover:bg-brand-primary hover:text-white transition"
  >
    Order: {order === "DESC" ? "ASC" : "DESC"}
  </button>

  {issues.length === 0 ? (
    <p>No issues found</p>
  ) : (
    <ul className="space-y-4">
      {issues.map((issue) => (
        <li key={issue.id} className="bg-white p-4 rounded shadow text-left">
          <h3 className="text-lg font-bold">Title: {issue.title}</h3>
          <p>Description: {issue.description}</p>
          <p>Created at: {issue.created_at}</p>
          <button
            type="button"
            onClick={() => goDetail(issue.id)}
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

export default AllGroups;