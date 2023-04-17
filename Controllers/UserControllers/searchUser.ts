import { Response} from "express";

import UserModel from "../../Models/UserModel"
import {TypedRequestQuery} from "../../types/TypedRequestQuery";
import prisma from "../../config/database";

type RequestQuery = {
     query:string
}

const searchUsers = async (req: TypedRequestQuery<RequestQuery>, res: Response) => {
     const searchTerm = req.query.query
     if (Object.keys(req.query).length === 0 || searchTerm === "") {
          return res.json({
               msg: "Please pass a search term",
               success: false,
               users: []
          })
     }
     try {
          const users = await prisma.account.findMany({})
          const searchresults = users.filter((user) => user.email.toLowerCase().includes(searchTerm.toLowerCase()))
          return res.json({
               msg: `Found ${searchresults.length} results for ${searchTerm}`,
               success: true,
               users: searchresults,
          })
     } catch (e: unknown) {
          console.log(e)
          return res.json({
               msg: "An unexpected error occurred",
               success: false,
               users: []
          })
     }
}
export default searchUsers
