const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function verifyTokenInBody(req,res, next){
      const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({
            error: 'Token is required'
        })
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Verifying token:", token);
        req.user = decoded;
        console.log("Token verified!");
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