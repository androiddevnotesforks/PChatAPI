import RoomModel from "../../Models/RoomModel"
import {Request, Response} from "express";


const getAllRooms = async (req:Request,res:Response) => {
     try{
          const users = await RoomModel.find({})
          return res.json({
               msg:"All rooms fetched successfully",
               success:true,
               users
          })
     }catch (e){
          console.log(e)
          return res.json({
               msg:"An unexpected error occurred",
               success:false,

          })
     }
}


export default getAllRooms
