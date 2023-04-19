import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import {Request,Response} from "express";
import prisma from "../../config/database";



const addUser = async (req:Request,res:Response) => {
	console.log("Add User")
	const { displayName,imageUrl,email,userId } = req.body
	try{
		const existingUser = await prisma.account.findUnique({
			where:{
				email:email
			}
		})
		if (existingUser === null){
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
				isExisting:false,
				user:newUser
			})
		}else {
			return res.json({
				msg:"A user with a similar email address has already been added",
				success:true,
				user:existingUser,
				isExisting:true,
			})
		}

	}catch (err:unknown){
		if (err instanceof PrismaClientKnownRequestError){
			if (err.code === "P2002"){
				return res.json({
					msg:"A user with a similar email address already exist",
					success:false,
					user:null,
					isExisting:true,

				})
			}else {
				return res.json({
					msg:"An unexpected error occurred",
					success:false,
					isExisting:false,
					user:null,
				})
			}
		}

	}
}


export default  addUser
