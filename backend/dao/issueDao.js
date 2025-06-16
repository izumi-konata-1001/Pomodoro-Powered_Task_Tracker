const db = require('../db');

async function getAllIssues(){
    const [issues] = await db.query(
        'SELECT * FROM issues'
    )
    return issues;
}

async function getAllIssuesByUserIdDESC(userId){
    const [rows] = await db.query(
        'SELECT * FROM issuse WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
    );
    return rows;
}

async function getAllIssuesByUserIdACS(userId){
    const [rows] = await db.query(
        'SELECT * FROM issuse WHERE user_id = ? ORDER BY created_at ACS',
        [userId]
    );
    return rows;
}

async function getIssueById(issueId){
    const [rows] = await db.query(
        'SELECT * FROM issues WHERE id =?',
        [issueId]
    );
    if(rows.length >0)
        return rows[0];
    return null;
}

async function insertIssue(userId,title, description){
    const [ result ] = await db.query(
        'INSERT INTO issues (user_id, title,description) VALUES (?, ?, ?)',
        [userId, title, description]
    );

    return result.insertId;
}

async function changeTitle(id, title){
    const [result] = await db.query(
        'UPDATE issues SET title = ? WHERE id = ?',
        [title, id]
    );
    if(result.affectedRows == 1)
        return true;
    return false;
}

async function changeDescription(id, description){
    const [result] = await db.query(
        'UPDATE issues SET description = ? WHERE id = ?',
        [description, id]
    );
    if(result.affectedRows == 1)
        return true;
    return false;
}

module.exports = {
    getAllIssues,
    getAllIssuesByUserIdDESC,
    getAllIssuesByUserIdACS,
    getIssueById,
    insertIssue,
    changeTitle,
    changeDescription,
}