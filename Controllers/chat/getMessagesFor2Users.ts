import {Request, Response} from "express";
import prisma from "../../config/database";
import BaseResponse from "../../util/BaseResponse";
import {Message} from "@prisma/client";

interface ResponseBody extends BaseResponse {
     messageCount: number | null
     messages: Message[] | null
}

const getMessagesBy2Users = async (req: Request, res: Response<ResponseBody>) => {
     const senderId = req.params.senderId
     const receiverId = req.params.receiverId
     try {
          const messages = await prisma.message.findMany({
               where: {
                    OR: [
                         {
                              senderId: senderId,
                              receiverId: receiverId
                         },
                         {
                              receiverId: senderId,
                              senderId: receiverId
                         }
                    ]
               }
          })
          return res.json({
               msg: "Messages found successfully",
               success: true,
               messageCount: messages.length,
               messages: messages
          })

     } catch (err: unknown) {
          console.log("Error getting messages", err)
          return res.json({
               msg: "An  unexpected error occurred",
               success: false,
               messageCount: null,
               messages: null

          })
     }


}
export default getMessagesBy2Users
