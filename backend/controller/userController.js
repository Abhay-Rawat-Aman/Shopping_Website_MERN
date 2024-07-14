const User = require('../models/user');

exports.registerUser = async(req,res)=>{
    const {fname,lname,email} = req.body;
    const user = await User.create({
        fname,lname,email
    });

    return res.status(201).json({success:true,user});
}