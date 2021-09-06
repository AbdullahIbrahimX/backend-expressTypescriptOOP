import passport from "passport";
import {NextFunction, Request, Response} from "express";
import {getRepository} from "typeorm";
import User from "../models/User";

/**
 Rules to use with REST routes
 */
export function secureRoute(req:Request,res:Response,next:NextFunction){
    passport.authenticate('jwt',{session:false},(err,user)=>{
        if (err || !user){
            res.status(401);
            return res.send({success:false,message:'You are not authorised to go in here'});
        }
        req.user = user;
        return next();
    })(req,res,next);
} //Registered users only

export async function adminsOnly(req: Request, res: Response, next: NextFunction) {
    try {//TODO change the rule if security level is introduced
        const user = await getRepository(User).findOneOrFail(req.user);
        if(user.name !== "abdullah al safwan"){
            return  res.send({success:false,message:"Only Abdullah is allowed here"});
        }
        return next();
    }catch (e) {
        return res.send({success:false,message:"User can't be found"});
    }
} // users with role "Admin" only


/**
 Rules to use with websockets
 */

export function secureSocket(req:Request,res:Response,next:NextFunction){
    passport.authenticate('jwt',{session:false},(err,user)=>{
        if (err || !user){
            return next(new Error("Not Authorised"));
        }
        req.user = user;
        return next();
    })(req,res,next);}//Registered users only

export async function socketAdminsOnly(req: Request, res: Response, next: NextFunction) {
    try {//TODO change the rule if security level is introduced
        const user = await getRepository(User).findOneOrFail(req.user);
        if (user.name !== "abdullah al safwan") {
            return next(new Error("Only Abdullah is allowed here"));
        }
        req.user = user;
        return next();
    } catch (e) {
        return next(new Error("User can't be found"));
    }
} // users with role "Admin" only



