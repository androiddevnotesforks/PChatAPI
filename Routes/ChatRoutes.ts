import Express from "express"
import getChats from "../Controllers/ChatControllers/getChats"
import getMessagesByUser from "../Controllers/ChatControllers/getChatMessages"

const router = Express.Router()



router.get("/mychats/:email",getChats)
router.get("/message/:senderEmail/:receiverEmail",getMessagesByUser)

export default router

