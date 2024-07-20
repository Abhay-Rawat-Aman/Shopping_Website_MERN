const mongoose = require('mongoose')

const connectdatabase = () => {
    mongoose.connect(process.env.DB_URL)
    .then((data)=>{
        console.log(`Mongodb is connected at : ${process.env.DB_URL}`);
    }).catch((err)=>{
        console.log(`Database connection error: ${err.message}`);
        process.exit(1);
    })
}


module.exports = connectdatabase;