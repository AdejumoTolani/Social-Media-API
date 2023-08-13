const Post = require("../Models/Post");

//Make a post
exports.createPost = async (req, res) => {
  if (!req.body) {
    return res.status(500).json("You cannot upload an empty post.");
  }
  //Also check for userId
  try {
    const post = await Post.create(req.body);
    res.status(200).json("Posted.");
  } catch (err) {
    res.status(500).json("Something went wrong.");
  }
};


//Like a post
exports.likeUnlikePost = async (req, res) => {
    console.log('Here!')
    try{

        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId)){
            await post.updateOne({$push : { likes : req.body.userId}});
            res.status(200).json({ 
                likes : post.likes.length + 1, 
                message: 'Post liked!'})
        }
        else{
            const newPost = await post.updateOne({
              $pull: { likes: req.body.userId },
            });
            res.status(200).json({
              likes: post.likes.length - 1,
              message: "Post unliked!",
            });
        }
    }catch(err){
        console.log(err.message)
        res.status(500).json('My bad, something went wrong.')
    }
}


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
exports.getPosts = (req, res) => {
  console.log("Posts received!");
  res.status(200).send("<h2>Posts loaded.</h2>");
};
//Load single post
//Comment on a post to come
