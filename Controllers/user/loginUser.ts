
import {Request,Response} from "express";
import prisma from "../../config/database";



const loginUser = async (req:Request, res:Response) => {
	console.log("Add User")
	const { displayName,imageUrl,email,googleId,deviceToken } = req.body
	try{
		const existingUser = await prisma.account.findUnique({
			where:{
				email:email
			}
		})
		if (existingUser === null){
			const newUser = await prisma.account.create({
				data:{
					googleId:googleId,
					fullName:displayName,
					email:email,
					imageUrl:imageUrl,
				}
			})
			const newDeviceInfo = await prisma.deviceInfo.create({
				data:{
					deviceId:deviceToken,
					googleId:googleId,
				}
			})

			return res.json({
				msg:"Account created successfully",
				success:true,
				isExisting:false,
				deviceId:newDeviceInfo.deviceId,
				user:newUser
			})
		}else {
			const newDeviceInfo = await prisma.deviceInfo.create({
				data:{
					deviceId:deviceToken,
					googleId:googleId,
				}
			})
			return res.json({
				msg:"A user with a similar email address has already been added",
				success:true,
				user:existingUser,
				deviceId:newDeviceInfo.deviceId,
				isExisting:true,
			})
		}

	}catch (err:unknown){
		// if (err instanceof PrismaClientKnownRequestError){
		// 	if (err.code === "P2002"){
		// 		return res.json({
		// 			msg:"A user with a similar email address already exist",
		// 			success:false,
		// 			user:null,
		// 			isExisting:true,
		//
		// 		})
		// 	}else {
		//
		// 	}
		// }
		return res.json({
			msg:"An unexpected error occurred",
			success:false,
			isExisting:false,
			user:null,
		})

	}
}


export default  loginUser
