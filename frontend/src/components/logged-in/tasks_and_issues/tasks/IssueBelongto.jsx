import { useState } from "react";
import { useAuth } from "../../../../context/authContext";
function IssueBelongto(props){
    const oldIssueId = props.task.issue_id;
    const [issueId, setIssueId] = useState(oldIssueId);
    const taskId = props.task.id;
    const BASE_URL = import.meta.env.VITE_API_BASE_URL;
    const {token} = useAuth();
    const handleRemove =async () =>{
        try{
            const response = await fetch(`${BASE_URL}/task/remove`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body:JSON.stringify({
                    taskId:taskId,
                    issueId: issueId,
                })
            });

            const result = await response.json();

            if(response.ok){
                setIssueId("remove successfully");
            }else{
                console.log("handle remove failed, error", result.error);
            }
        }catch(error){
            console.error("handle remove failed, error:", error);
        }
    }

    return(
        <div>
            <label>issue:{issueId}</label>
            <button type="button" onClick={handleRemove}>remove</button>
        </div>
    )
}

export default IssueBelongto;