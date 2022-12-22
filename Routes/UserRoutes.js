const Express = require("express")
const router = Express.Router()

const addUser = require("../Controllers/UserControllers/addUser");
const searchUsers = require("../Controllers/UserControllers/searchUser");
const getAllUsers = require("../Controllers/UserControllers/getAllUsers");
const getUserById = require("../Controllers/UserControllers/getUserById");


router.post("/add",addUser)
router.get("/search",searchUsers)
router.get("/all",getAllUsers)
router.get("/single/:id",getUserById)

module.exports = router
