import { Request,Response } from "express";

const logoutUser = async (req:Request,res:Response) => {
    try {

        return res.json({
            msg:""
        })
    }catch (e){
        return res.json({
            msg:""
        })
    }

}

export default logoutUser
