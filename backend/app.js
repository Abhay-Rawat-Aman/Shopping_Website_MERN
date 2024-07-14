const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors');

if(process.env.NOD_ENV!="PRODUCTION"){
    require('dotenv').config({path:"./config/config.env"})
    console.log(process.env.DB_URL);
}


app.use(cors());
app.use(express.json());

//Route Import
const user = require('./routes/userRoutes');

app.use("/api",user);

if(process.env.NOD_ENV==="PRODUCTION"){
    app.use(express.static(path.join(__dirname,"../build")));
    
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"../build/index.html"));
    })
}

module.exports = app;
