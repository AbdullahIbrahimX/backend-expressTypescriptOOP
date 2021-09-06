import User from '../models/User';
import {getRepository} from "typeorm";
import {PassportStatic} from "passport";
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Strategy = require('passport-jwt').Strategy;


export default function (passport:PassportStatic){
    const secretOrKey = process.env.JWT_SECRET;
    const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    // const config = {secretOrKey,jwtFromRequest};
    const config = {
        jwtFromRequest,
        secretOrKey,
        jsonWebTokenOptions: {
            ignoreExpiration: false,
        },
        algorithms: ['HS256'],
    };

    try{
        passport.use(new Strategy(config,async (jwtPayload: any, done: (arg0: null, arg1: any) => any)=>{
                    try{
                        const manager = getRepository(User);
                        const user =await manager.findOneOrFail(jwtPayload._id);
                        if (user){
                            return done(null,user._id);
                        }else{
                            return  done(null,false);
                        }
                    }catch (e) {
                        return done(e,false);
                    }
                }
            )
        )

        passport.serializeUser( (user:Express.User, done)=>{
            if (user) done(null, user);
        });

        passport.deserializeUser( (id:Express.User, done)=>{
            done(null, id);
        });

    }catch (e) {
        console.log("safe protocol error",e);
    }
}

