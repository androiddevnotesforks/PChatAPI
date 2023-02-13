import {Request, Response} from "express";

import UserModel from "../../Models/UserModel"


const getMessagesByUser = async (req:Request,res:Response) => {
	const senderEmail = req.params.senderEmail
	const receiverEmail = req.params.receiverEmail

	try{
		const sender = await UserModel.findOne({ email:senderEmail })
		const receiver = await UserModel.findOne({ email:receiverEmail })
		const senderChats = sender.chats.find((chat:any) => chat.email === receiver.email)

		if (senderChats === undefined){
			return res.json({
				msg:"No messages were found",
				success:true,
				messages:[]
			})
		}

		const messages = senderChats.messages
		return res.json({
			msg:"messages found successfully",
			success:true,
			messages:messages
		})

	}catch (e){
		console.log(e)
		return res.json({
			msg:"error ocourred",
			success:false,
			messages:[]

		})
	}




}
export default getMessagesByUser
