const jwt = require('jsonwebtoken');
exports.login = (req , res)=>{

    console.log(req.body);
    
    const {username , password } = req.body ;

    if(username === "admin" && password === "admin"){
        const token = jwt.sign(
            {username},
            process.env.JWT_SECRET ,
            {expiresIn : '1h'}
        );
        return res.json({token});
    }

    return res.status(401).json({message : "Invalid Credentials"});
};