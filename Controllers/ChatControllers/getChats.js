const UserModel = require("../../Models/UserModel")


const getChats = async (req,res) => {
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

module.exports = getChats
