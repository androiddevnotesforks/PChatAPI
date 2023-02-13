import UserModel from "../../Models/UserModel"
import {Request, Response} from "express";
const getAllUsers = async (req:Request,res:Response) => {
	try{
		const users = await UserModel.find({})
		return res.json({
			msg:"All Users fetched successfully",
			success:true,
			users
		})
	}catch (e){
		console.log(e)
		return res.json({
			msg:"An unexpected error occurred",
			success:false,

		})
	}
}


export default getAllUsers
