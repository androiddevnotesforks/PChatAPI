const mongoose   =require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.REMOTE_DATABASE_URL,{
	useNewUrlParser:true,
	useUnifiedTopology:true,
})
.then(() => {
	console.log("Database connected successfully")
})
.catch((err) => {
	console.log("Failed to connect to database")
	console.log(err)
})


const connection  = mongoose.connection;

connection.on('connected',() => {
	console.log(`Database connected successfully`)
})
connection.on('disconnected',() => {
	console.log("Database disconnected unexpectedly")
})

module.exports = connection
