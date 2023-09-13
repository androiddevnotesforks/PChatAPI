import {Request, Response} from "express";
import prisma from "../../config/database";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const users = await prisma.account.findMany({
            include:{
                sentMessages:true,
                receivedMessages:true,
            }
        })
        return res.json({
            msg: "All Users fetched successfully",
            success: true,
            users: users
        })
    } catch (e) {
        console.log(e)
        return res.json({
            msg: "An unexpected error occurred",
            success: false,

        })
    }
}


export default getAllUsers
