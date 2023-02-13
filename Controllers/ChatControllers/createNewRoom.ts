import RoomModel from "../../Models/RoomModel"

const createNewRoom = async (sender:string,receiver:string) => {
	try{
		const newRoom  = new RoomModel({ user1:sender,user2:receiver })
		await newRoom.save()
		console.log("New Room saved")
	}catch (e :unknown){
		console.log("Error creating new room")
		console.log(e)

	}

}

export default createNewRoom
