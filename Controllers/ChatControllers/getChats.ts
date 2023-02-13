import {Request, Response} from "express";

import UserModel from "../../Models/UserModel"

const getChats = async (req:Request,res:Response) => {
	const email = req.params.email
	try{
		const sender = await UserModel.findOne({ email })

		return res.json({
			msg:"Chats fetched successfully",
			success:true,
			chats:sender.chats
		})
	}catch (e){
		console.log(e)
		return res.json({
			msg:"An unexpected error occurred",
			success:true,
			chats:[]
		})
	}

}
export default getChats
