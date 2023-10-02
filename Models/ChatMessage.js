const mongoose = require("mongoose");

const chatMessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  content:{
    type:String,
    required:true
  },
  conversationId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Conversation"
  },
  read:{
    type:Boolean,
    default:false
  },
  timestamp:{
    type:Date,
    default:Date.now()
  }
});

module.exports = mongoose.model("ChatMessage", chatMessageSchema);
