import {Request, Response} from "express";
import prisma from "../../config/database";

const getUserById = async (req: Request, res: Response) => {
    const id = req.params.id
    try {
        const user = await prisma.account.findUnique({
            where: {
                userId: id
            },
        })
        if (user == null) {
            return res.json({
                msg: "This user does not exist",
                success: true,
                user: null
            })
        } else {
            return res.json({
                msg: "User fetched successfully",
                success: true,
                user,
            })
        }

    } catch (e) {
        console.log(e)
        return res.json({
            msg: "An unexpected error occurred",
            success: false,
            user:null,
        })
    }
}
export default getUserById
