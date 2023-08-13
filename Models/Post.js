const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    userId:{
        type: String,
        required: true
    },
    post:{
        type: String,
        min:1,
        max: 400,
        require:true
    },
    images:{
        type:Array(2),
        default:[]
    },
    likes:{
        type: Array,
        default:[]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
