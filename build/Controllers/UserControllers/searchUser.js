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
const searchUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.query.query;
    if (Object.keys(req.query).length === 0 || searchTerm === "") {
        return res.json({
            msg: "Please pass a search term",
            success: false,
            users: []
        });
    }
    try {
        const users = yield database_1.default.account.findMany({});
        const searchresults = users.filter((user) => user.email.toLowerCase().includes(searchTerm.toLowerCase()));
        return res.json({
            msg: `Found ${searchresults.length} results for ${searchTerm}`,
            success: true,
            users: searchresults,
        });
    }
    catch (e) {
        console.log(e);
        return res.json({
            msg: "An unexpected error occurred",
            success: false,
            users: []
        });
    }
});
exports.default = searchUsers;
