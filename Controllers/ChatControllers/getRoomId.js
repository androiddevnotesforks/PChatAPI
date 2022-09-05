const RoomModel = require("../../Models/RoomModel");



const getRoomId = async (user1,user2) => {
	try{
		const room1 = await RoomModel.findOne({ user1:user1,user2:user2 })
		const room2 = await RoomModel.findOne({ user1:user2,user2:user1 })
		if (room1 === null && room2 === null){
			return null
		}else {
			if (room1 === null){
				return room2._id
			}else if (room2 === null){
				return room1._id
			}
		}
	}catch (e){
		console.log("Error getting rooms")
		console.log(e)
	}
}
module.exports = { getRoomId }
