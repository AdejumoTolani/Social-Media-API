const User = require("../Models/User");
const Post = require('../Models/Post')
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

//Update a user.

exports.updateUser = async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.json("Something went wrong.");
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account successfully updated.");
    } catch (err) {
      return res.status(500).json("Something went wrong.");
    }
  } else {
    res.status(401).json("You do not have permission to do this.");
  }
};
//Delete a user's account, can only be done by the user themselves or an admin
exports.deleteUser = async (req, res) => {
  if (req.body.userId == req.params.id) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      console.log(user);
      return res.status(200).json("Account successfully deleted.");
    } catch (err) {
      console.log(err.message);
      return res.status(500).json("Something went wrong.");
    }
  } else {
    res.status(401).json("You do not have permission to do this.");
  }
};

//Search a certain user
exports.searchUser = async (req, res) => {
  try {
    // console.log(req.params.id)
    username = req.params.id
    const user = await User.findOne({ username: username });
    const { password, updatedAt, createdAt, ...details } = user._doc;


        const posts = await Post.find({ userId: user._doc._id })
          .sort({ createdAt: -1 })
          .populate({
            path: "comments",
            populate: {
              path: "userId",
            },
          })
          .populate("userId");
    // console.log(details)
    // const posts = await Post.find({userId:user._doc._id});
    let arr = []
    posts.forEach(post=>{
      // let arr = []
      if(post.likes.includes(req.user._id)){
        arr.push([post, {liked:true}])
      }else{
        arr.push([post, { liked: false}]);
      }
    })
    // console.log(posts)
    res.status(200).json({details, arr});
  } catch (err) {
    console.log(err);
  }
};

//Follow and Unfollow a user
exports.followUnfollowUser = async (req, res) => {
  try {
    if (req.params.id == req.body.userId) {
      return res.status(403).json("You cannot follow yourself.");
    }
    const userToActOn = await User.findById(req.params.id);
    const currentUser = await User.findById(req.body.userId);
    if (!userToActOn.followedBy.includes(req.body.userId)) {
      await userToActOn.updateOne({
        $push: { followedBy: req.body.userId },
      });
      await currentUser.updateOne({ $push: { follows: req.params.id } });
      res.status(200).json("User followed.");
    } else {
      await userToActOn.updateOne({ $pull: { followedBy: req.body.userId } });
      await currentUser.updateOne({ $pull: { follows: req.params.id } });
      res.status(200).json("User unfollowed.");
    }
  } catch (err) {
    console.log(err);
  }
};


exports.currentUser = async (req, res) => {

    try{
    const user = req.user;
    res.status(200).json({ user });

    }catch(err){
      console.log(err)
    }
}

exports.getUser = async (req, res)=> {


  try{
    const userId = req.params.user
    const user = User.find({username:userId});
    res.status(200).json({user:user})
    

  }catch(err){
    res.status(500).send(err)
  }
}