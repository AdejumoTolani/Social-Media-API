const router = require("express").Router();
const { sendMessage, getMessages } = require("../Controllers/chatMessage");

router
    .route("/:id")
    .post(sendMessage)
    .get(getMessages)

module.exports = router;
