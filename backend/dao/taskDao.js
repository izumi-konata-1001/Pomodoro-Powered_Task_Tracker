const db = require('../db');

async function findTasksByUserIdDESC(id){
    const [tasks] = await db.query(
        'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
        [id]
    );
    if(!tasks)
        return null;
    return tasks;
}

async function findTasksByUserIdASC(id){
    const [tasks] = await db.query(
        'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at ACS',
        [id]
    );
    if(!tasks)
        return null;
    return tasks;
}

async function insertTask(userId, title, description, completed){
    const [result] = await db.query(
        'INSERT INTO tasks (userId, title, description, completed) VALUES (?, ?, ?, ?)',
        [userId, title, description, completed]
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

async function deleteTask(id){
    const [result] = await db.query(
        'DELETE FROM tasks WHERE id = ?',
        [id]
    );

    if(result.affectedRows == 1)
        return true;
    return false;
}


module.exports = {
    findTasksByUserIdDESC,
    findTasksByUserIdASC,
    insertTask,
    findTaskById,
    isCompleted,
    changeCompleted,
    changeDescription,
    changeTitle,
    deleteTask,
}