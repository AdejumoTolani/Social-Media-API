const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post: {
      type: String,
      min: 1,
      max: 400,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
    },
    comments:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment" ,
        default: [],
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
