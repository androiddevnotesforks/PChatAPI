import {Message} from "@prisma/client";
import prisma from "../../config/database";


async function sendMessage(message: Message) {
    try {
        return await prisma.message.create({
            data: {
                ...message
            }
        })
    } catch (err: unknown) {
        console.log("Error inserting/sending message",err)
        return null

    }


}

export default sendMessage
