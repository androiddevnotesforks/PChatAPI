import {Request,Response} from "express";

const UserModel = require("../../Models/UserModel")

const addUser = async (req:Request,res:Response) => {
	console.log(req.body)
	const { displayName,imageUrl,email,userId } = req.body
	try{
		const existingUser = await UserModel.findOne({ email })
		if (existingUser === null){
			const newUser = new UserModel({
				displayName,
				email,
				imageUrl,
				userId
			})
			newUser.save()
			.then(() => {
				return res.json({
					msg:"Account created successfully",
					success:true
				})
			})
			.catch((err:unknown) => {
				console.log(err)
				return res.json({
					msg:"An unexpected error occurred",
					success:false
				})
			})
		}else {
			return res.json({
				msg:"An account with the similar username already exists",
				success:false
			})
		}



	}catch (e:unknown){
		console.log(e)
		return res.json({
			msg:"An unexpected error occurred",
			success:false
		})
	}
}


export default  addUser
