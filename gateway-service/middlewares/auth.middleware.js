const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET ;

module.exports = (req , res , next) =>{
    if(req.path === '/login' || req.path === '/register'){
        return next();
    }

    const authHeader = req.headers.authorization ;

    if(!authHeader){
        return res.status(401).send("Authorization header missing");        
    }

    const token = authHeader.split(' ')[1];

    try{
        jwt.verify(token , secret);
        next();
    }catch(err){
        return res.status(401).json({message : "Invalid Token"});
    }
}