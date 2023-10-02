const Post = require("../Models/Post");
const Comment = require('../Models/Comment')
const { handleError } = require("../errorHandler");
const User = require('../Models/User')
//Make a post
exports.createPost = async (req, res) => {
  if (!req.body) {
    return res.status(500).json("You cannot upload an empty post.");
  }
    const userId = req.user._id
  // console.log(req.body.post)
  try {
    newPost = {
      userId : userId,
      post:req.body.post
    }
    const post = await Post.create(newPost);
    return res.status(201).json("Posted.");
  } catch (err) {
    console.log(err.message)
    res.status(500).json("Something went wrong.");
  }
};

//Like a post
exports.likeUnlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user._id)) {
      // await post.updateOne({ $push: { likes: req.body.userId } });
      post.likes.push(req.user._id);
      const newPost = await post.save();
      res.status(200).json({
        likes: post.likes.length,
        message: "Post liked!"
      });
    } 
    else {
      const updatedPost = await Post.findOneAndUpdate(
        { _id: post },
          {
            $pull: { likes: req.user._id},
          },
            { new: true }
          );
      // console.log(updatedPost);
          console.log('unliked')
      res.status(200).json({
        likes: updatedPost.likes.length,
        message: "Post unliked!"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("My bad, something went wrong.");
  }
};

//delete a post
exports.deletePost = async (req, res) => {
  try {
    const postToDelete = await Post.findById(req.params.id);
    if (postToDelete.userId !== req.body.userId) {
      console.log(postToDelete, req.body.userId);
      return res.status(500).json("You do not have access to this.");
    } else {
      const post = await Post.findByIdAndDelete(req.params.id);
      res.status(200).json("Post deleted");
    }
  } catch (err) {
    //FIX THIS!
    console.log("Fix this!!");
  }
};

//Load posts on home or refresh
exports.getPosts = async (req, res) => {
  try {

      const posts = await Post.find().sort({createdAt: -1}).populate({
          path: "comments",
          populate: {
            path: "userId",
          },
        }).populate('userId')
    
    let sortedPosts = []
    posts.forEach(post=>{
      if(post.likes.includes(req.user._id)){
        sortedPosts.push([post, {liked:true}])
      }else{
        sortedPosts.push([post, {liked: false}])
      }
    })
    res.status(200).json({ sortedPosts});
  } catch (err) {
    // const error = handleError(err);
    res.status(500).json({ message: "Error loading posts.", error: err });
  }
};

//get currentUserPosts
exports.currentUserPosts = async (req, res) => {
  try {
    const userId = req.user._id;
      const posts = await Post.find({userId})
        .sort({ createdAt: -1 })
        .populate({
          path: "comments",
          populate: {
            path: "userId",
          },
        })
        .populate("userId");

    let sortedPosts = [];
    posts.forEach((post) => {
        if (post.likes.includes(req.user._id)) {
          sortedPosts.push([post, { liked: true }]);
        } else {
          sortedPosts.push([post, { liked: false }]);
        }
      });
    res.status(200).json({sortedPosts });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Internal server error." });
  }
};

//Load single post

//Comment on a post to come

//DM a user?

//get post info
exports.getLikedUnlikedPost = async (req, res)=>{
  let id = req.user._id; 
  let postId = req.params.id
  // console.log(req.params)
  let currPost = await Post.findById(postId);
  if(currPost.likes.includes(id)){
    return res.status(200).send(true)
  }else{
    return res.status(200).send(false)
  }
}

exports.commentOnPost = async (req, res) => {
  const userId = req.user._id;
  const comment = req.body.comment;
  const newComment = new Comment({
    userId:userId,
    content:comment
  })
  try {
    const newComm = await Comment.create(newComment)
    await newComm.save()
    const post = await Post.findById(req.params.id).populate({
      path:'comments',
      populate: {
        path:'userId',

      }
    })
    if (!post) {
      return res.status(404).send('Post not found.');
    } 
    else {
      post.comments.push(newComm);
      await post.save();

      res.status(201).json({
        status: "success",
        post: post,
      });
    }
     
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: err });
  }


}