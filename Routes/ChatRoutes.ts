import Express from "express"
import getMessagesByUser from "../Controllers/ChatControllers/getChatMessages"
import getAllMessagesById from "../Controllers/UserControllers/getAllMessagesById";

const router = Express.Router()

router.get("/message/all/:userId",getAllMessagesById)
router.get("/message/:senderId/:receiverId", getMessagesByUser)


export default router

