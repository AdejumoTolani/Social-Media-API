const mongoose = require('mongoose');
const { isEmail } = require('validator')
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Please put in a username'],
        minLength:[3, 'Your username must be at least 3 characters long.'],
        maxLength:[15, 'Your username can only be at most 15 characters long.'],
        unique: true
    },
    displayName:{
        type:String,
        required:[true, 'A display name is required.'],
        minLength:[3, 'Your display name should be at least 3 characters long'],
        maxLength:[30,'Your display name has a max length of 30 characters']
    },
    email:{
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        maxLength: [30, 'Emails have a max length of 30 characters'],
        validate:[isEmail, "Please enter a valid email."]

    },
    password:{
        type: String,
        required: [true, 'Please enter a password.'],
        minLength: [8, 'Minimum password length is 8.']
    },
    aboutProfile:{
        type: String,
        max: 60
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    profilePicture:{
        type: String,
        default: ''
    },
    headerPicture:{
        type: String, 
        default: ''
    },
    followedBy:{
        type: Array,
        defualt: []
    },
    follows:{
        type: Array,
        defualt: []
    }
},
    {timestamps: true}
);

module.exports = mongoose.model('User', UserSchema);