import Express from "express"
import loginUser from "../Controllers/user/loginUser"
import searchUsers from "../Controllers/user/searchUser"
import getAllUsers from "../Controllers/user/getAllUsers"
import getUserById from "../Controllers/user/getUserById"
import logoutUser from "../Controllers/user/logoutUser";
import getDeviceInfoByUserId from "../Controllers/user/getDeviceInfoByUserId";
import updateDeviceToken from "../Controllers/user/updateDeviceToken";

const router = Express.Router()




router.post("/login", loginUser)
router.get("/search", searchUsers)
router.get("/all", getAllUsers)
router.get("/single/:id", getUserById)
router.post("/logout",logoutUser)
router.get("/deviceInfo/:userId",getDeviceInfoByUserId)
router.put("/updateToken",updateDeviceToken)

export default router
