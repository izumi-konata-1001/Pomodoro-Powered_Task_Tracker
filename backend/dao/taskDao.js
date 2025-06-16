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

async function isExsit(taskId){
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

async function insertIssue(id, issueId, step){
    const [result] = await db.query(
        'UPDATE tasks SET issue_id = ?, step = ? WHERE id = ?',
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
        'SELECT * FROM tasks WHERE user_id = ? AND issue_id = ?',
        [userId, issueId]
    );

    return tasks;
}


module.exports = {
    findTasksByUserIdDESC,
    findTasksByUserIdASC,
    isExsit,
    insertTask,
    findTaskById,
    isCompleted,
    changeCompleted,
    changeDescription,
    changeTitle,
    deleteTask,
    findTasksByUserIdAndIssueId,
    insertIssue,
}