const db = require('../db');

async function getAllUsers(){
    const [users] = await db.query(
        'SELECT * FROM users'
    );
    return users;
}

async function isEmailExist(email){
    const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    )
    if(rows.length == 0)
        return false;
    return true;
}

async function isUsernameExist(username){
    const [rows] = await db.query(
        'SELECT * FROM users WHERE username = ?',
        [username]
    )
    if(rows.length == 0)
        return false;
    return true;
}

async function insertUser(email, username, password){
    const [result] = await db.query(
        'INSERT INTO users (email, username, password) VALUES (?, ?, ?)',
        [email, username, password]
    )
    return result.insertId;
}

async function changePassword(userId, password)
{
    const [result] = await db.query(
        'UPDATE users SET password = ? WHERE id = ?',
        [password, userId]
    )

    if(result.affectedRows == 1)
        return true;
    return false;
}

async function findUserByEmail(email)
{
    const [user] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    )
    if(user.length > 0)
        return user[0];
    return null;
}

module.exports = {
    getAllUsers,
    isEmailExist,
    isUsernameExist,
    insertUser,
    changePassword,
    findUserByEmail
}