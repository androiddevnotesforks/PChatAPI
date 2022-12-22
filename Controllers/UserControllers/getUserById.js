const UserModel = require("../../Models/UserModel")

const getUserById = async (req,res) => {
	const id = req.params.id
	try{
		const user= await UserModel.findOne({ userId:id })
		if (user == null){
			return res.json({
				msg:"This user does not exist",
				success:true,
				user:null
			})
		}else{
			return res.json({
				msg:"User fetched successfully",
				success:true,
				user
			})
		}

	}catch (e){
		console.log(e)
		return res.json({
			msg:"An unexpected error occurred",
			success:false
		})
	}
}
module.exports =  getUserById
