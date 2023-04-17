import {Request, Response} from "express";
import prisma from "../../config/database";


const getMessagesByUser = async (req: Request, res: Response) => {
    const senderId = req.params.senderId
    const receiverId = req.params.receiverId
    try {
        const messages = await prisma.message.findMany({
            where: {
				senderId:senderId,
				receiverId:receiverId
			}
        })
        const messages2 = await prisma.message.findMany({
            where: {
                receiverId:senderId,
                senderId:receiverId
            }
        })
        return res.json({
            msg: "Messages found successfully",
            success: true,
            messageCount:messages.length,
            messages: [...messages2,...messages]
        })

    } catch (err:unknown) {
        console.log("Error getting messages",err)

        return res.json({
            msg: "An  unexpected error occurred",
            success: false,
            messageCount:0,
            messages: []

        })
    }


}
export default getMessagesByUser
