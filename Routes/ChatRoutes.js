const Express = require("express")
const router = Express.Router()

const getChats = require("../Controllers/ChatControllers/getChats");
const getMessagesByUser = require("../Controllers/ChatControllers/getChatMessages");

router.get("/mychats/:email",getChats)
router.get("/message/:senderEmail/:receiverEmail",getMessagesByUser)

module.exports = router

