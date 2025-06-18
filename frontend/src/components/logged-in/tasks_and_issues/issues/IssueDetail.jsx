import { useState, useEffect } from 'react'
import { useAuth } from '../../../../context/authContext';
import { useParams, useNavigate} from "react-router-dom";

import TaskList from './issue_detail/TaskList';
import EditIssue from './issue_detail/EditIssue';
import EditTaskList from './issue_detail/EditTaskList';
import BackButton from '../../../common/BackButton';

function IssueDetail(){
    const {issue_id} = useParams();
    const BASE_URL = import.meta.env.VITE_API_BASE_URL
    const {token} = useAuth();
    const [issue, setIssue] = useState("");
    const [tasks, setTasks] = useState("");
    const [message, setMessage] = useState("");
    const [showEditTaskList, setShowEditTaskList] = useState(false);
    const [showEditIssue, setShowEditIssue] = useState(false);
    const fetchIssue = async () =>{
        try{
            const response = await fetch(`${BASE_URL}/issue/detail`, {
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token} `,
                },
                body: JSON.stringify({
                    issueId: issue_id,
                }),
            })

            const result = await response.json();
            if(response.ok){
                setIssue(result.issue);
                setTasks(result.tasks);
                setMessage("get issue detail successfully");
                console.log('load issue successfullt, message:', result.message);
            }else if(response.status == 404){
                setMessage("issue detail no found");
                console.error("get issue detail failed, error:", result.error);
            }else if(response.status == 500){
                setMessage("fetch issue detail failed, please check server");
                console.error("fetch issue detail failed,server error:", result.error);
            }

        }catch(error){
            console.error("fetch issue detail failed, error:", error);
        }
    }

    useEffect(() =>{
        if(token && issue_id){
            fetchIssue();
        }
    },[token,issue_id])

    return(
        <div>
            <BackButton />
            <h1>issue detail</h1>
            <h3>{message}</h3>
            {issue ? (
                <div>
                    <h3>title: {issue.title}</h3>
                    <p>create time: {issue.created_at}</p>
                    <p>update time: {issue.updated_at}</p>
                    <p>description: {issue.description}</p>
                    <TaskList tasks={tasks}/>
                    
                    <button onClick={() => setShowEditTaskList(!showEditTaskList)}>
                        {showEditTaskList ? "close eidt task list" :"open edit task list"}
                    </button>
                    <br />
                    {showEditTaskList && <EditTaskList tasks={tasks} />}

                    <button onClick={() => setShowEditIssue(!showEditIssue)}>
                        {showEditIssue ? "close edit issue" : "open edit issue"}
                    </button>

                    {showEditIssue && <EditIssue issue={issue} />}
                </div>
            ):(
                <p>issue no found</p>
            )}
        </div>
    )
}

export default IssueDetail;