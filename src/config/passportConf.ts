import User from '../models/User';
import {getManager} from "typeorm";
import {PassportStatic} from "passport";
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Strategy = require('passport-jwt').Strategy;


export default function (passport:PassportStatic){
    const secretOrKey = process.env.JWT_SECRET;
    const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    const config = {secretOrKey,jwtFromRequest};

    try{
        passport.use(new Strategy(config,async (jwtPayload: any, done: (arg0: null, arg1: any) => any)=>{
                try{
                    const manager = getManager('default');
                    const user = manager.findOne(User,jwtPayload._id);
                    if (user){
                        return done(null,user);
                    }else{
                        return  done(null,false);
                    }
                }catch (e) {
                    return done(e,false);
                }
            }
            )
        )
    }catch (e) {
        console.log("safe protocol error",e);
    }
}

