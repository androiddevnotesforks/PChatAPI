import { Request,Response } from "express";
import BaseResponse from "../../util/BaseResponse";
import {TypedRequestBody} from "../../types/TypedRequestBody";
import prisma from "../../config/database";


interface RequestBody {
    googleId:string,
    token:string,
}
const logoutUser = async (req:TypedRequestBody<RequestBody>,res:Response<BaseResponse>) => {
    try {
        await prisma.deviceInfo.deleteMany({
            where:{
                googleId:req.body.googleId,
                deviceId:req.body.token,
            }
        })
        return res.json({
            msg:"User logged out successfully",
            success:true,
        })
    }catch (e){
        console.log("Error logging user out ")
        return res.json({
            msg:"Unexpected error occurred",
            success:false,
        })
    }

}

export default logoutUser
