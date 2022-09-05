const UserModel = require("../../Models/UserModel")



const getMessagesByUser = async (req,res) => {
	const senderEmail = req.params.senderEmail
	const receiverEmail = req.params.receiverEmail

	try{
		const sender = await UserModel.findOne({ email:senderEmail })
		const receiver = await UserModel.findOne({ email:receiverEmail })
		const senderChats = sender.chats.find((chat) => chat.email === receiver.email)

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
module.exports =  getMessagesByUser
