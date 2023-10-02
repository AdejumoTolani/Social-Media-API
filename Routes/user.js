const router = require('express').Router();
const { checkUser } = require('../middleware/authMiddleware')

const {
    updateUser,
    deleteUser,
    searchUser,
    followUnfollowUser,
    currentUser,
    // getUser
} = require('../Controllers/user')

router
    .route("/:id")
    .put(updateUser)
    .delete(deleteUser)
    .get(checkUser, searchUser)

router
    .route('/')
    .get(checkUser, currentUser)
    
    
router
    .route('/:id/follow')
    .put(followUnfollowUser)


module.exports = router