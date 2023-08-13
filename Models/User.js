const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min:3,
        max:15,
        unique: true
    },
    displayName:{
        type:String,
        required:true,
        min:3,
        max:30
    },
    email:{
        type: String,
        required: true,
        unique: true,
        max: 50
    },
    password:{
        type: String,
        required: true,
        min: 8
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