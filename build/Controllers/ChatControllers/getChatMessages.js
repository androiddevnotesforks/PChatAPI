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
const getMessagesByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const senderId = req.params.senderId;
    const receiverId = req.params.receiverId;
    try {
        const messages = yield database_1.default.message.findMany({
            where: {
                senderId: senderId,
                receiverId: receiverId
            }
        });
        const messages2 = yield database_1.default.message.findMany({
            where: {
                receiverId: senderId,
                senderId: receiverId
            }
        });
        return res.json({
            msg: "Messages found successfully",
            success: true,
            messageCount: messages.length,
            messages: [...messages2, ...messages]
        });
    }
    catch (err) {
        console.log("Error getting messages", err);
        return res.json({
            msg: "An  unexpected error occurred",
            success: false,
            messageCount: 0,
            messages: []
        });
    }
});
exports.default = getMessagesByUser;
