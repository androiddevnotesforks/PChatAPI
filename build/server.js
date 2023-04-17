"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = __importDefault(require("socket.io"));
const sendMessage_1 = __importDefault(require("./././Controllers/ChatControllers/sendMessage"));
const UserRoutes_1 = __importDefault(require("./Routes/UserRoutes"));
const ChatRoutes_1 = __importDefault(require("./Routes/ChatRoutes"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
// @ts-ignore
const io = (0, socket_io_1.default)(server, {
    cors: {
        methods: ["GET", "POST"]
    }
});
dotenv_1.default.config();
//middleware
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
app.use("/user", UserRoutes_1.default);
app.use("/chat", ChatRoutes_1.default);
io.on('connection', (socket) => __awaiter(void 0, void 0, void 0, function* () {
    socket.on("connected", (user) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("User Connected ", user);
    }));
    socket.on("sendMessage", (message) => __awaiter(void 0, void 0, void 0, function* () {
        const messageInfo = JSON.parse(message);
        const newMessage = yield (0, sendMessage_1.default)(messageInfo);
        if (newMessage !== null) {
            io.emit("receiveMessage", JSON.stringify(newMessage));
        }
    }));
}));
app.get('/', (req, res) => {
    return res.send("PCHAT WEBSOCKET SERVER");
});
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
