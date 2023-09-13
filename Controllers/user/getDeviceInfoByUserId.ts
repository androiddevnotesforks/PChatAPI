import { Request,Response } from "express";
import prisma from "../../config/database";


const getDeviceInfoByUserId = async (req:Request,res:Response) => {
    try {
        const userId = req.params.userId
        const deviceIdsInfo = await prisma.deviceInfo.findMany({
            where:{
                googleId:userId
            }
        })
        return res.json({
            msg:"Device IDs fetched successfully",
            success:true,
            deviceInfo:deviceIdsInfo,
        })
    }catch (err:unknown){
        console.log("Error fetching device INFO",err)
        return res.json({
            msg:"Device IDs fetched successfully",
            success:true,
            deviceInfo:[],
        })
    }
}

export default getDeviceInfoByUserId
