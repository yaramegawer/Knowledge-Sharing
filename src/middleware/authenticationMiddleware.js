import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Token } from "../../DB/models/tokenModel.js";
import { User } from "../../DB/models/userModel.js";
dotenv.config();
export const isAuthenticated=asyncHandler(async(req,res,next)=>{
    //check token existence
    let token =req.headers["token"];
    //check bearer key
    if(!token || !token.startsWith( process.env.BEARER_KEY)) return next(new Error("valid token is required!"));
    //extract payload
    token=token.split(process.env.BEARER_KEY)[1];
    const payload=jwt.verify(token,process.env.SECRET_KEY)
    ///check token in DB
    const tokenDB=await Token.findOne({token,isValid:true});
    if(!tokenDB) return next(new Error("Token invalid!"))
    
    //check user existence
    const user= await User.findById(payload.id);
    if(!user) return next(new Error("User not found!",{cause:404}));
    //pass user
    req.user=user;

    //next()
    return next();
});