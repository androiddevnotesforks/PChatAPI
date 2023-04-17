import Express from "express"
import getMessagesByUser from "../Controllers/ChatControllers/getChatMessages"

const router = Express.Router()


router.get("/message/:senderId/:receiverId", getMessagesByUser)

export default router

