import { Response,Request } from "express"
import prisma from "../../config/database";


const getAllMessagesById = async (req:Request,res:Response) => {
     const userId = req.params.userId
     console.log(userId)
     try {
          const sentMessages = await prisma.message.findMany({
               where:{
                    senderId:userId,
               }
          })
          const receivedMessages = await  prisma.message.findMany({
               where:{
                    receiverId:userId
               }
          })
          const receiverIds = sentMessages.map((message) => message.receiverId)
          const senderIds = sentMessages.map((message) => message.senderId)
          const receiverIds2 = receivedMessages.map((message) => message.receiverId)
          const senderIds2 = receivedMessages.map((message) => message.senderId)
          const chatUserIds = receiverIds.concat(senderIds,receiverIds2,senderIds2)
          const uniqueChatIds = Array.from(new Set(chatUserIds))
               .filter((id) => id !== userId )
          const chatUsers = await prisma.account.findMany({
               where:{
                    userId:{
                         in:uniqueChatIds
                    }
               },
          })
          return res.json({
               msg:"Messages fetched successfully",
               success:true,
               chats:chatUsers,
               sentMessages:sentMessages,
               receivedMessages:receivedMessages,
          })

     }catch (err:unknown){
          console.log("Error getting all messages by Id",err)
          return res.json({
               msg:"An unexpected error occurred fetching messages",
               success:false,
               chats:null,
               sentMessages:null,
               receivedMessages:null,
          })

     }

}

export default getAllMessagesById
