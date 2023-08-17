import Express from "express"

const router = Express.Router()

import loginUser from "../Controllers/UserControllers/loginUser"
import searchUsers from "../Controllers/UserControllers/searchUser"
import getAllUsers from "../Controllers/UserControllers/getAllUsers"
import getUserById from "../Controllers/UserControllers/getUserById"
import logoutUser from "../Controllers/UserControllers/logoutUser";
import getDeviceInfoByUserId from "../Controllers/UserControllers/getDeviceInfoByUserId";


router.post("/login", loginUser)
router.get("/search", searchUsers)
router.get("/all", getAllUsers)
router.get("/single/:id", getUserById)
router.post("/logout",logoutUser)
router.get("/deviceInfo/:userId",getDeviceInfoByUserId)


export default router
