const router = require("express").Router();
const { checkUser } = require("../middleware/authMiddleware");

const { 
    startConversation, 
    getConversations} = require('../Controllers/conversation')

router
    .route('/')
    .post(checkUser, startConversation)
    .get(checkUser, getConversations)



module.exports = router;
 