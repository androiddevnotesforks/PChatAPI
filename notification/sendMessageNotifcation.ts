import admin from "firebase-admin"
import {Message} from "@prisma/client";
import prisma from "../config/database";

async function sendMessageNotification (senderGoogleId:string,receiverGoogleId:string,message:Message) {
    try {
        const senderInfo = await prisma.account.findUnique({
            where:{
                googleId:senderGoogleId,
            }
        })
        const receiverDeviceInfo = await prisma.deviceInfo.findMany({
            where:{
                googleId:receiverGoogleId,
            }
        })
        const receiverTokens = receiverDeviceInfo.map((info) => info.deviceId)

        if (receiverTokens.length > 0){
            await admin.messaging().sendEachForMulticast({
                    android: {
                        priority:"high",
                        data:{
                            message:JSON.stringify(message)
                        }
                    },
                    tokens:receiverTokens,
                    notification:{
                        title: `New message from ${senderInfo?.fullName}`,
                        body: message.message,
                    },
                },
                false).then(response => {
                console.log('Successfully sent the new message:', response);
            })
                .catch(error => {
                    console.log('Error sending new message:', error);
                });
        }
    }catch (e){
        console.log("Unexpected error occurred sending the messages",e)

    }
}

export default sendMessageNotification
