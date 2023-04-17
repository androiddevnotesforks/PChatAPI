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
Object.defineProperty(exports, "__esModule", { value: true });
const RoomModel = require("../../Models/RoomModel");
const getRoomId = (user1, user2) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room1 = yield RoomModel.findOne({ user1: user1, user2: user2 });
        const room2 = yield RoomModel.findOne({ user1: user2, user2: user1 });
        if (room1 === null && room2 === null) {
            return null;
        }
        else {
            if (room1 === null) {
                return room2._id;
            }
            else if (room2 === null) {
                return room1._id;
            }
        }
    }
    catch (e) {
        console.log("Error getting rooms");
        console.log(e);
    }
});
exports.default = getRoomId;
