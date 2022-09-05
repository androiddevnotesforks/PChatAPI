const UserModel = require("../../Models/UserModel")
const crypto = require("crypto");



async function sendMessage(message){
	const sender = await UserModel.findOne({ email:message.sender })
	const receiver = await UserModel.findOne({ email:message.receiver })
	const senderChats = sender.chats
	const receiverChats = receiver.chats

	const currentChat = senderChats.find((chat) => chat.email === receiver.email)
	const messageId = crypto.randomBytes(16).toString("hex")
	const chatId = crypto.randomBytes(16).toString("hex")

	const messageObj = { ...message,id: messageId }
	if (!currentChat){
		await UserModel.findByIdAndUpdate(sender._id,{
			$push:{
				chats:{
					id:chatId,
					name:receiver.displayName,
					email:receiver.email,
					imageUrl:receiver.imageUrl,
					messages:[messageObj]
				}
			}
		},{})
		await UserModel.findByIdAndUpdate(receiver._id,{
			$push:{
				chats:{
					id:chatId,
					name:sender.displayName,
					email:sender.email,
					imageUrl:sender.imageUrl,
					messages:[messageObj]
				}
			}
		},{})
	}else {
		await UserModel.findOneAndUpdate({
			_id:sender._id,
			"chats.email":receiver.email
		},{

			$push:{
				"chats.$[chats].messages": messageObj
			},
		},{
			arrayFilters:[
				{
					"chats.email":receiver.email
				}
			]
		})


		await UserModel.findOneAndUpdate(
			{
				_id:receiver._id,
				"chats.email":sender.email
			},{
				// chats:{ ...newSenderChatMessages }
				$push:{
					"chats.$[chats].messages": messageObj
				},
			},{
				arrayFilters:[
					{
						"chats.email":sender.email
					}
				]
			}
		)
	}
	return messageObj
}

module.exports = sendMessage
