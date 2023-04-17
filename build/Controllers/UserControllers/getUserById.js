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
const database_1 = __importDefault(require("../../config/database"));
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield database_1.default.account.findUnique({
            where: {
                userId: id
            },
            include: {
                sentMessages: true,
                receivedMessages: true,
            }
        });
        const receiverIds = (user === null || user === void 0 ? void 0 : user.sentMessages.map((message) => message.receiverId)) || [];
        const senderIds = (user === null || user === void 0 ? void 0 : user.receivedMessages.map((message) => message.senderId)) || [];
        const activeChatsPromises = Array.from(new Set([...receiverIds, ...senderIds])).map((userId) => __awaiter(void 0, void 0, void 0, function* () {
            return database_1.default.account.findUnique({
                where: {
                    userId: userId
                },
            });
        }));
        const activeChats = yield Promise.all(activeChatsPromises);
        console.log(activeChats);
        if (user == null) {
            return res.json({
                msg: "This user does not exist",
                success: true,
                chats: [],
                user: null
            });
        }
        else {
            return res.json({
                msg: "User fetched successfully",
                success: true,
                chats: activeChats,
                user,
            });
        }
    }
    catch (e) {
        console.log(e);
        return res.json({
            msg: "An unexpected error occurred",
            success: false
        });
    }
});
exports.default = getUserById;
