const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const path = require('path');
const cors = require('cors');


if(process.env.NOD_ENV!="PRODUCTION"){
    require('dotenv').config({path:"./config/config.env"})
    console.log(process.env.DB_URL);
}


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(cookieParser());

//Route Import
const user = require('./routes/userRoutes');

app.use("/api",user);

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal server error"
    });
});

if(process.env.NOD_ENV==="PRODUCTION"){
    app.use(express.static(path.join(__dirname,"../build")));
    
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"../build/index.html"));
    })
}

module.exports = app;
