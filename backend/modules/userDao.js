const db = require('../db');

async function getAllUsers(){
    const [users] = await db.query(
        'SELECT * FROM users'
    )
    return users;
}

async function createUser(username, email, password){
    const [result] = await db.query(
        'INSERT INTO users(username,email,password) VALUES (?,?,?)'
        ,[username, email, password]);
    return result.insertId;
}

async function getUserByEmail(email){
    const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );
    if(rows.length > 0)
        return rows[0];
    return null;
}

module.exports = {
    getAllUsers,
    createUser,
    getUserByEmail,
}