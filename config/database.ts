import mongoose  from  'mongoose'
import dotenv from 'dotenv'

dotenv.config()


async function connectDB(){
	try{

		await mongoose.connect(process.env.REMOTE_DATABASE_URL as string,{
			// @ts-ignore
			useNewUrlParser:true,
			useUnifiedTopology:true,
		})
		console.log("Database connected successfully")
	}catch (err){
		console.log("Failed to connect to database")
		console.log(err)
	}
}



const connection  = mongoose.connection;

connection.on('connected',() => {
	console.log(`Database connected successfully`)
})
connection.on('disconnected',() => {
	console.log("Database disconnected unexpectedly")
})

export default connectDB
