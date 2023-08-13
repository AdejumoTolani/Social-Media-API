const router = require("express").Router();

const { 
    getPosts, 
    createPost, 
    deletePost, 
    likeUnlikePost 
} = require("../Controllers/post");

router
    .route("/")
    .get(getPosts)
    .post(createPost);

router
    .route("/:id")
    .delete(deletePost);

router
    .route('/:id/like')
    .put(likeUnlikePost)

module.exports = router;
