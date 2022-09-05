const Express = require("express")
const router = Express.Router()

const getChats = require("../controllers/ChatControllers/getChats");
const getMessagesByUser = require("../controllers/ChatControllers/getChatMessages");

router.get("/mychats/:email",getChats)
router.get("/message/:senderEmail/:receiverEmail",getMessagesByUser)

module.exports = router

