const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const axios = require('axios');

const authRoute = require('./routes/auth.route');
const userRoutes = require("./routes/user.route");
const bussinessURL = process.env.BASE_URL ;

const app = express();
app.use(express.json());
const port = process.env.PORT ;


app.use(authRoute);
app.use(userRoutes);


const registerRoutesWithGateway = async()=>{
    const routes = [
        {
            method : "POST" ,
            path : "/login",
            target : bussinessURL

        },
        {
            method : "GET" ,
            path : "/users",
            target : bussinessURL
        },
        {
            method : "POST" ,
            path : "/users",
            target : bussinessURL
        },
        {
            method : "PUT" ,
            path : "/users/:id",
            target : bussinessURL
        },
        {
            method : "DELETE" ,
            path : "/users/:id",
            target : bussinessURL
        }
    ];

    try{
        console.log("Registering routes with gateway...");
        await axios.post( `${process.env.GATEWAY_URL}/register` , routes );
        console.log("working register ");
        
    }catch(err){
        console.log("failed to register " , err);
    }
}


app.listen(port, async () => {
  console.log("server running at port:", `http://localhost:${port}`);
  await registerRoutesWithGateway();
});
