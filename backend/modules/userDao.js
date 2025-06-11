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

module.exports = {
    getAllUsers,
    createUser,
}