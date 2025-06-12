const userDao = require('../modules/userDao');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');
dotenv.config();
const secretKey = process.env.JWT_SECRET;

async function getAllUsers(req, res){
    try{
        const users = await userDao.getAllUsers();
        res.json(users);
    }catch(error){
        res.status(500).json({ error: 'Database error' });
    }
}
async function createUser(req,res){
    try{
        const {username, email, password} = req.body;
        if(!username || !email || !password){
            return res.status(400).json({error:'missing information'});
        }
        
        const hashedPassword = await hashPassword(password);
        console.log("hashed" ,hashedPassword);
        const userId = await userDao.createUser(username, email, hashedPassword);
        res.status(201).json({message: 'User create, user id: ', userId})
    }catch(error){
        console.error('Fail to create user: ', error);
        res.status(500).json({ error: 'Database error' });
    }
}

async function hashPassword(password){
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

async function authLogin(req, res){
    try{
        const {email, password} = req.body;
        if(!email || !password)
            return res.status(400).json({error:'missing information'});
        const user = await userDao.getUserByEmail(email);
        if(!user)
            return res.status(404).json({error:'user not found'});
        const validPassword = await bcrypt.compare(password,user.password);
        if(!validPassword)
            return res.status(401).json({error:'Invalid Password'});
        
        const token = jwt.sign({id:user.id, email: user.email}, secretKey,{expiresIn: '7d',});
        res.status(200).json({ message: 'Login successful', token })
    }catch(error){
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports = {
    getAllUsers,
    createUser,
    authLogin,
}