const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const User = require('../models/User');

module.exports = (passport) =>{
    let config = {
        secretOrKey:process.env.JWT_SECRET,
        jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
    };
    // config.secretOrKey = process.env.JWT_SECRET;
    // config.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

    passport.use(new JwtStrategy(config,async (jwtPayload,done)=>{
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
