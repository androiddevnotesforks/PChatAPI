import {Message} from "@prisma/client";
import prisma from "../../config/database";
import sendMessageNotification from "../../notification/sendMessageNotifcation";



async function sendMessage(message: Partial<Message>) {
    try {
        const senderInfo = await prisma.account.findUnique({
            where:{
                userId:message.senderId,
            }
        })
        const receiverInfo = await prisma.account.findUnique({
            where:{
                userId:message.receiverId
            }
        })
        const newMessage = await prisma.message.create({
            data: {
                message:message.message || "",
                messageId:message.messageId ||"",
                senderId:message.senderId || "",
                receiverId:message.receiverId || "",
                isRead:false,
                isReceiverDeleted:false,
                isSenderDeleted:false,
            }
        })
        await sendMessageNotification(senderInfo?.googleId || "",receiverInfo?.googleId || "",newMessage)
        return newMessage
    } catch (err: unknown) {
        console.log("Error inserting/sending message",err)
        return null
    }


}

export default sendMessage
