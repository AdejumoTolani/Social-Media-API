const router = require("express").Router();

const { 
    getPosts, 
    createPost, 
    deletePost, 
    likeUnlikePost,
    currentUserPosts,
    getLikedUnlikedPost,
    commentOnPost
} = require("../Controllers/post");
const { checkUser } = require("../middleware/authMiddleware");

router
    .route("/")
    .get(checkUser, getPosts)
    .post(checkUser, createPost);


router
    .route('/me')
    .get(checkUser,currentUserPosts)

router
    .route("/:id")
    .delete(deletePost)
    .get(checkUser, getLikedUnlikedPost)
    .post(checkUser, commentOnPost)

router
    .route('/:id/like')
    .put(checkUser,likeUnlikePost)

module.exports = router;
