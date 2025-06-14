const userDao = require('../dao/userDao');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

async function getAllUsers(req,res){
    try{
        const users = await userDao.getAllUsers();
        return res.json(users);
    }catch(error){
        console.error('can not get users', error);
        return res.status(500).json({
             error: 'Internal server error' 
        })
    }
}
async function createUser(req,res){
    const {email, username, password} = req.body;
    try{
        const isEmailExist = await userDao.isEmailExist(email);
        if(isEmailExist){
            return res.status(409).json({
                error:'email already exit'
            });
        }
        
        const isUserNameExist = await userDao.isUsernameExist(username);
        if(isUserNameExist){
            return res.status(409).json({
                error:'username already exist'
            });
        }

        const hashedPassword = await hashPassword(password);
        const createNewUser = await userDao.insertUser(email, username, hashedPassword)
        if(!createNewUser){
            return res.status(500).json({
                error:'registion error'
            })
        }
        return res.status(200).json({
            message:'new user register successfully'
        })
    }catch(error){
        console.error('create user error:', error);
        return res.status(500).json({
             error: 'Internal server error' 
        })
    }
}

async function hashPassword(password){
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}


async function loginUser(req,res){
    const{email, password} = req.body;
    try{
        const user = await userDao.findUserByEmail(email);
        if(!user){
            return res.status(404).json({
                error:'user not found'
            });
        }
        const oldPassword = user.password;
        const isMatch = await bcrypt.compare(password, oldPassword);
        if(!isMatch){
            return res.status(400).json({
                error: 'wrong password'
            });
        }
        const token = createToken(user);
        return res.status(200).json({
            message:'Login successful',
            token,
        });
    }catch(error){
        console.error('Login error: ', error);
        return res.status(500).json({
            error:'Internal server error'
        })
    }
}

function createToken(user){
    const payload = {
        id: user.id,
        email: user.email
    };
    const token = jwt.sign(payload,process.env.JWT_SECRET,{
        expiresIn: '1h',
    })
    return token;
}

async function changePassword(req, res){
    const newPassword = req.body.password;
    const userId = req.user.id;
    try{
        const hasChangedPassword = await userDao.chengePassword(userId, newPassword);
        if(!hasChangedPassword){
            return res.status(400).json({
                error:'change password failed'
            })
        }
        return res.status(200).json({
            message:'change password successfully'
        })
    }catch(error){
        console.error('change password error: ', error);
        return res.status(500).json({
            error: 'Internal server error'
        })
    }
}

module.exports = {
    getAllUsers,
    createUser,
    loginUser,
    changePassword,
}