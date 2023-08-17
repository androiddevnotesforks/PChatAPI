import Express from "express"
import getMessagesBy2Users from "../Controllers/ChatControllers/getMessagesFor2Users"
import getAllMessagesById from "../Controllers/UserControllers/getAllMessagesById";

const router = Express.Router()

router.get("/message/all/:userId",getAllMessagesById)
router.get("/message/:senderId/:receiverId", getMessagesBy2Users)


export default router

