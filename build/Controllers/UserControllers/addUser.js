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
const runtime_1 = require("@prisma/client/runtime");
const database_1 = __importDefault(require("../../config/database"));
const addUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { displayName, imageUrl, email, userId } = req.body;
    try {
        const newUser = yield database_1.default.account.create({
            data: {
                googleId: userId,
                fullName: displayName,
                email: email,
                imageUrl: imageUrl,
            }
        });
        return res.json({
            msg: "Account created successfully",
            success: true,
            user: newUser
        });
    }
    catch (err) {
        if (err instanceof runtime_1.PrismaClientKnownRequestError) {
            if (err.code === "P2002") {
                return res.json({
                    msg: "A user with a similar email address already exist",
                    success: false,
                });
            }
            else {
                return res.json({
                    msg: "An unexpected error occurred",
                    success: false,
                });
            }
        }
    }
});
exports.default = addUser;
