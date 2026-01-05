const express  = require('express');
const router = express.Router();


const registerdRoutes =  [] ;
router.post('/register' , (req , res) =>{
    const  routes = req.body ;
    if(!Array.isArray(routes)){
        return res.status(400).send("Routes must be  array");
    }

    routes.forEach(route =>{
        registerdRoutes.push(route);
    });

    console.log("Registersd Rotue :" , registerdRoutes);

    res.json({ message : "Routed registered successfully"});
    
});

module.exports = {
    router ,
    registerdRoutes
}