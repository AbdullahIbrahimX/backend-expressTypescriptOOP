import * as mongoose from "mongoose";
import {Schema} from "mongoose";


export default class User extends mongoose.Model{
    schema: Schema = new Schema({
        name: { type:String },
        email: { type:String, required:true, unique:true, index:true},
        password: { type:String, required:true},
        joined: { type:Date, default:new Date()}
    });
    modelName:string = 'test';
    baseModelName: string = 'test';
}
























// import * as mongoose from 'mongoose';
// import * as encrypt from 'bcrypt';
// const { Schema } = mongoose;
//
// const UserSchema = new Schema({
//     name: { type:String },
//     email: { type:String, required:true, unique:true, index:true},
//     password: { type:String, required:true},
//     joined: { type:Date, default:new Date()}
// });
//
// UserSchema.pre('save', async function (next) {//Hash the password before storing
//
//     if (!this.isModified('password')){
//         return next();
//     }
//
//     var user = this.$locals;
//
//     encrypt.genSalt(10,(err,salt)=>{
//         if(err) return next(err);
//
//         encrypt.hash(user.password, salt, (err,hash)=>{
//             if(err) return next(err);
//
//             user.password = hash;
//             next();
//         })
//     });
// });
//
// UserSchema.methods.isPasswordMatch = function ( password, hashed, callback ){//Password check
//     encrypt.compare(password, hashed, (err, success)=>{
//             if (err){
//                 return callback(err);
//             }
//             return callback(null,success)
//         }
//     )
// }
//
//
// UserSchema.set('toJSON', {
//     transform: function (doc, ret) {
//         delete ret.local.password;
//         return ret;
//     }
// });
//
// const UserModel = mongoose.model('User',UserSchema);
//
// export default UserModel;
