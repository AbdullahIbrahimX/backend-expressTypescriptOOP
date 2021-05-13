import passport from "passport";
import {NextFunction, Request, Response} from "express";

export default function secureRoute(req:Request,res:Response,next:NextFunction){
    passport.authenticate('jwt',{session:false},(err,user)=>{
        if (err || !user){
            const errorMessage = new Error();
            errorMessage.message = 'You are not authorised to go in here';
            res.status(401);
            return res.send(errorMessage);
        }
        req.user = user;
        return next();
    })(req,res,next);
}
