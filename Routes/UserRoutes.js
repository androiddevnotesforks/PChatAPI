const Express = require("express")
const router = Express.Router()

const addUser = require("../controllers/UserControllers/addUser");
const searchUsers = require("../controllers/UserControllers/searchUser");
const getAllUsers = require("../controllers/UserControllers/getAllUsers");
const getUserById = require("../controllers/UserControllers/getUserById");


router.post("/add",addUser)
router.get("/search",searchUsers)
router.get("/all",getAllUsers)
router.get("/single/:id",getUserById)

module.exports = router
