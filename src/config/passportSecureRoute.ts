import passport from "passport";
import {NextFunction, Request, Response} from "express";

export default function secureRoute(req:Request,res:Response,next:NextFunction){
    passport.authenticate('jwt',{session:false},(err,user)=>{
        if (err || !user){
            res.status(401);
            return res.send({success:false,message:'You are not authorised to go in here'});
        }
        req.user = user;
        return next();
    })(req,res,next);
}
