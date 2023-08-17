import express, {Request, Response} from "express";
import bodyParser from 'body-parser'
import dotenv from "dotenv"
import http from "http"
import cors from "cors"
import socketio from 'socket.io'
import { initializeApp,cert } from 'firebase-admin/app'
import sendMessage from './././Controllers/ChatControllers/sendMessage'
import UserRoutes from "./Routes/UserRoutes"
import ChatRoutes from "./Routes/ChatRoutes"
import {Message} from "@prisma/client";
import serviceAccount from './service_account.json'
import * as crypto from "crypto";


const app = express();
const server = http.createServer(app);

// @ts-ignore
const io = socketio(server, {
    cors: {
        methods: ["GET", "POST"]
    }
});

dotenv.config()

initializeApp({
    credential:cert({
        projectId:serviceAccount.project_id,
        privateKey:serviceAccount.private_key,
        clientEmail:serviceAccount.client_email,
    }),
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
})
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

const dummyMessage:Partial<Message> = {
    message: "Hello Peter 2 from Peter 3",
    receiverId: "f46296fa-3dda-4f0e-9f9f-dc7b43f37350",
    // senderId: "c94f3249-558f-48c3-b03c-e80ad955ba0a",
    senderId:"c1dcc8e6-b87e-4bc2-9d82-12a587717559",
    isRead: false,
    messageId: crypto.randomBytes(16).toString("hex"),
    isReceiverDeleted:false,
    isSenderDeleted:false,

}

// sendMessage(dummyMessage)
//     .then(() => {
//
//     })
//     .catch((err) => {
//         console.log("Er")
//     })



server.listen(port, () => console.log("Server started on PORT 9000"));

