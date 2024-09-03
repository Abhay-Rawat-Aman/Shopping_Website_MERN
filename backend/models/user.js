const mongoose = require('mongoose')
const {Schema} = mongoose;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    },
    avatar: {
        type: String,
        required: false,
        trim: true,
    },
    password: {
        type: String,
        required: [true, "Pasword is required"]
    },
    refreshToken: {
        type: String,
    }
},{timestamps: true})


userScheme.pre("save" , async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password , 10);
    next();
})

userScheme.methods.isPasswordCorrect = async function(password){

    const result = await bcrypt.compare( password, this.password );
    // console.log(result);
    return result;
}

userScheme.methods.generateAccessToken =  function(password){
    return jwt.sign(
        {
            _id:this.id,
            fname:this.fname,
            lname:this.lname,
            email:this.email
        },
        process.env.ACESS_TOKEN_SECRET
        ,
        {
            expiresIn: process.env.ACESS_TOKEN_EXPIRY
        }
    )
}

userScheme.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this.id,
            fname: this.fname,
            lname: this.lname,
            email: this.email
        }
        ,
        process.env.REFRESH_TOKEN_SECRET
        ,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }

    )
}


module.exports = mongoose.model("User",userScheme);