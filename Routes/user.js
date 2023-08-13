const router = require('express').Router();


const {
    updateUser,
    deleteUser,
    searchUser,
    followUnfollowUser
} = require('../Controllers/user')

router
    .route("/:id")
    .put(updateUser)
    .delete(deleteUser);

router
    .route('/')
    .get(searchUser)
    
router
    .route('/:id/follow')
    .put(followUnfollowUser)
module.exports = router