import {Request,Response} from "express"
import md5 from "md5"
import User from "../models/user.model";
import {generateRandomString} from "../../../helper/generate"

//[POST] /api/v1/users/register
export const register = async (req:Request , res: Response) => {
    req.body.password = md5(req.body.password);
    const existEmail = await User.findOne({
        email:req.body.email,
        deleted:false
    });
    if(existEmail){
        res.json({
            code:400,
            message: "Email exist!"
        })
    }else{
        const user = new User({
            fullname: req.body.fullname,
            email: req.body.email,
            password: req.body.password,
            token: generateRandomString(30)
        })
        await user.save();
        
        const token = user.token;
        
        res.cookie("token",token);

        res.json({
            code:200,
            message: "Tao tai khoan thanh cong",
            token: token
        })
    }
}