const User = require('../Models/User');
const bcrypt = require('bcrypt');
//Register new user
exports.register = async(req, res) => {
    try{
        //Hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        //Generate user using data gotten from request
        const newUser =  new User({
            username: req.body.username,
            displayName: req.body.displayName,
            email: req.body.email,
            password: hashedPassword
        });
        const user = await newUser.save();
        res.status(200).json(user)
    }
    catch(err){
        console.log(err)
    }
}
//Login registered user
exports.login = async(req, res) => {
    try{
        //Find user in database
        const user = await User.findOne({username:req.body.username})
        console.log(user)
        //Tell user if the username doesn't exist
        if(!user){
            res.status(404).json('Invalid username.')
        }
        const correctPassword = await bcrypt.compare(req.body.password, user.password);
        //Check if password is correct for the valid user
        if(!correctPassword){
            res.status(400).json('Username password mismatch.')
        }
        res.status(200).json(user)
    }catch(err){
        res.status(500).json('Something went wrong')
    }
}