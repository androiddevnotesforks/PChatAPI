const UserModel = require("../../Models/UserModel")

const searchUsers = async (req,res) => {
	const searchTerm = req.query.query
	if (Object.keys(req.query).length === 0 || searchTerm ===""){
		return res.json({
			msg:"Please pass a search term",
			success:false,
			users:[]
		})
	}
	try {
		const users = await UserModel.find()
		const searchresults = users.filter((user) => user.email.toLowerCase().includes(searchTerm.toLowerCase()))
		return res.json({
			msg:`Found ${searchresults.length} results for ${searchTerm}`,
			success:true,
			users:searchresults,

		})
	}catch (e) {
		console.log(e)
		return res.json({
			msg:"An unexpected error occurred",
			success:false,
			users:[]
		})
	}
}

module.exports = { searchUsers }
