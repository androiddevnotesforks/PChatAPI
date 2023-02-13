import {Request, Response} from "express";
import express from "express"
import bodyParser from 'body-parser'
import dotenv from "dotenv"
import http from "http"
import cors from "cors"
import socketio from 'socket.io'


import sendMessage from './././Controllers/ChatControllers/sendMessage'
import createNewRoom from "././Controllers/ChatControllers/createNewRoom"
import connectDB from "./config/database"
import UserRoutes from "./Routes/UserRoutes"
import ChatRoutes from "./Routes/ChatRoutes"
import getRoomId from "./Controllers/ChatControllers/getRoomId"

connectDB()
     .then(() => {

     })
     .catch((err) => {

     })
const app = express();
const server = http.createServer(app);

// @ts-ignore
const io = socketio(server, {
     cors: {
          methods: ["GET", "POST"]
     }
});

dotenv.config()

//middleware
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors())


app.use("/user", UserRoutes)
app.use("/chat", ChatRoutes)

io.on('connection', async (socket: any) => {
     socket.on("connected", async (user: any) => {
          console.log(user)
     })
     socket.on("joinRoom", async (info: any) => {
          const {user1, user2} = JSON.parse(info)
          const room = await getRoomId(user1, user2)

          if (room === null) {
               await createNewRoom(user1, user2)
               const newRoom = await getRoomId(user1, user2)

               socket.join(newRoom)
               io.in(newRoom).emit("roomJoined>>>>>>", newRoom)
          } else {

               socket.join(room)
               io.in(room).emit("roomJoined", room)
          }
     })

     socket.on("sendMessage", async (message: any) => {
          const messageInfo = JSON.parse(message)
          const newMessage = await sendMessage(messageInfo)
          const roomId = await getRoomId(messageInfo.sender, messageInfo.receiver)

          io.emit("receiveMessage", JSON.stringify(newMessage))

     })
});
app.get('/', (req: Request, res: Response) => {
     return res.send("PCHAT WEBSOCKET SERVER")
})

const port = process.env.PORT || 9000;
createNewRoom("ee", "eee")
server.listen(port, () => console.log("Server started on PORT 9000"));

