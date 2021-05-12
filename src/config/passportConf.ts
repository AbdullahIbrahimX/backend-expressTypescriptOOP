import passport, {PassportStatic} from "passport";
import {NextFunction, Request, response, Response} from "express";
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

export default (passport: PassportStatic) =>{
    const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    const secretOrKey = process.env.JWT_SECRET;
    let config = {secretOrKey,jwtFromRequest};

    passport.use(new JwtStrategy(config,async (jwtPayload: { _id: any; }, done: (arg0: null, arg1: boolean) => any)=>{
        console.log(passport);
        try {
            console.log(jwtPayload);
            const user = await User.findById(jwtPayload._id);
            if(user){
                console.log(user);
                return done(null,user)
            }else {
                return done(null,false)
            }
        }catch (e) {
            return done(e ,false)
        }
    }));
}


export function authenticate(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('jwt',{session:false},function (err:Error,user){
        if (err || !user){
            const error = new Error();
            error.message="You are not authorised to get in here";
            res.status(401);
            return res.send(error);
        }
        req.user = user;
        return next();
    });
}
