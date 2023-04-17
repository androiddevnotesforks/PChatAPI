import Express from "express"

const router = Express.Router()

import addUser from "../Controllers/UserControllers/addUser"
import searchUsers from "../Controllers/UserControllers/searchUser"
import getAllUsers from "../Controllers/UserControllers/getAllUsers"
import getUserById from "../Controllers/UserControllers/getUserById"


router.post("/add", addUser)
router.get("/search", searchUsers)
router.get("/all", getAllUsers)
router.get("/single/:id", getUserById)

export default router
