const mongoose  = require('mongoose')


const UserModel = new mongoose.Schema({
	displayName:{
		type:String,
		required:true
	},
	userId:{
		type:String,
		required:true
	},
	email:{
		type:String,
		required:true
	},
	imageUrl:{
		type:String,
		required:true
	},
	deviceIds:{
		type:Array,
		required:true,
		default:[],
	},
	chats:{
		type:Array,
		required:false,
		default:[],
	}

})


export default mongoose.model('users',UserModel)
