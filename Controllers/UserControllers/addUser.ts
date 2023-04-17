import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import {Request,Response} from "express";
import prisma from "../../config/database";



const addUser = async (req:Request,res:Response) => {
	console.log("Add User")
	const { displayName,imageUrl,email,userId } = req.body
	try{
		const newUser = await prisma.account.create({
			data:{
				googleId:userId,
				fullName:displayName,
				email:email,
				imageUrl:imageUrl,
			}
		})
		return res.json({
			msg:"Account created successfully",
			success:true,
			user:newUser
		})


	}catch (err:unknown){
		if (err instanceof PrismaClientKnownRequestError){
			if (err.code === "P2002"){
				return res.json({
					msg:"A user with a similar email address already exist",
					success:false,

				})
			}else {
				return res.json({
					msg:"An unexpected error occurred",
					success:false,

				})
			}
		}

	}
}


export default  addUser
