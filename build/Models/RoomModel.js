"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RoomModel = new mongoose_1.Schema({
    user1: {
        type: String,
        required: true
    },
    user2: {
        type: String,
        required: true
    },
    roomId: {
        type: mongoose_1.Schema.Types.ObjectId,
    }
});
exports.default = (0, mongoose_1.model)('rooms', RoomModel);
