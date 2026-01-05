const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const axios = require('axios');

const authRoute = require('./routes/auth.route');

const app = express();
app.use(express.json());
const port = process.env.PORT ;


app.use(authRoute);


const registerRoutesWithGateway = async()=>{
    const routes = [
        {
            method : "POST" ,
            path : "/login",
            target : "http://localhost:3001"

        }
    ];

    try{
        console.log("Registering routes with gateway...");
        const response = await axios.post( 'http://localhost:3000/register' , routes );
        console.log("working register ");
        
    }catch(err){
        console.log("failed to register " , err);
    }
}


app.listen(port, async () => {
  console.log("server running at port:", `http://localhost:${port}`);
  await registerRoutesWithGateway();
});
