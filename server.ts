import express, {Request, Response} from "express";
import bodyParser from 'body-parser'
import dotenv from "dotenv"
import http from "http"
import cors from "cors"
import socketio from 'socket.io'


import sendMessage from './././Controllers/ChatControllers/sendMessage'
import UserRoutes from "./Routes/UserRoutes"
import ChatRoutes from "./Routes/ChatRoutes"
import {Message} from "@prisma/client";


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
        console.log("User Connected ", user)
    })
    socket.on("sendMessage", async (message: any) => {
        const messageInfo: Message = JSON.parse(message)
        const newMessage = await sendMessage(messageInfo)
        if (newMessage !== null) {
            io.emit("receiveMessage", JSON.stringify(newMessage))
        }
    })
});
app.get('/', (req: Request, res: Response) => {
    return res.send("PCHAT WEBSOCKET SERVER")
})

const port = process.env.PORT || 9000;

// const dummyMessage = {
//     message: "Hello World 2",
//     senderId: "09a6d6c7-e9c1-4e80-bc8d-2e50b40feddb",
//     receiverId: "bf723b54-bf8b-4c6d-b9d4-b193da4dd482",
//     sentAt:(new Date()).toString(),
//     isRead: false,
//     messageId: crypto.randomBytes(16).toString("hex")
// }
// insertMessage(dummyMessage)
//     .then(() => {
//
//     })
//     .catch((err) => {
//         console.log("Er")
//     })
server.listen(port, () => console.log("Server started on PORT 9000"));

