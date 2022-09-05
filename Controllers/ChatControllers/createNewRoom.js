const RoomModel = require("../../Models/RoomModel")

const createNewRoom = async (sender,receiver) => {
	try{
		const newRoom  = new RoomModel({ user1:sender,user2:receiver })
		await newRoom.save()
		console.log("New Room saved")
	}catch (e){
		console.log("Error creating new room")
		console.log(e)

	}

}

module.exports = createNewRoom
