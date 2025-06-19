const db = require('../db');

async function findTasksByUserIdDESC(id){
    const [tasks] = await db.query(
        'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
        [id]
    );
    if(tasks.length == 0){
        return null;
    }
    return tasks;
}

async function findTasksByUserIdASC(id){
    const [tasks] = await db.query(
        'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at ASC',
        [id]
    );
    if(tasks.length == 0){
        return null;
    }
    
    return tasks;
}

async function isExit(taskId){
    const [tasks] = await db.query(
        'SELECT * FROM tasks WHERE id = ?',
        [taskId]
    );
    if(tasks.length > 0)
        return true;
    return false;
}

async function insertTask(userId,issueId,step, title, description, completed){
    const [result] = await db.query(
        'INSERT INTO tasks (user_id, issue_id,step_number, title, description, completed) VALUES (?, ?, ?, ?, ?, ?)',
        [userId, issueId,step,  title, description, completed]
    );
    return result.insertId;
}

async function findTaskById(id){
    const [rows] = await db.query(
        'SELECT * FROM tasks WHERE id = ?',
        [id]
    );
    if(rows.length > 0)
        return rows[0];
    return null;
}

async function isCompleted(id){
    const [result] = await db.query(
        'SELECT completed FROM tasks WHERE id = ?',
        [id]
    );
    if(result.length > 0)
        return rows[0].completed;
    return null;
}

async function changeCompleted(id, completed){
    const [result] = await db.query(
        'UPDATE tasks SET completed = ? WHERE id = ?',
        [completed, id]
    );
    if(result.affectedRows == 1)
        return true;
    return false;
}

async function changeDescription(id, description){
    const [result] = await db.query(
        'UPDATE tasks SET description = ? WHERE id = ?',
        [description, id]
    );
    if(result.affectedRows == 1)
        return true;
    return false;
}

async function changeTitle(id, title){
    const [result] = await db.query(
        'UPDATE tasks SET title = ? WHERE id = ?',
        [title, id]
    )
    if(result.affectedRows == 1)
        return true;
    return false;
}

async function insertAndchangeStepNumber(taskId,stepNumber,issueId){
    const [result] =await db.query(
        'UPDATE tasks SET step_number = ?,issue_id = ? WHERE id = ?',
        [stepNumber,issueId, taskId]
    );

    if(result.affectedRows == 1)
        return true;
    return false;
}

async function changeStepNumber(taskId,stepNumber){
    const [result] =await db.query(
        'UPDATE tasks SET step_number = ? WHERE id = ?',
        [stepNumber,taskId]
    );

    if(result.affectedRows == 1)
        return true;
    return false;
}

async function deleteTaskFromIssue(taskId){
    const [result] = await db.query(
        'UPDATE tasks SET step_number = ?, issue_id = ? WHERE id = ?',
        [null, null, taskId]
    )
        
    if(result.affectedRows == 0)
        return false;
    return true;
}

async function addTaskIntoIssue(taskId, issueId,stepNumber){
    console.log("in dao: taskId:", taskId, "issue id:", issueId, "stepNumber:", stepNumber);
    const [result] = await db.query(
        'UPDATE tasks SET issue_id = ?, step_number = ? WHERE id = ?',
        [issueId, stepNumber, taskId]
    );
    console.log("indao result:", result);
    if(result.affectedRows == 1)
        return true;
    return false;
}

async function insertIssue(id, issueId, step){
    const [result] = await db.query(
        'UPDATE tasks SET issue_id = ?, step_number = ? WHERE id = ?',
        [issueId, step, id]
    )

    if(result.affectedRows == 1)
        return true;
    return false;
}

async function deleteTask(id){
    const [result] = await db.query(
        'DELETE FROM tasks WHERE id = ?',
        [id]
    );

    if(result.affectedRows == 1)
        return true;
    return false;
}

async function findTasksByUserIdAndIssueId(userId, issueId){
    const [tasks] = await db.query(
        'SELECT * FROM tasks WHERE user_id = ? AND issue_id = ? ORDER BY step_number ASC',
        [userId, issueId]
    );

    return tasks;
}

async function resetAllTasksInIssue(userId,issueId){
    const [result] = await db.query(
        'UPDATE tasks SET issue_id = ?, step_number = ? WHERE user_id = ? AND issue_id = ?',
        [null,null, userId, issueId]
    )

    return result.affectedRows >= 0;
}

async function getTasksNotBelongToIssue(userId){
    const [tasks] = await db.query(
        'SELECT * FROM tasks WHERE issue_id IS NULL AND user_id = ?',
        [userId]
    )
    if(tasks.length == 0){
        return null;
    }
    return tasks;
}


module.exports = {
    findTasksByUserIdDESC,
    findTasksByUserIdASC,
    isExit,
    insertTask,
    findTaskById,
    isCompleted,
    changeCompleted,
    changeDescription,
    changeTitle,
    deleteTask,
    findTasksByUserIdAndIssueId,
    insertIssue,
    deleteTaskFromIssue,
    addTaskIntoIssue,
    insertAndchangeStepNumber,
    changeStepNumber,
    resetAllTasksInIssue,
    getTasksNotBelongToIssue
}