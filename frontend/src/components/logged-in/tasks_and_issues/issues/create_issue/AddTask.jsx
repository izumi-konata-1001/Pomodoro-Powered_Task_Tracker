import { useState,useEffect } from "react";

function AddTask(props){
    const onRefresh = props.onRefresh;
    const [freeTasks, setFreeTasks] = useState([]);

    const fetchFreeTasks = async () => {
    try {
      const response = await fetch(`${BASE_URL}/task/free_tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        setFreeTasks(result.tasks);
      } else {
        setFreeTasks([]);
        console.warn("No available free tasks");
      }
    } catch (error) {
      console.error("Error fetching free tasks:", error);
    }
  };

  useEffect(()=>{

  },[onRefresh])
    return(
        <div>

        </div>
    )
}

export default AddTask;