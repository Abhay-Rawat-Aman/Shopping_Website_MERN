const mongoose = require('mongoose')
const {Schema} = mongoose;

const userScheme = new Schema({
    fname:{
        type: String,
        require:true
    },
    lname:{
        type: String,
        require:true
    },
    email:{
        type: String,
        require:true,
        unique:true
    }
})

module.exports = mongoose.model("User",userScheme);