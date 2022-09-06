const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Pusher = require('pusher');
const dotenv = require("dotenv")
const http = require("http")
const app = express();
const cors = require("cors")
const socketio = require('socket.io')

const server = http.createServer(app);

const io = socketio(server,{
	cors: {
		methods: ["GET", "POST"]
	}
});

dotenv.config()

//middleware
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())


const sendMessage = require('./././Controllers/ChatControllers/sendMessage')
const createNewRoom = require("././Controllers/ChatControllers/createNewRoom")
const connection = require("./config/database")
const UserRoutes = require("./Routes/UserRoutes")
const ChatRoutes = require("./Routes/ChatRoutes")
const {getRoomId} = require("./Controllers/ChatControllers/getRoomId");

app.use("/user",UserRoutes)
app.use("/chat",ChatRoutes)

io.on('connection',async (socket) => {
	socket.on("connected",async (user) => {
		console.log(user)
	})
	socket.on("joinRoom",async (info) => {
		const { user1,user2 } = JSON.parse(info)
		const room = await getRoomId(user1,user2)

		if (room === null){
			await createNewRoom(user1,user2)
			const newRoom = await getRoomId(user1,user2)
			console.log("New Room >>>>>>>",newRoom)
			socket.join(newRoom)
			io.in(newRoom).emit("roomJoined>>>>>>",newRoom)
		}else {
			console.log("Existing Room >>>>>>",room)
			socket.join(room)
			io.in(room).emit("roomJoined", room)
		}
	})

	socket.on("sendMessage",async (message) => {
		const messageInfo = JSON.parse(message)
		const newMessage = await sendMessage(messageInfo)
		const roomId = await getRoomId(messageInfo.sender,messageInfo.receiver)
		console.log("Room Id fetched>>>>>>",roomId)
		io.emit("receiveMessage",JSON.stringify(newMessage))
		console.log("receive message event emitted")
	})
});


const port = process.env.PORT || 9000;

server.listen(port,() => console.log("Server started on PORT 9000"));

if (process.env.NODE_ENV ==="production"){
	module.exports = server
}
