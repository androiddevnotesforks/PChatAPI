"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const addUser_1 = __importDefault(require("../Controllers/UserControllers/addUser"));
const searchUser_1 = __importDefault(require("../Controllers/UserControllers/searchUser"));
const getAllUsers_1 = __importDefault(require("../Controllers/UserControllers/getAllUsers"));
const getUserById_1 = __importDefault(require("../Controllers/UserControllers/getUserById"));
router.post("/add", addUser_1.default);
router.get("/search", searchUser_1.default);
router.get("/all", getAllUsers_1.default);
router.get("/single/:id", getUserById_1.default);
exports.default = router;
