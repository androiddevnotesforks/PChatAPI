import {TypedRequestBody} from "../../types/TypedRequestBody";
import BaseResponse from "../../util/BaseResponse";
import prisma from "../../config/database";
import { Response } from "express";


interface RequestBody{
     googleId:string
     oldToken:string
     newToken:string
}

const updateDeviceToken = async (req:TypedRequestBody<RequestBody>,res:Response<BaseResponse>) => {
     try{
          const { googleId,oldToken,newToken } = req.body
          const updateTokenInfo = await prisma.deviceInfo.updateMany({
               where:{
                    deviceId:oldToken,
                    googleId:googleId
               },
               data:{
                    deviceId:newToken,
               }
          })

     }catch (e){

     }
}

export default updateDeviceToken
