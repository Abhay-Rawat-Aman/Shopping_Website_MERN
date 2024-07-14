const app = require('./app');
const connectDatabase = require('./config/database');

process.on("uncaughtException",(err)=>{
    process.exit(1);
})

//config
if(process.env.NODE_ENV!="PRODUCTION"){
    require('dotenv').config({path:"./config/config.env"})
    console.log(process.env.DB_URL);
}

//connect to database
connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is listening at http://localhost:${process.env.PORT}`)
});

process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`);
    
    server.close(()=>{
        process.exit(1);
    })
})