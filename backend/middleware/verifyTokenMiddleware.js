const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function verifyTokenInBody(req,res){
    const {token} = req.body.token;
    if(!token){
        return res.status(401).json({
            error: 'Token is required'
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(error){
        return res.status(401).json({
            error: 'Invalid or expired token'
        })
    }
}

module.exports ={
    verifyTokenInBody,
}