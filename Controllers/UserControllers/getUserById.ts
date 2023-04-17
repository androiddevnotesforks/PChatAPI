import {Request, Response} from "express";
import prisma from "../../config/database";

const getUserById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const user = await prisma.account.findUnique({
            where: {
                userId: id
            },
            include:{
                sentMessages:true,
                receivedMessages:true,
            }
        })
        const user2 =  await prisma.account.findUnique({
            where: {
                userId: id
            },
        })
        const receiverIds = user?.sentMessages.map((message) => message.receiverId) || []
        const senderIds = user?.receivedMessages.map((message) => message.senderId) || []
        const activeChatsPromises = Array.from(new Set([...receiverIds,...senderIds])).map(async (userId) => {
            return prisma.account.findUnique({
                where: {
                    userId: userId
                },
            });
        })
        const activeChats = await Promise.all(activeChatsPromises)
        console.log(activeChats)
        if (user == null) {
            return res.json({
                msg: "This user does not exist",
                success: true,
                chats:[],
                user: null
            })
        } else {
            return res.json({
                msg: "User fetched successfully",
                success: true,
                chats:activeChats,
                user,

            })
        }

    } catch (e) {
        console.log(e)
        return res.json({
            msg: "An unexpected error occurred",
            success: false
        })
    }
}
export default getUserById
